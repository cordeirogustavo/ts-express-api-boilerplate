import { singleton } from "tsyringe";
import { IProductService } from "./product.service.interface";

@singleton()
export class ProductService implements IProductService {
  async create(product: any): Promise<string> {
    console.log(product);
    return "aaa";
  }
}
