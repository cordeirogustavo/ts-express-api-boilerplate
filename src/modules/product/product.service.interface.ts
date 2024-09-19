import {
  TCreateProductInput,
  TProductDTO,
  TUpdateProductInput,
} from "./product.types";

export interface IProductService {
  list(): Promise<TProductDTO[]>;
  getById(productId: string): Promise<TProductDTO>;
  getByEANCode(eanCode: string): Promise<TProductDTO>;
  create(product: TCreateProductInput): Promise<TProductDTO>;
  update(productId: string, product: TUpdateProductInput): Promise<TProductDTO>;
  delete(productId: string): Promise<boolean>;
}
