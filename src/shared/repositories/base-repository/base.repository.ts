import { IDatabaseProvider } from "@/shared/providers/database-provider/interfaces";
import path from "path";

import { IBaseRepository } from "./base.repository.interface";

export class BaseRepository implements IBaseRepository {
  constructor(
    protected databaseConnectionProvider: IDatabaseProvider,
    public queries: {
      dirname: string;
      files: { key: symbol; fileName: string }[];
    }
  ) {
    this.registerQueries();
  }

  private registerQueries() {
    this.queries?.files.forEach((query) => {
      const { key, fileName } = query;

      this.databaseConnectionProvider.registerQuery({
        key,
        currentFolderPath: this.queries.dirname,
        fileName,
      });
    });
  }

  public async startTransaction(): Promise<any> {
    return this.databaseConnectionProvider.startTransaction();
  }

  public async commit(client: any): Promise<void> {
    return this.databaseConnectionProvider.commit(client);
  }

  public async rollback(client: any): Promise<void> {
    return this.databaseConnectionProvider.rollback(client);
  }
}
