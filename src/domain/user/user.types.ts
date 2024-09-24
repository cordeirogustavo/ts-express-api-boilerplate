import { z } from "zod";
import {
  ConfirmAccountSchema,
  CreateUserSchema,
  ForgotPasswordSchema,
  LoginWithFacebookSchema,
  LoginWithGoogleSchema,
  UpdateUserSchema,
  UserIdSchema,
  LoginSchema,
} from "./user.schema-validate";

export type TUserStatus = {
  PENDING: "PENDING";
  ACTIVE: "ACTIVE";
  INACTIVE: "INACTIVE";
};

export type TMfaType = {
  EMAIL: "EMAIL";
  APP: "APP";
};

export type TUser = {
  userId: string;
  name: string;
  email: string;
  password: string;
  provider: "TsAPI" | "google" | "facebook";
  providerIdentifier: string;
  mfaEnabled: boolean;
  mfaKey: string;
  mfaMethod: TMfaType[keyof TMfaType] | null;
  status: TUserStatus[keyof TUserStatus];
  userPicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type TAuthPayload = {
  userId: string;
  email: string;
  name: string;
  userPicture: string;
  token: string;
};

export type TUserDTO = {
  userId: string;
  name: string;
  email: string;
  userPicture: string;
};

export type TForgotPassword = {
  email: string;
  success: boolean;
};

export type TUserIdRequestDTO = z.infer<typeof UserIdSchema>;
export type TUserIdRequestInput = z.infer<typeof UserIdSchema>["params"];

export type TCreateUserRequestDTO = z.infer<typeof CreateUserSchema>;
export type TCreateUserInput = z.infer<typeof CreateUserSchema>["body"];

export type TUpdateUserRequestDTO = z.infer<typeof UpdateUserSchema>;
export type TUpdateUserInput = z.infer<typeof UpdateUserSchema>["body"];

export type TConfirmAccountRequestDTO = z.infer<typeof ConfirmAccountSchema>;
export type TConfirmAccountInput = z.infer<typeof ConfirmAccountSchema>["body"];

export type TForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordSchema>;
export type TForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>["body"];

export type TLoginRequestDTO = z.infer<typeof LoginSchema>;
export type TLoginInput = z.infer<typeof LoginSchema>["body"];

export type TLoginWithFacebookRequestDTO = z.infer<
  typeof LoginWithFacebookSchema
>;
export type TLoginWithFacebookInput = z.infer<
  typeof LoginWithFacebookSchema
>["body"];

export type TLoginWithGoogleRequestDTO = z.infer<typeof LoginWithGoogleSchema>;
export type TLoginWithGoogleInput = z.infer<
  typeof LoginWithGoogleSchema
>["body"];
