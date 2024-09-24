import { TUser, TUserDTO } from "./user.types";

export const mapUserToUserDto = (user: TUser): TUserDTO => {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    userPicture: user.userPicture,
  };
};
