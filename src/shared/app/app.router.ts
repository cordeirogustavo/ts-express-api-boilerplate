import { Express } from "express";
import { inject, injectable } from "tsyringe";

import { IRouter } from "@/shared/interfaces";

import { OrderSymbols } from "@/modules/order";
import { ProductSymbols } from "@/modules/product";

@injectable()
export class AppRouter implements IRouter {
  constructor(
    @inject(OrderSymbols.OrderRouter)
    private orderRouter: IRouter,
    @inject(ProductSymbols.ProductRouter)
    private productRouter: IRouter
  ) {}

  public register(server: Express) {
    this.orderRouter.register(server);
    this.productRouter.register(server);
  }
}
