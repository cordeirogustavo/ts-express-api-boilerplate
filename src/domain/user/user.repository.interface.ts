import { TCreateUserInput, TUpdateUserInput, TUser } from "./user.types";

export interface IUserRepository {
  createUser(userData: TCreateUserInput): Promise<TUser>;
  getUserById(userId: string): Promise<TUser | null>;
  getUserByEmail(email: string, provider: string): Promise<TUser | null>;
  getUserByIdAndEmail(
    userId: string,
    email: string,
    provider: string
  ): Promise<TUser | null>;
  getUserByEmailAndStatus(
    email: string,
    status: TUser["status"],
    provider: string
  ): Promise<TUser | null>;
  getUserByIdAndEmailAndStatus(
    userId: string,
    email: string,
    status: TUser["status"],
    provider: string
  ): Promise<TUser | null>;
  updateUser(userId: string, userData: TUpdateUserInput): Promise<TUser>;
  deleteUser(userId: string): Promise<TUser | null>;
}
