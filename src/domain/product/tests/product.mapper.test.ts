import { mapProductToDTO } from "../product.mapper";
import { generateProductMock } from "./productMock";

describe("Product mapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to call the mapProductToDTO with correct parameters", () => {
    const { mockedProduct } = generateProductMock();

    const mappedProduct = mapProductToDTO(mockedProduct);

    expect(mappedProduct).toEqual({
      productId: "some-uuid",
      description: "some description",
      eanCode: "some ean code",
      price: 100,
    });
  });

  it("should convert price to number if it is a string", () => {
    const { mockedProduct } = generateProductMock();
    // @ts-ignore
    mockedProduct.price = "100";
    const mappedProduct = mapProductToDTO(mockedProduct);
    expect(mappedProduct.price).toBe(100);
  });
});
