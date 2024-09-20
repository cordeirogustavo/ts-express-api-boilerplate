import { IHandle } from "@/shared/interfaces";
import {
  TCreateProductRequestDTO,
  TProductDTO,
  TProductEANRequestDTO,
  TProductIdRequestDTO,
  TUpdateProductRequestDTO,
} from "./product.types";

export interface IProductController {
  getAllProducts: IHandle<void, TProductDTO[]>;
  getProductById: IHandle<TProductIdRequestDTO, TProductDTO | null>;
  getProductByEANCode: IHandle<TProductEANRequestDTO, TProductDTO | null>;
  createProduct: IHandle<TCreateProductRequestDTO, TProductDTO>;
  updateProduct: IHandle<TUpdateProductRequestDTO, TProductDTO>;
  deleteProduct: IHandle<TProductIdRequestDTO, boolean>;
}
