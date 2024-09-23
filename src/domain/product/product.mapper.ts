import { TProduct, TProductDTO } from "./product.types";

export const mapProductToDTO = (product: TProduct): TProductDTO => {
  return {
    productId: product.productId,
    description: product.description,
    eanCode: product.eanCode,
    price: Number(product.price),
  };
};
