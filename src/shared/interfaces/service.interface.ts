export interface IService<RequestDTO = any, ResponseDTO = any> {
  execute(params: RequestDTO): Promise<ResponseDTO>;
}
