import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateProductMock } from "./productMock";
import { mapProductToDTO } from "../product.mapper";
describe("Product service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const newProduct = {
    description: "some description",
    eanCode: "some ean code",
    price: 100,
  };

  it("should be able to call the create product with correct parameters", async () => {
    const { productRepository, productService } = generateProductMock();
    const createdProduct = await productService.create(newProduct);
    expect(productRepository.create).toHaveBeenCalledWith(newProduct);
    expect(productRepository.create).toHaveBeenCalledTimes(1);
    expect(createdProduct).toEqual({
      ...newProduct,
      productId: "some-uuid",
    });
  });

  it("should be able to call the update product with correct parameters", async () => {
    const { productRepository, productService } = generateProductMock();
    const updatedProduct = await productService.update("some-uuid", newProduct);
    expect(productRepository.update).toHaveBeenCalledWith(
      "some-uuid",
      newProduct
    );
    expect(productRepository.update).toHaveBeenCalledTimes(1);
    expect(updatedProduct).toEqual({
      ...newProduct,
      productId: "some-uuid",
    });
  });

  it("should be able to call the delete product with correct parameters", async () => {
    const { productRepository, productService } = generateProductMock();
    const deletedProduct = await productService.delete("some-uuid");
    expect(productRepository.delete).toHaveBeenCalledWith("some-uuid");
    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(deletedProduct).toBeTruthy();
  });

  it("should return false if the product was not deleted or not found", async () => {
    const { productRepository, productService } = generateProductMock();
    vi.spyOn(productRepository, "delete").mockResolvedValueOnce(false);
    const deletedProduct = await productService.delete("some-uuid");
    expect(productRepository.delete).toHaveBeenCalledWith("some-uuid");
    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(deletedProduct).toBeFalsy();
  });

  it("should list all products", async () => {
    const { productRepository, productService, mockedProduct } =
      generateProductMock();
    const products = await productService.list();
    expect(productRepository.list).toHaveBeenCalledTimes(1);
    expect(products).toEqual([mapProductToDTO(mockedProduct)]);
  });

  it("should return an empty array if there are no products", async () => {
    const { productRepository, productService } = generateProductMock();
    vi.spyOn(productRepository, "list").mockResolvedValueOnce([]);
    const products = await productService.list();
    expect(productRepository.list).toHaveBeenCalledTimes(1);
    expect(products).toEqual([]);
  });

  it("should return a product if getById called with a valid id", async () => {
    const { productRepository, productService, mockedProduct } =
      generateProductMock();
    const product = await productService.getById("some-uuid");
    expect(productRepository.getById).toHaveBeenCalledWith("some-uuid");
    expect(productRepository.getById).toHaveBeenCalledTimes(1);
    expect(product).toEqual(mapProductToDTO(mockedProduct));
  });

  it("should return null if getById called with wrong id", async () => {
    const { productRepository, productService, mockedProduct } =
      generateProductMock();
    vi.spyOn(productRepository, "getById").mockResolvedValueOnce(null);
    const product = await productService.getById("wrong-id");
    expect(productRepository.getById).toHaveBeenCalledWith("wrong-id");
    expect(productRepository.getById).toHaveBeenCalledTimes(1);
    expect(product).toEqual(null);
  });
});
