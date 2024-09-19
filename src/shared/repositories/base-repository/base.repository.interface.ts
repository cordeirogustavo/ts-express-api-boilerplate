export interface IBaseRepository {
  startTransaction(): Promise<any>
  commit(client: any): Promise<void>
  rollback(client: any): Promise<void>
}
