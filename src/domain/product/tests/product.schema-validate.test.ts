import {
  CreateProductSchema,
  UpdateProductSchema,
  ProductIdSchema,
  ProductEANSchema,
} from "../product.schema-validate";
import { randomUUID } from "crypto";

describe("Product schema validate", () => {
  it("should be able to validate create product schema", () => {
    const result = CreateProductSchema.safeParse({
      body: {
        description: "some description",
        eanCode: "some ean code",
        price: 100,
      },
    });
    expect(result.success).toBeTruthy();
  });

  it("should not validate a product with a invalid price", () => {
    const result = CreateProductSchema.safeParse({
      body: {
        description: "some description",
        eanCode: "some ean code",
        price: -100,
      },
    });
    expect(result.success).toBeFalsy();
  });

  it("should not validate a product with a invalid description", () => {
    const result = CreateProductSchema.safeParse({
      body: {
        description: "",
        eanCode: "some ean code",
        price: 100,
      },
    });
    expect(result.success).toBeFalsy();
  });

  it("should be able to validate update product schema", () => {
    const result = UpdateProductSchema.safeParse({
      params: {
        productId: randomUUID(),
      },
      body: {
        description: "some description",
        eanCode: "some ean code",
        price: 100,
      },
    });
    expect(result.success).toBeTruthy();
  });

  it("should be able to validate product id schema", () => {
    const result = ProductIdSchema.safeParse({
      params: {
        productId: randomUUID(),
      },
    });
    expect(result.success).toBeTruthy();
  });

  it("should be able to validate invalid product id schema", () => {
    const result = ProductIdSchema.safeParse({
      params: {
        productId: "wrong product id",
      },
    });
    expect(result.success).toBeFalsy();
  });

  it("should be able to validate product ean code schema", () => {
    const result = ProductEANSchema.safeParse({
      params: {
        eanCode: "123123123123",
      },
    });
    expect(result.success).toBeTruthy();
  });

  it("should be able to validate product ean code schema", () => {
    const result = ProductEANSchema.safeParse({
      params: {
        eanCode: "wrong ean code",
      },
    });
    expect(result.success).toBeFalsy();
  });
});
