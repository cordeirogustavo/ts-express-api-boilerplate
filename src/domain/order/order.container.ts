import { DependencyContainer } from "tsyringe";
import { IContainer } from "@/shared/interfaces";
import { CalculateTotalItemController } from "./controllers";
import { OrderSymbols } from "./order.symbols";
import { OrderService } from "./order.service";
import { OrderRouter } from "./order.router";

export class OrderContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<CalculateTotalItemController>(
      OrderSymbols.CalculateTotalItemController,
      CalculateTotalItemController
    );
    container.register<OrderService>(OrderSymbols.OrderService, OrderService);
    container.register<OrderRouter>(OrderSymbols.OrderRouter, OrderRouter);
  }
}
