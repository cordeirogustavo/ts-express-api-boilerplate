import { DependencyContainer } from "tsyringe";
import { IContainer } from "@/shared/interfaces";
import { CreateProductController } from "./controllers";
import { ProductSymbols } from "./product.symbols";
import { ProductService } from "./product.service";
import { ProductRouter } from "./product.router";

export class ProductContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<CreateProductController>(
      ProductSymbols.CreateProductController,
      CreateProductController
    );
    container.register<ProductService>(
      ProductSymbols.ProductService,
      ProductService
    );
    container.register<ProductRouter>(
      ProductSymbols.ProductRouter,
      ProductRouter
    );
  }
}
