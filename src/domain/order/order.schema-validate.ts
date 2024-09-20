import { z } from "zod";

export const CalculateTotalItemSchema = z.object({
  body: z.object({
    price: z.number(),
    quantity: z.number().min(1),
    discount: z.number().default(0),
  }),
});
