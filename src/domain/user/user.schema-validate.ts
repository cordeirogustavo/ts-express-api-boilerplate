import { z } from "zod";

export const UserIdSchema = z.object({
  params: z.object({ userId: z.string().uuid() }),
});

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(10),
    password: z.string().min(6),
    status: z.enum(["ACTIVE", "PENDING", "DISABLED"]).default("PENDING"),
    provider: z.enum(["TsAPI", "google", "facebook"]).optional(),
    userPicture: z.string().optional(),
    providerIdentifier: z.string().optional(),
  }),
});

export const UpdateUserSchema = z.object({
  params: z.object({ userId: z.string().uuid() }),
  ...CreateUserSchema.shape,
});

export const ConfirmAccountSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const LoginWithGoogleSchema = z.object({
  body: z.object({
    idToken: z.string().min(10),
  }),
});

export const LoginWithFacebookSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    token: z.string().min(10),
  }),
});

export const ResetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(10),
    newPassword: z.string().min(6),
  }),
});
