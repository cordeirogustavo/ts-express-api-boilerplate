import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import { IHandle } from "@/shared/interfaces";
import {
  TCreateProductRequestDTO,
  TProductDTO,
  TProductEANRequestDTO,
  TProductIdRequestDTO,
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

  getAllProducts: IHandle<void, TProductDTO[]> = async (_, response) => {
    const products = await this.productService.list();
    return response.status(200).send(products);
  };

  getProductById: IHandle<TProductIdRequestDTO, TProductDTO | null> = async (
    request,
    response
  ) => {
    const {
      params: { productId },
    } = request.parsed;
    const product = await this.productService.getById(productId);
    return response.status(200).send(product);
  };

  getProductByEANCode: IHandle<TProductEANRequestDTO, TProductDTO | null> =
    async (request, response) => {
      const {
        params: { eanCode },
      } = request.parsed;
      const product = await this.productService.getByEANCode(eanCode);
      return response.status(200).send(product);
    };

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

  deleteProduct: IHandle<TProductIdRequestDTO, boolean> = async (
    request,
    response
  ) => {
    const {
      params: { productId },
    } = request.parsed;
    const isDeleted = await this.productService.delete(productId);
    return response.status(200).send(isDeleted);
  };
}
