import { Express } from "express";
import { inject, singleton } from "tsyringe";
import { OrderSymbols } from "./order.symbols";
import { IRouter } from "@/shared/interfaces";
import { schemaValidateMiddleware } from "@/shared/middlewares";
import { CalculateTotalItemSchema } from "./controllers";
import { ICalculateTotalItemController } from "./controllers";

const PREFIX = "/order";

@singleton()
export class OrderRouter implements IRouter {
  constructor(
    @inject(OrderSymbols.CalculateTotalItemController)
    private calculateTotalItemController: ICalculateTotalItemController
  ) {}

  public register(server: Express): void {
    server.post(
      `${PREFIX}/calculate/item`,
      schemaValidateMiddleware(CalculateTotalItemSchema),
      this.calculateTotalItemController.handle.bind(
        this.calculateTotalItemController
      )
    );
  }
}
