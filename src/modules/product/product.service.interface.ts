export interface IProductService {
  create(product: any): Promise<string>;
}
