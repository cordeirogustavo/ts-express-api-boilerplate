import { Express } from "express";
import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import { IRouter } from "@/shared/interfaces";
import { schemaValidateMiddleware } from "@/shared/middlewares";
import { CreateProductSchema } from "./product.schema-validate";
import { CreateProductController } from "./controllers";

const PREFIX = "/product";

@singleton()
export class ProductRouter implements IRouter {
  constructor(
    @inject(ProductSymbols.CreateProductController)
    private createProductController: CreateProductController
  ) {}

  public register(server: Express): void {
    server.post(
      `${PREFIX}`,
      schemaValidateMiddleware(CreateProductSchema),
      this.createProductController.handle.bind(this.createProductController)
    );
  }
}
