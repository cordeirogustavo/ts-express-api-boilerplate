import { IHandle } from "@/shared/interfaces";
import {
  TCreateProductRequestDTO,
  TProductDTO,
  TUpdateProductRequestDTO,
} from "./product.types";

export interface IProductController {
  createProduct: IHandle<TCreateProductRequestDTO, TProductDTO>;
  updateProduct: IHandle<TUpdateProductRequestDTO, TProductDTO>;
}
