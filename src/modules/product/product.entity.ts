import { randomUUID } from "crypto";

export class ProductEntity {
  productId: string = "";
  description: string = "";
  eanCode: string | null = null;
  price: number = 0;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(params: Partial<ProductEntity>) {
    this.productId = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    Object.assign(this, params);
  }
}
