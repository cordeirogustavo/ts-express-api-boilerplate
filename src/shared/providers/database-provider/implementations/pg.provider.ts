import { readFileSync } from "fs";
import { join } from "path";
import { singleton } from "tsyringe";
import { Pool, PoolClient, PoolConfig, QueryResult, QueryResultRow } from "pg";

import { DatabaseErrorHandler, NoDataHandler } from "@/shared/errors/handlers";
import {
  ICommandRequestDTO,
  ICommandResponseDTO,
  IGetQueryRequestDTO,
  IManyOrBlankRequestDTO,
  IManyOrErrorRequestDTO,
  IManyOrNoneRequestDTO,
  INoneRequestDTO,
  IOneOrNoneRequestDTO,
  IOneRequestDTO,
  IRegisterQueryRequestDTO,
} from "../dtos";
import { IDatabaseProvider } from "../interfaces";

type ParamValue =
  | undefined
  | null
  | string
  | number
  | Array<string>
  | Array<number>
  | object
  | Date;

@singleton()
export class PGDatabaseProvider implements IDatabaseProvider {
  private readonly pool: Pool;

  private configConnection: PoolConfig = {
    application_name: process.settings.app.name,
    host: process.settings.database.host,
    port: process.settings.database.port,
    database: process.settings.database.name,
    user: process.settings.database.username,
    password: process.settings.database.password,
    ssl: process.settings.database.ignoreSsl
      ? false
      : { rejectUnauthorized: false },
    idle_in_transaction_session_timeout:
      process.settings.database.idleInTransactionSessionTimeout,
    connectionTimeoutMillis: process.settings.database.connectionTimeoutMillis,
    statement_timeout: process.settings.database.statementTimeout,
    query_timeout: process.settings.database.queryTimeout,
  };

  constructor() {
    this.pool = new Pool(this.configConnection);
  }

  private queries: {
    [key: string]: string;
  } = {};

  private async createClient(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }

  private async getClient(
    transaction?: PoolClient
  ): Promise<PoolClient | Pool> {
    if (transaction) return transaction;

    return this.pool;
  }

  private releaseClient(client: PoolClient): void {
    client.release(true);
  }

  private async query<R extends QueryResultRow>(
    client: PoolClient | Pool,
    query: string
  ): Promise<QueryResult<R>> {
    try {
      return await client.query(query);
    } catch (err) {
      throw new DatabaseErrorHandler(`${err}\nQuery: ${query}`);
    }
  }

  private getQueryKey(key: symbol) {
    const keyDescription = key.description as string;
    return Object.keys(this.queries).find(
      (objectKey) => objectKey === keyDescription
    );
  }

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

  private getQuery(params: IGetQueryRequestDTO): string {
    const { key } = params;
    const queryKey = this.getQueryKey(key);

    if (!queryKey) {
      throw new Error(`Query not found: ${key.description}`);
    }

    const queryText = readFileSync(this.queries[queryKey]).toString();

    return queryText;
  }

  public registerQuery(params: IRegisterQueryRequestDTO): void {
    const { key, currentFolderPath, fileName } = params;
    const keyDescription = key.description as string;
    const fullPath = join(currentFolderPath, "queries", `${fileName}.sql`);

    const queryKey = this.getQueryKey(key);

    if (queryKey) return;

    this.queries[keyDescription] = fullPath;
  }

  public async startTransaction(): Promise<PoolClient> {
    const instance = await this.createClient();
    await instance.query("BEGIN");
    return instance;
  }

  public async commit(client: PoolClient): Promise<void> {
    await client.query("COMMIT");
    this.releaseClient(client);
  }

  public async rollback(client: PoolClient): Promise<void> {
    await client.query("ROLLBACK");
    this.releaseClient(client);
  }

  public async manyOrError<T>(
    { key, params }: IManyOrErrorRequestDTO,
    transaction?: PoolClient
  ): Promise<T[]> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    return rows as T[];
  }

  public async manyOrBlank<T>(
    { key, params }: IManyOrBlankRequestDTO,
    transaction?: PoolClient
  ): Promise<T[] | []> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    if (!rows.length) return [];

    return rows as T[];
  }

  public async manyOrNone<T>(
    { key, params }: IManyOrNoneRequestDTO,
    transaction?: PoolClient
  ): Promise<T[] | null> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    if (!rows.length) return null;

    return rows as T[];
  }

  public async one<T>(
    { key, params }: IOneRequestDTO,
    transaction?: PoolClient
  ): Promise<T> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    if (!rows.length) throw new NoDataHandler();

    return rows[0] as T;
  }

  public async oneOrNone<T>(
    { key, params }: IOneOrNoneRequestDTO,
    transaction?: PoolClient
  ): Promise<T | null> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    if (!rows.length) return null;

    return rows[0] as T;
  }

  public async oneOrDefault<T>(
    { key, params }: IOneOrNoneRequestDTO,
    defaultValue: T,
    transaction?: PoolClient
  ): Promise<T> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const { rows } = await this.query(client, query);

    if (!rows.length) return defaultValue;

    return rows[0] as T;
  }

  public async none(
    { key, params }: INoneRequestDTO,
    transaction?: PoolClient
  ): Promise<void> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    await this.query(client, query);
  }

  public async command<T>(
    { key, params }: ICommandRequestDTO,
    transaction?: PoolClient
  ): Promise<ICommandResponseDTO<T>> {
    const client = await this.getClient(transaction);
    const query = this.paramsMap(key, params);

    const result = await this.query(client, query);
    const rows = result.rows as T;
    const rowCount = result.rowCount || 0;

    return { rows, rowCount };
  }
}
