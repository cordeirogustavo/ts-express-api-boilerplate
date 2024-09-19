import { inject, singleton } from "tsyringe";
import { ProductSymbols } from "./product.symbols";
import {
  TCreateProductInput,
  TProductDTO,
  TUpdateProductInput,
} from "./product.types";
import { IProductRepository } from "./product.repository.interface";
import { mapProductToDTO } from "./product.mapper";
import { IProductService } from "./product.service.interface";

@singleton()
export class ProductService implements IProductService {
  constructor(
    @inject(ProductSymbols.ProductRepository)
    private readonly productRepository: IProductRepository
  ) {}

  async list(): Promise<TProductDTO[]> {
    const products = await this.productRepository.list();
    return products.map((product) => mapProductToDTO(product));
  }

  async getById(productId: string): Promise<TProductDTO> {
    const product = await this.productRepository.getById(productId);
    return mapProductToDTO(product);
  }

  async getByEANCode(eanCode: string): Promise<TProductDTO> {
    const product = await this.productRepository.getByEANCode(eanCode);
    return mapProductToDTO(product);
  }

  async create(product: TCreateProductInput): Promise<TProductDTO> {
    const insertedProduct = await this.productRepository.create(product);
    return mapProductToDTO(insertedProduct);
  }

  async update(
    productId: string,
    product: TUpdateProductInput
  ): Promise<TProductDTO> {
    const updatedProduct = await this.productRepository.update(
      productId,
      product
    );
    return mapProductToDTO(updatedProduct);
  }

  async delete(productId: string): Promise<boolean> {
    return await this.productRepository.delete(productId);
  }
}
