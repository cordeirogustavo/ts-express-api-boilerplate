import { describe, it, expect } from "vitest";
import { OrderService } from "../order.service";

describe("calculateTotalItem function", () => {
  const orderService = new OrderService();
  it("should return total without discount", () => {
    const result = orderService.calculateTotalItem(10, 2);
    expect(result).toBe(20);
  });

  it("should return total with discount", () => {
    const result = orderService.calculateTotalItem(10, 2, 10);
    expect(result).toBe(18);
  });

  it("should throw error for invalid quantity", () => {
    expect(() => orderService.calculateTotalItem(10, 0)).toThrow(
      "Invalid input"
    );
  });

  it("should throw error for negative price", () => {
    expect(() => orderService.calculateTotalItem(-5, 2)).toThrow(
      "Invalid input"
    );
  });

  it("should apply default discount of 0", () => {
    const result = orderService.calculateTotalItem(15, 3);
    expect(result).toBe(45);
  });
});
