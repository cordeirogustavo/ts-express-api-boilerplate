import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateProductMock } from "./productMock";
import { DatabaseErrorHandler } from "@/shared/errors/handlers";
describe("Create product service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to call the create product with correct parameters", async () => {
    const { productRepository, productService } = generateProductMock();
    const newProduct = {
      description: "some description",
      eanCode: "some ean code",
      price: 100,
    };
    const createdProduct = await productService.create(newProduct);
    expect(productRepository.create).toHaveBeenCalledWith(newProduct);
    expect(productRepository.create).toHaveBeenCalledTimes(1);
    expect(createdProduct).toEqual({
      ...newProduct,
      productId: "some-uuid",
    });
  });

  it("should throw an error if repository create fails", async () => {
    const { productRepository, productService } = generateProductMock();
    vi.spyOn(productRepository, "create").mockRejectedValueOnce(
      new DatabaseErrorHandler("Database error")
    );
    const newProduct = {
      description: "valid description",
      eanCode: "valid ean code",
      price: 100,
    };
    await expect(productService.create(newProduct)).rejects.toThrow(
      "Database error"
    );
    expect(productRepository.create).toHaveBeenCalledWith(newProduct);
  });
});
