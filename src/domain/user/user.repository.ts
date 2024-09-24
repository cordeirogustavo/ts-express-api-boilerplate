import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers/providers.symbols";
import { inject, singleton } from "tsyringe";
import { IUserRepository } from "./user.repository.interface";
import { BaseRepository } from "@/shared/repositories/base-repository";
import { TCreateUserInput, TUpdateUserInput, TUser } from "./user.types";
import { UserEntity } from "./user.entity";

@singleton()
export class UserRepository extends BaseRepository implements IUserRepository {
  static queries = {
    dirname: __dirname,
    files: [],
  };

  constructor(
    @inject(ProvidersSymbols.DatabaseConnectionProvider)
    protected databaseConnectionProvider: IDatabaseConnectionProvider
  ) {
    super(databaseConnectionProvider, UserRepository.queries);
  }

  async createUser(userData: TCreateUserInput): Promise<TUser> {
    const user = new UserEntity(userData);
    return (await this.databaseConnectionProvider.one<UserEntity>({
      sql: `
        INSERT INTO public.user (
          "userId",
          "name",
          "email",
          "password",
          "status",
          "provider",
          "providerIdentifier",
          "userPicture",
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $(userId),
          $(name),
          $(email),
          $(password),
          $(status),
          $(provider),
          $(providerIdentifier),
          $(userPicture),
          $(createdAt),
          $(updatedAt)
        )
        RETURNING *
        `,
      params: user,
    })) as TUser;
  }

  async getUserById(userId: string): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        SELECT *
        FROM public.user
        WHERE "userId" = $(userId)
        AND "deletedAt" IS NULL
        `,
      params: { userId },
    });
  }

  async getUserByEmail(email: string, provider: string): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        SELECT 
          *
        FROM public.user
        WHERE "email"    = $(email)    AND 
              "provider" = $(provider) AND 
              "deletedAt" IS NULL
        `,
      params: { email, provider },
    });
  }

  async getUserByIdAndEmail(
    userId: string,
    email: string,
    provider: string
  ): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        SELECT 
          *
        FROM public.user
        WHERE "userId"   = $(userId)   AND 
              "email"    = $(email)    AND 
              "provider" = $(provider) AND 
              "deletedAt" IS NULL
        `,
      params: { userId, email, provider },
    });
  }

  async getUserByEmailAndStatus(
    email: string,
    status: TUser["status"],
    provider: string
  ): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        SELECT 
          *
        FROM public.user
        WHERE "email"    = $(email)    AND 
              "status"   = $(status)   AND 
              "provider" = $(provider) AND 
              "deletedAt" IS NULL
        `,
      params: { email, status, provider },
    });
  }

  async getUserByIdAndEmailAndStatus(
    userId: string,
    email: string,
    status: TUser["status"],
    provider: string
  ): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        SELECT 
          *
        FROM public.user
        WHERE "userId"   = $(userId)   AND 
              "email"    = $(email)    AND 
              "status"   = $(status)   AND 
              "provider" = $(provider) AND 
              "deletedAt" IS NULL
        `,
      params: { userId, email, status, provider },
    });
  }

  async updateUser(userId: string, userData: TUpdateUserInput): Promise<TUser> {
    const user = new UserEntity({ ...userData, userId });
    return (await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        UPDATE public.user
        SET
          "name"              = $(name),
          "email"             = $(email),
          "provider"          = $(provider),
          "providerIdentifier" = $(providerIdentifier),
          "userPicture"       = $(userPicture),
          "updatedAt"         = $(updatedAt)
        WHERE "userId" = $(userId)
        RETURNING *
        `,
      params: user,
    })) as TUser;
  }

  async deleteUser(userId: string): Promise<TUser | null> {
    return await this.databaseConnectionProvider.oneOrNone<TUser>({
      sql: `
        UPDATE public.user
        SET
          "deletedAt"  = $(deletedAt)
        WHERE "userId" = $(userId)
        RETURNING *
        `,
      params: { userId, deletedAt: new Date() },
    });
  }
}
