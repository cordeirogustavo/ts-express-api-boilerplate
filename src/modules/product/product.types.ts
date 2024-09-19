import { z } from "zod";
import {
  CreateProductSchema,
  UpdateProductSchema,
} from "./product.schema-validate";

export type TProduct = {
  productId: string;
  description: string;
  eanCode?: string;
  price: number;
};

export type TCreateProductRequestDTO = z.infer<typeof CreateProductSchema>;
export type TCreateProductInput = z.infer<typeof CreateProductSchema>["body"];

export type TUpdateProductRequestDTO = z.infer<typeof UpdateProductSchema>;
export type TUpdateProductInput = z.infer<typeof UpdateProductSchema>["body"];

export type TProductDTO = {
  productId: TProduct["productId"];
  description: TProduct["description"];
  eanCode: TProduct["eanCode"];
  price: TProduct["price"];
};

export type TProductUpdateDTO = {
  productId: TProduct["productId"];
} & TCreateProductInput;
