import { singleton } from "tsyringe";

@singleton()
export class OrderService {
  calculateTotalItem = (
    price: number,
    quantity: number,
    discount: number = 0
  ) => {
    if (quantity <= 0 || price < 0) {
      throw new Error("Invalid input");
    }

    const total = price * quantity;
    const discountAmount = total * (discount / 100);

    return total - discountAmount;
  };
}
