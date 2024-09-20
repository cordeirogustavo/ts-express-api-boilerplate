import { Express } from "express";
import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import { IRouter } from "@/shared/interfaces";
import { schemaValidateMiddleware } from "@/shared/middlewares";
import {
  CreateProductSchema,
  ProductEANSchema,
  ProductIdSchema,
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
    server.get(
      `${PREFIX}`,
      this.productController.getAllProducts.bind(
        this.productController.getAllProducts
      )
    );

    server.get(
      `${PREFIX}/:productId`,
      schemaValidateMiddleware(ProductIdSchema),
      this.productController.getProductById.bind(
        this.productController.getProductById
      )
    );

    server.get(
      `${PREFIX}/ean/:eanCode`,
      schemaValidateMiddleware(ProductEANSchema),
      this.productController.getProductByEANCode.bind(
        this.productController.getProductByEANCode
      )
    );

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

    server.delete(
      `${PREFIX}/:productId`,
      schemaValidateMiddleware(ProductIdSchema),
      this.productController.deleteProduct.bind(
        this.productController.deleteProduct
      )
    );
  }
}
