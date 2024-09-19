import {
  TCreateProductInput,
  TProduct,
  TUpdateProductInput,
} from "./product.types";

export interface IProductRepository {
  list(): Promise<TProduct[]>;
  getById(productId: string): Promise<TProduct>;
  getByEANCode(eanCode: string): Promise<TProduct>;
  create(product: TCreateProductInput): Promise<TProduct>;
  update(productId: string, product: TUpdateProductInput): Promise<TProduct>;
  delete(productId: string): Promise<boolean>;
}
