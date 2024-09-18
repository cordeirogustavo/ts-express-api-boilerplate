import { Express } from "express";
import { inject, injectable } from "tsyringe";

import { IRouter } from "@/shared/interfaces";

import { OrderSymbols } from "@/modules/order";

@injectable()
export class AppRouter implements IRouter {
  constructor(
    @inject(OrderSymbols.OrderRouter)
    private orderRouter: IRouter
  ) {}

  public register(server: Express) {
    this.orderRouter.register(server);
  }
}
