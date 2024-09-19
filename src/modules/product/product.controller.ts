import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import { IHandle } from "@/shared/interfaces";
import {
  TCreateProductRequestDTO,
  TProductDTO,
  TUpdateProductRequestDTO,
} from "./product.types";
import { IProductService } from "./product.service.interface";
import { IProductController } from "./product.controller.interface";

@singleton()
export class ProductController implements IProductController {
  constructor(
    @inject(ProductSymbols.ProductService)
    private readonly productService: IProductService
  ) {}

  createProduct: IHandle<TCreateProductRequestDTO, TProductDTO> = async (
    request,
    response
  ) => {
    const {
      body: { description, eanCode, price },
    } = request.parsed;

    const product = await this.productService.create({
      description,
      eanCode,
      price,
    });

    return response.status(201).send(product);
  };

  updateProduct: IHandle<TUpdateProductRequestDTO, TProductDTO> = async (
    request,
    response
  ) => {
    const {
      params: { productId },
      body: { description, eanCode, price },
    } = request.parsed;

    const product = await this.productService.update(productId, {
      description,
      eanCode,
      price,
    });

    return response.status(200).send(product);
  };
}
