import {
  ICommandResponseDTO,
  IManyOrBlankRequestDTO,
  IManyOrErrorRequestDTO,
  IManyOrNoneRequestDTO,
  INoneRequestDTO,
  IOneOrNoneRequestDTO,
  IOneRequestDTO,
  IRegisterQueryRequestDTO
} from '../dtos'

export interface IDatabaseConnectionProvider {
  registerQuery(params: IRegisterQueryRequestDTO): void

  startTransaction(): Promise<any>

  commit(client: any): Promise<any>

  rollback(client: any): Promise<any>

  manyOrError<T>(params: IManyOrErrorRequestDTO, client?: any): Promise<T[]>

  manyOrBlank<T>(params: IManyOrBlankRequestDTO, client?: any): Promise<T[] | []>

  manyOrNone<T>(params: IManyOrNoneRequestDTO, client?: any): Promise<T[] | null>

  one<T>(params: IOneRequestDTO, client?: any): Promise<T>

  oneOrNone<T>(params: IOneOrNoneRequestDTO, client?: any): Promise<T | null>

  none(params: INoneRequestDTO, client?: any): Promise<void>

  oneOrDefault<T>(params: IOneOrNoneRequestDTO, defaultValue: T, client?: any): Promise<T>

  command<T>(params: IOneOrNoneRequestDTO, client?: any): Promise<ICommandResponseDTO<T>>
}
