import { inject, singleton } from "tsyringe";
import { ProductService } from "../product.service";
import { ProductSymbols } from "../product.symbols";
import { IController, IRequest, IResponse } from "@/shared/interfaces";
import { CreateProductSchema } from "../product.schema-validate";
import { z } from "zod";

export type TCreateProductRequestDTO = z.infer<typeof CreateProductSchema>;
export type TCreateProductResponseDTO = {
  productId: string;
};

export type ICalculateTotalItemController = IController<
  TCreateProductRequestDTO,
  TCreateProductResponseDTO
>;

@singleton()
export class CreateProductController implements ICalculateTotalItemController {
  constructor(
    @inject(ProductSymbols.ProductService)
    private readonly productService: ProductService
  ) {}

  async handle(
    request: IRequest<TCreateProductRequestDTO>,
    response: IResponse<TCreateProductResponseDTO>
  ): Promise<IResponse<TCreateProductResponseDTO>> {
    const {
      body: { description, eanCode, price },
    } = request.parsed;

    const productId = await this.productService.create({
      description,
      eanCode,
      price,
    });

    return response.status(201).send({
      productId: productId,
    });
  }
}
