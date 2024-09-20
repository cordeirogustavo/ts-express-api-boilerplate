import { DependencyContainer } from "tsyringe";

import { IContainer, IRouter } from "@/shared/interfaces";

import { ProductService } from "./product.service";
import { IProductService } from "./product.service.interface";

import { IProductRepository } from "./product.repository.interface";
import { ProductRepository } from "./product.repository";

import { ProductSymbols } from "./product.symbols";

import { ProductController } from "./product.controller";
import { IProductController } from "./product.controller.interface";

import { ProductRouter } from "./product.router";

export class ProductContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IProductRepository>(
      ProductSymbols.ProductRepository,
      ProductRepository
    );
    container.register<IProductService>(
      ProductSymbols.ProductService,
      ProductService
    );
    container.register<IProductController>(
      ProductSymbols.ProductController,
      ProductController
    );
    container.register<IRouter>(ProductSymbols.ProductRouter, ProductRouter);
  }
}
