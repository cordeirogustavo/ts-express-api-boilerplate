import { z } from "zod";

export const CreateProductSchema = z.object({
  body: z.object({
    description: z.string().min(2).max(150),
    eanCode: z.string().max(13).optional(),
    price: z.number().min(0),
  }),
});

export const UpdateProductSchema = z.object({
  params: z.object({ productId: z.string().uuid() }),
  ...CreateProductSchema.shape,
});

export const ProductIdSchema = z.object({
  params: z.object({ productId: z.string().uuid() }),
});

export const ProductEANSchema = z.object({
  params: z.object({ eanCode: z.string().min(12).max(12) }),
});
