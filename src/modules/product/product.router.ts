import { Express } from "express";
import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import { IRouter } from "@/shared/interfaces";
import { schemaValidateMiddleware } from "@/shared/middlewares";
import {
  CreateProductSchema,
  UpdateProductSchema,
} from "./product.schema-validate";
import { IProductController } from "./product.controller.interface";

const PREFIX = "/product";

@singleton()
export class ProductRouter implements IRouter {
  constructor(
    @inject(ProductSymbols.ProductController)
    private productController: IProductController
  ) {}

  public register(server: Express): void {
    server.post(
      `${PREFIX}`,
      schemaValidateMiddleware(CreateProductSchema),
      this.productController.createProduct.bind(
        this.productController.createProduct
      )
    );

    server.put(
      `${PREFIX}/:productId`,
      schemaValidateMiddleware(UpdateProductSchema),
      this.productController.updateProduct.bind(
        this.productController.updateProduct
      )
    );
  }
}
