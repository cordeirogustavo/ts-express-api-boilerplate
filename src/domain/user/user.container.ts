import { DependencyContainer } from "tsyringe";
import { IContainer } from "@/shared/interfaces/container.interface";

import { UserSymbols } from "./user.symbols";
import { IUserRepository } from "./user.repository.interface";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { IUserService } from "./user.service.interface";
import { IUserController } from "./user.controller.interface";
import { UserController } from "./user.controller";
import { IRouter } from "@/shared/interfaces";
import { UserRouter } from "./user.router";

export class UserContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IUserRepository>(
      UserSymbols.UserRepository,
      UserRepository
    );
    container.register<IUserService>(UserSymbols.UserService, UserService);
    container.register<IUserController>(
      UserSymbols.UserController,
      UserController
    );
    container.register<IRouter>(UserSymbols.UserRouter, UserRouter);
  }
}
