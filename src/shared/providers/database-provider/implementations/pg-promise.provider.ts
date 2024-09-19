import { readFileSync } from "fs";
import { join } from "path";
import { singleton } from "tsyringe";
import pgPromise, { IDatabase, QueryFile } from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";

import { NoDataHandler } from "@/shared/errors/handlers";
import { IDatabaseProvider } from "../interfaces";
import {
  ICommandRequestDTO,
  ICommandResponseDTO,
  IGetInstanceResponseDTO,
  IGetQueryRequestDTO,
  IGetQueryResponseDTO,
  IManyOrErrorRequestDTO,
  IManyOrNoneRequestDTO,
  INoneRequestDTO,
  IOneOrNoneRequestDTO,
  IOneRequestDTO,
  IRegisterQueryRequestDTO,
} from "../dtos";

type IPgTransaction = pgPromise.ITask<object> & object;
type IPgPromise = IDatabase<object, IClient>;
type IPgInstance = IGetInstanceResponseDTO<IPgPromise>;
type ParamValue =
  | undefined
  | null
  | string
  | number
  | Array<string>
  | Array<number>
  | object
  | Date;
const { QueryResultError, queryResultErrorCode } = pgPromise.errors;

@singleton()
export class PGPromise implements IDatabaseProvider {
  private configConnection = {
    host: process.settings.database.host,
    port: process.settings.database.port,
    database: process.settings.database.name,
    user: process.settings.database.username,
    password: process.settings.database.password,
    ssl: process.settings.database.ignoreSsl
      ? false
      : { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 9000,
    connectionTimeoutMillis: process.settings.database.connectionTimeoutMillis,
  };

  private pgInstance: IPgInstance | undefined;

  private queries: {
    [key: symbol]: QueryFile;
  } = {};

  private getParamValue(param: ParamValue): string {
    if (param === undefined || param === null) {
      return "null";
    }

    if (typeof param === "string") {
      return `'${param}'`;
    }

    if (param instanceof Array) {
      return param.map(this.getParamValue).join(", ");
    }

    if (param instanceof Date) {
      return `'${param.toISOString()}'`;
    }

    if (param instanceof Object) {
      return `'${JSON.stringify(param)}'`;
    }

    return param.toString();
  }

  private paramsMap(key: symbol, params: { [key: string]: ParamValue } | void) {
    if (!params) return this.getQuery({ key });

    return Object.entries(params).reduce((acc, current) => {
      const [paramKey, paramValue] = current;
      const regexp = new RegExp(`\\$\\(${paramKey}\\)`, "g");

      const parsedQuery = acc.replace(regexp, this.getParamValue(paramValue));
      return parsedQuery;
    }, this.getQuery({ key }));
  }

  private createInstance({
    disableWarning,
  }: {
    disableWarning: boolean;
  }): IPgInstance {
    const pgpInstance = pgPromise({
      noWarnings: disableWarning,
      error: (_err, e) => {
        if (e.cn) {
          console.error("Connection error %j", e.cn);
        }

        if (e.query) {
          console.error("Query error %j", e.query);
          if (e.params) {
            console.error("Query error (parameters) %j", e.params);
          }
        }

        if (e.ctx) {
          console.error("Task / Transaction error) %j", e.ctx);
        }
      },
      // query: event => {
      //   console.log('QUERY:', event.query)
      // }
    });
    // removing data parsing -obj, dc bring date as is (we define UTC when saving)
    pgpInstance.pg.types.setTypeParser(1114, (s) => s);

    const pgInstance = pgpInstance(this.configConnection);

    return pgInstance as IPgPromise;
  }

  private getInstance(): IPgInstance {
    if (this.pgInstance) return this.pgInstance as IPgPromise;

    this.pgInstance = this.createInstance({ disableWarning: false });

    return this.pgInstance as IPgPromise;
  }

  private getQuery(params: IGetQueryRequestDTO): IGetQueryResponseDTO<string> {
    const { key } = params;

    if (!(key in this.queries))
      throw new Error(`Query not found: ${String(key)}`);

    const queryFile = this.queries[key] as QueryFile;

    const query = readFileSync(queryFile.file).toString();

    return query;
  }

  public async startTransaction(): Promise<IPgInstance> {
    const instance = this.createInstance({ disableWarning: true });
    await instance.none("BEGIN");
    return instance;
  }

  public async commit(client: IPgInstance): Promise<void> {
    await client.none("COMMIT");
    await client.$pool.end();
  }

  public async rollback(client: IPgInstance): Promise<void> {
    await client.none("ROLLBACK");
    await client.$pool.end();
  }

  public registerQuery(params: IRegisterQueryRequestDTO): void {
    const { key, currentFolderPath, fileName } = params;
    const fullPath = join(currentFolderPath, "queries", `${fileName}.sql`);

    // QueryFiles need to be unique by path
    if (key in this.queries) return;

    const queryFile = new QueryFile(fullPath) as QueryFile;

    this.queries[key] = queryFile;
  }

  public async manyOrError<T>(
    { key, params }: IManyOrErrorRequestDTO,
    client?: IPgTransaction
  ): Promise<T[]> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.many<T>(query, { ...params });
    return result;
  }

  public async manyOrBlank<T>(
    { key, params }: IManyOrNoneRequestDTO,
    client?: IPgTransaction
  ): Promise<T[] | []> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.manyOrNone<T>(query, { ...params });
    return result || [];
  }

  public async manyOrNone<T>(
    { key, params }: IManyOrNoneRequestDTO,
    client?: IPgTransaction
  ): Promise<T[] | null> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.manyOrNone<T>(query, { ...params });
    return result;
  }

  public async one<T>(
    { key, params }: IOneRequestDTO,
    client?: IPgTransaction
  ): Promise<T> {
    try {
      const instance = client || this.getInstance();
      const query = this.paramsMap(key, params);

      const result = await instance.one<T>(query, { ...params });
      return result;
    } catch (error) {
      if (
        error instanceof QueryResultError &&
        error.code === queryResultErrorCode.noData
      ) {
        throw new NoDataHandler();
      }

      throw error;
    }
  }

  public async oneOrNone<T>(
    { key, params }: IOneOrNoneRequestDTO,
    client?: IPgTransaction
  ): Promise<T | null> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.oneOrNone<T>(query, { ...params });
    return result;
  }

  public async oneOrDefault<T>(
    { key, params }: IOneOrNoneRequestDTO,
    defaultValue: T,
    client?: IPgTransaction
  ): Promise<T> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.oneOrNone<T>(query, { ...params });
    return result || defaultValue;
  }

  public async none(
    { key, params }: INoneRequestDTO,
    client?: IPgTransaction
  ): Promise<void> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    await instance.none(query, { ...params });
  }

  public async command<T>(
    { key, params }: ICommandRequestDTO,
    client?: IPgTransaction
  ): Promise<ICommandResponseDTO<T>> {
    const instance = client || this.getInstance();
    const query = this.paramsMap(key, params);

    const result = await instance.result(query);

    const rows = result.rows as T;
    const { rowCount } = result;

    return { rows, rowCount };
  }
}
