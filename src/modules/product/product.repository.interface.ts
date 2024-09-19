export interface IProductRepository {
  create(product: any): Promise<any>;
}
