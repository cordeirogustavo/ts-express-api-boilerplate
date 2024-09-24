import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTranslate } from "@/shared/utils";
import { generateUserMock } from "./user-mock";
import { TUser } from "../user.types";
import { CastErrorHandler } from "@/shared/errors/handlers";

describe("User Reset Password", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update user password", async () => {
    const { userRepository, userService, tokenService, user } =
      generateUserMock();

    vi.spyOn(userRepository, "getUserByIdAndEmail").mockResolvedValueOnce(user);

    vi.spyOn(tokenService, "sign").mockReturnValueOnce("mocked-jwt-token");
    vi.spyOn(tokenService, "verify").mockReturnValueOnce({
      valid: true,
      payload: {
        userId: user.userId,
        email: user.email,
        type: "FORGOT_PASSWORD",
      },
    });
    vi.spyOn(userRepository, "updateUser").mockResolvedValueOnce(user);

    const resetPasswordUser = await userService.resetPassword(
      "mocked-jwt-token",
      "123456",
      "en"
    );

    expect(resetPasswordUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: resetPasswordUser.token,
      userPicture: user.userPicture,
    });

    expect(userRepository.updateUser).toHaveBeenCalledWith(user.userId, {
      name: user.name,
      email: user.email,
      password: expect.stringMatching(/^\$2[aby]\$.{56}$/),
      status: "ACTIVE" as TUser["status"],
    });
    expect(tokenService.sign).toHaveBeenCalledWith(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      "1d"
    );
  });

  it("should throw error if token is invalid", async () => {
    const { userRepository, userService, tokenService, user } =
      generateUserMock();

    vi.spyOn(userRepository, "getUserByIdAndEmail").mockResolvedValueOnce(user);

    vi.spyOn(tokenService, "sign").mockReturnValueOnce("mocked-jwt-token");
    vi.spyOn(tokenService, "verify").mockReturnValueOnce({
      valid: false,
      payload: {
        userId: user.userId,
        email: user.email,
        type: "FORGOT_PASSWORD",
      },
    });

    await expect(
      userService.resetPassword("mocked-jwt-token", "123456", "en")
    ).rejects.toThrowError(
      new CastErrorHandler(getTranslate("invalidToken", "en"))
    );

    expect(userRepository.getUserByIdAndEmail).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });

  it("should throw error if user containing in token is not found", async () => {
    const { userRepository, userService, tokenService, user } =
      generateUserMock();

    vi.spyOn(userRepository, "getUserByIdAndEmail").mockResolvedValueOnce(null);

    vi.spyOn(tokenService, "sign").mockReturnValueOnce("mocked-jwt-token");
    vi.spyOn(tokenService, "verify").mockReturnValueOnce({
      valid: true,
      payload: {
        userId: user.userId,
        email: user.email,
        type: "FORGOT_PASSWORD",
      },
    });

    await expect(
      userService.resetPassword("mocked-jwt-token", "123456", "en")
    ).rejects.toThrowError(
      new CastErrorHandler(getTranslate("invalidToken", "en"))
    );

    expect(userRepository.getUserByIdAndEmail).toHaveBeenCalledWith(
      user.userId,
      user.email,
      user.provider
    );
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
