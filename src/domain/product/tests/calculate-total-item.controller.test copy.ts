import { IRequest, IResponse } from "@/shared/interfaces";
import {
  CalculateTotalItemController,
  TCalculateTotalItemRequestDTO,
  TCalculateTotalItemResponseDTO,
} from "../controllers";
import { OrderService } from "../order.service";

function generateMockData() {
  const mockRequest: IRequest<TCalculateTotalItemRequestDTO> = {
    parsed: {
      body: {
        price: 10,
        quantity: 2,
        discount: 0,
      },
    },
  } as IRequest<TCalculateTotalItemRequestDTO>;

  const mockResponse: IResponse<TCalculateTotalItemResponseDTO> = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as IResponse<TCalculateTotalItemResponseDTO>;

  const orderService: OrderService = {
    calculateTotalItem: vi.fn().mockResolvedValueOnce({}),
  };

  const calculateTotalItemController = new CalculateTotalItemController(
    orderService
  );

  return {
    mockRequest,
    mockResponse,
    calculateTotalItemController,
    orderService,
  };
}

describe("Calculate total item controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to call the calculate total item in order service with correct parameters", async () => {
    const {
      mockRequest,
      mockResponse,
      calculateTotalItemController,
      orderService,
    } = generateMockData();

    await calculateTotalItemController.handle(mockRequest, mockResponse);

    expect(orderService.calculateTotalItem).toBeCalledWith(10, 2, 0);
  });

  it("should be able to response with status code 201", async () => {
    const { mockRequest, mockResponse, calculateTotalItemController } =
      generateMockData();

    await calculateTotalItemController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(201);
  });
});
