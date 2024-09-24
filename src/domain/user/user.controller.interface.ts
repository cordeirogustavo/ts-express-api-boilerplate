import { IHandle } from "@/shared/interfaces";
import {
  TAuthPayload,
  TConfirmAccountRequestDTO,
  TCreateUserRequestDTO,
  TForgotPassword,
  TForgotPasswordRequestDTO,
  TLoginRequestDTO,
  TLoginWithFacebookRequestDTO,
  TLoginWithGoogleRequestDTO,
  TUpdateUserRequestDTO,
  TUserDTO,
  TUserIdRequestDTO,
} from "./user.types";

export interface IUserController {
  getUserById: IHandle<TUserIdRequestDTO, TUserDTO | null>;
  createUser: IHandle<TCreateUserRequestDTO, TUserDTO>;
  updateUser: IHandle<TUpdateUserRequestDTO, TUserDTO | null>;
  confirmAccount: IHandle<TConfirmAccountRequestDTO, TAuthPayload>;
  forgotPassword: IHandle<TForgotPasswordRequestDTO, TForgotPassword>;
  login: IHandle<TLoginRequestDTO, TAuthPayload>;
  loginWithFacebook: IHandle<TLoginWithFacebookRequestDTO, TAuthPayload>;
  loginWithGoogle: IHandle<TLoginWithGoogleRequestDTO, TAuthPayload>;
}
