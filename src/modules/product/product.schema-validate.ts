import { z } from "zod";

export const CreateProductSchema = z.object({
  body: z.object({
    description: z.string().min(2).max(150),
    eanCode: z.string().max(13).optional(),
    price: z.number(),
  }),
});
