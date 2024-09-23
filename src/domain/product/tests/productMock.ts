import { IProductRepository } from "../product.repository.interface";
import { ProductService } from "../product.service";
import { TProduct } from "../product.types";

export const generateProductMock = () => {
  const mockedProduct: TProduct = {
    productId: "some-uuid",
    description: "some description",
    eanCode: "some ean code",
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
  const productRepository: IProductRepository = {
    list: vi.fn().mockResolvedValueOnce([mockedProduct]),
    getById: vi.fn().mockResolvedValueOnce(mockedProduct),
    getByEANCode: vi.fn().mockResolvedValueOnce(mockedProduct),
    create: vi.fn().mockResolvedValueOnce(mockedProduct),
    update: vi.fn().mockResolvedValueOnce(mockedProduct),
    delete: vi.fn().mockResolvedValueOnce(true),
  };
  const productService = new ProductService(productRepository);
  return {
    mockedProduct,
    productRepository,
    productService,
  };
};
