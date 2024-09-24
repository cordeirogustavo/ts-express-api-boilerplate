import { Express } from "express";
import { inject, injectable } from "tsyringe";

import { IRouter } from "@/shared/interfaces";

import { OrderSymbols } from "@/domain/order";
import { ProductSymbols } from "@/domain/product";
import { UserSymbols } from "@/domain/user";

@injectable()
export class AppRouter implements IRouter {
  constructor(
    @inject(OrderSymbols.OrderRouter)
    private orderRouter: IRouter,
    @inject(ProductSymbols.ProductRouter)
    private productRouter: IRouter,
    @inject(UserSymbols.UserRouter)
    private userRouter: IRouter
  ) {}

  public register(server: Express) {
    this.orderRouter.register(server);
    this.productRouter.register(server);
    this.userRouter.register(server);
  }
}
