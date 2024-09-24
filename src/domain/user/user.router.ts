import { Express } from "express";
import { inject, singleton } from "tsyringe";
import { IRouter } from "@/shared/interfaces";
import { schemaValidateMiddleware } from "@/shared/middlewares";
import {
  CreateUserSchema,
  UpdateUserSchema,
  ResetPasswordSchema,
  UserIdSchema,
  ConfirmAccountSchema,
  ForgotPasswordSchema,
  LoginSchema,
  LoginWithFacebookSchema,
  LoginWithGoogleSchema,
} from "./user.schema-validate";
import { IUserController } from "./user.controller.interface";
import { UserSymbols } from "./user.symbols";

const PREFIX = "/user";

@singleton()
export class UserRouter implements IRouter {
  constructor(
    @inject(UserSymbols.UserController)
    private userController: IUserController
  ) {}

  public register(server: Express): void {
    server.get(
      `${PREFIX}/:userId`,
      schemaValidateMiddleware(UserIdSchema),
      this.userController.getUserById.bind(this.userController.getUserById)
    );

    server.post(
      `${PREFIX}`,
      schemaValidateMiddleware(CreateUserSchema),
      this.userController.createUser.bind(this.userController.createUser)
    );

    server.put(
      `${PREFIX}/:userId`,
      schemaValidateMiddleware(UpdateUserSchema),
      this.userController.updateUser.bind(this.userController.updateUser)
    );

    server.post(
      `${PREFIX}/confirm-account`,
      schemaValidateMiddleware(ConfirmAccountSchema),
      this.userController.confirmAccount.bind(
        this.userController.confirmAccount
      )
    );

    server.post(
      `${PREFIX}/forgot-password`,
      schemaValidateMiddleware(ForgotPasswordSchema),
      this.userController.forgotPassword.bind(
        this.userController.forgotPassword
      )
    );

    server.post(
      `${PREFIX}/login`,
      schemaValidateMiddleware(LoginSchema),
      this.userController.login.bind(this.userController.login)
    );

    server.post(
      `${PREFIX}/login-with-facebook`,
      schemaValidateMiddleware(LoginWithFacebookSchema),
      this.userController.loginWithFacebook.bind(
        this.userController.loginWithFacebook
      )
    );

    server.post(
      `${PREFIX}/login-with-google`,
      schemaValidateMiddleware(LoginWithGoogleSchema),
      this.userController.loginWithGoogle.bind(
        this.userController.loginWithGoogle
      )
    );
  }
}
