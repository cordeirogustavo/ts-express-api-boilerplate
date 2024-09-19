import { inject, singleton } from "tsyringe";
import { IProductRepository } from "./product.repository.interface";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers";
import { BaseRepository } from "@/shared/repositories/base-repository";
import { TCreateProductInput, TProduct } from "./product.types";
import { ProductEntity } from "./product.entity";

@singleton()
export class ProductRepository
  extends BaseRepository
  implements IProductRepository
{
  static queries = {
    dirname: __dirname,
    files: [],
  };

  constructor(
    @inject(ProvidersSymbols.DatabaseConnectionProvider)
    protected databaseConnectionProvider: IDatabaseConnectionProvider
  ) {
    super(databaseConnectionProvider, ProductRepository.queries);
  }

  async list(): Promise<TProduct[]> {
    return Promise.resolve([]);
  }
  getById(productId: string): Promise<TProduct> {
    return Promise.resolve({} as TProduct);
  }

  async getByEANCode(eanCode: string): Promise<TProduct> {
    return Promise.resolve({} as TProduct);
  }
  async create(product: TCreateProductInput): Promise<TProduct> {
    const newProduct = new ProductEntity(product);
    return (await this.databaseConnectionProvider.oneOrNone<ProductEntity>({
      sql: `
        INSERT INTO public.product(
          "productId",
          description,
          "eanCode",
          price,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $(productId),
          $(description),
          $(eanCode),
          $(price),
          $(createdAt),
          $(updatedAt)
        ) RETURNING *
       `,
      params: newProduct,
    })) as TProduct;
  }

  async update(productId: string, product: TProduct): Promise<TProduct> {
    const updatedProduct = new ProductEntity({ ...product, productId });
    return (await this.databaseConnectionProvider.oneOrNone<ProductEntity>({
      sql: `
        UPDATE public.product
        SET
          description = $(description),
          "eanCode"   = $(eanCode),
          price       = $(price),
          "updatedAt" = $(updatedAt)
        WHERE
          "productId" = $(productId)
        RETURNING *
       `,
      params: { ...updatedProduct, productId },
    })) as TProduct;
  }

  async delete(productId: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
