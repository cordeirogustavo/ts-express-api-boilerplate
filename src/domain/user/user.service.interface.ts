import { TLanguages } from "@/shared/utils";
import {
  TAuthPayload,
  TCreateUserInput,
  TForgotPassword,
  TUpdateUserInput,
  TUserDTO,
} from "./user.types";

export interface IUserService {
  getUserById(
    userId: string,
    idFromRequest: string,
    language: TLanguages
  ): Promise<TUserDTO | null>;
  createUser(
    userData: TCreateUserInput,
    language: TLanguages
  ): Promise<TUserDTO>;
  updateUser(
    userId: string,
    userIdFromRequest: string,
    userData: TUpdateUserInput,
    language: TLanguages
  ): Promise<TUserDTO>;
  confirmAccount(token: string, language: TLanguages): Promise<TAuthPayload>;
  forgotPassword(email: string, language: TLanguages): Promise<TForgotPassword>;
  resetPassword(
    token: string,
    password: string,
    language: TLanguages
  ): Promise<TAuthPayload>;
  login(
    email: string,
    password: string,
    language: TLanguages
  ): Promise<TAuthPayload>;
  loginWithGoogle(idToken: string, language: TLanguages): Promise<TAuthPayload>;
  loginWithFacebook(
    userId: string,
    token: string,
    language: TLanguages
  ): Promise<TAuthPayload>;
}
