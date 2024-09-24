import { inject, singleton } from "tsyringe";
import { UserSymbols } from "./user.symbols";
import { IHandle } from "@/shared/interfaces";
import {
  TUserDTO,
  TCreateUserRequestDTO,
  TUpdateUserRequestDTO,
  TConfirmAccountRequestDTO,
  TAuthPayload,
  TForgotPasswordRequestDTO,
  TForgotPassword,
  TLoginRequestDTO,
  TLoginWithFacebookRequestDTO,
  TLoginWithGoogleRequestDTO,
  TUserIdRequestDTO,
} from "./user.types";
import { IUserController } from "./user.controller.interface";
import { IUserService } from "./user.service.interface";

@singleton()
export class UserController implements IUserController {
  constructor(
    @inject(UserSymbols.UserService)
    private readonly userService: IUserService
  ) {}

  getUserById: IHandle<TUserIdRequestDTO, TUserDTO | null> = async (
    request,
    response
  ) => {
    const {
      params: { userId },
    } = request.parsed;

    const user = await this.userService.getUserById(userId, "", "en");
    response.status(200).send(user);
  };

  createUser: IHandle<TCreateUserRequestDTO, TUserDTO> = async (
    request,
    response
  ) => {
    const {
      body: { email, name, password, status, provider, providerIdentifier },
    } = request.parsed;
    const createdUser = await this.userService.createUser(
      {
        email,
        name,
        password,
        status,
        provider,
        providerIdentifier,
      },
      "en"
    );
    response.status(201).send(createdUser);
  };

  updateUser: IHandle<TUpdateUserRequestDTO, TUserDTO | null> = async (
    request,
    response
  ) => {
    const {
      body: { email, name, password, status, provider, providerIdentifier },
    } = request.parsed;
    const {
      params: { userId },
    } = request.parsed;
    const updatedUser = await this.userService.updateUser(
      userId,
      "",
      {
        email,
        name,
        password,
        status,
        provider,
        providerIdentifier,
      },
      "en"
    );
    response.status(200).send(updatedUser);
  };

  confirmAccount: IHandle<TConfirmAccountRequestDTO, TAuthPayload> = async (
    request,
    response
  ) => {
    const {
      body: { email },
    } = request.parsed;
    const user = await this.userService.confirmAccount(email, "en");
    response.status(200).send(user);
  };

  forgotPassword: IHandle<TForgotPasswordRequestDTO, TForgotPassword> = async (
    request,
    response
  ) => {
    const {
      body: { email },
    } = request.parsed;
    const forgotPassword = await this.userService.forgotPassword(email, "en");
    response.status(200).send(forgotPassword);
  };

  login: IHandle<TLoginRequestDTO, TAuthPayload> = async (
    request,
    response
  ) => {
    const {
      body: { email, password },
    } = request.parsed;
    const user = await this.userService.login(email, password, "en");
    response.status(200).send(user);
  };

  loginWithFacebook: IHandle<TLoginWithFacebookRequestDTO, TAuthPayload> =
    async (request, response) => {
      const {
        body: { token, userId },
      } = request.parsed;
      const facebookUser = await this.userService.loginWithFacebook(
        userId,
        token,
        "en"
      );
      response.status(200).send(facebookUser);
    };

  loginWithGoogle: IHandle<TLoginWithGoogleRequestDTO, TAuthPayload> = async (
    request,
    response
  ) => {
    const {
      body: { idToken },
    } = request.parsed;
    const googleUser = await this.userService.loginWithGoogle(idToken, "en");
    response.status(200).send(googleUser);
  };
}
