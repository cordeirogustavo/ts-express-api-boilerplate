import { inject, singleton } from "tsyringe";
import { OrderService } from "../order.service";
import { OrderSymbols } from "../order.symbols";
import { IController, IRequest, IResponse } from "@/shared/interfaces";
import { CalculateTotalItemSchema } from "../order.schema-validate";
import { z } from "zod";

export type TCalculateTotalItemRequestDTO = z.infer<
  typeof CalculateTotalItemSchema
>;
export type TCalculateTotalItemResponseDTO = { total: number };

export type ICalculateTotalItemController = IController<
  TCalculateTotalItemRequestDTO,
  TCalculateTotalItemResponseDTO
>;

@singleton()
export class CalculateTotalItemController
  implements ICalculateTotalItemController
{
  constructor(
    @inject(OrderSymbols.OrderService)
    private readonly orderService: OrderService
  ) {}

  async handle(
    request: IRequest<TCalculateTotalItemRequestDTO>,
    response: IResponse<TCalculateTotalItemResponseDTO>
  ): Promise<IResponse<TCalculateTotalItemResponseDTO>> {
    const {
      body: { price, quantity, discount },
    } = request.parsed;

    const totalItem = this.orderService.calculateTotalItem(
      price,
      quantity,
      discount
    );

    return response.status(201).send({
      total: totalItem,
    });
  }
}
