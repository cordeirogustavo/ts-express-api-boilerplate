import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { getTranslate } from "@/shared/utils";
import bcrypt from "bcryptjs";
import { generateUserMock } from "./user-mock";
import { CastErrorHandler } from "@/shared/errors/handlers";
describe("User Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login a user with a valid credentials", async () => {
    const { userRepository, userService, tokenService, user } =
      generateUserMock();

    vi.spyOn(
      bcrypt,
      "compare" as Mocked<keyof typeof bcrypt>
    ).mockResolvedValue(true);

    vi.spyOn(userRepository, "getUserByEmailAndStatus").mockResolvedValueOnce(
      user
    );
    vi.spyOn(tokenService, "sign").mockReturnValueOnce("mocked-jwt-token");

    const signUser = await userService.login(
      "test@example.com",
      "123456",
      "en"
    );

    expect(signUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: signUser.token,
      userPicture: user.userPicture,
    });

    expect(userRepository.getUserByEmailAndStatus).toHaveBeenCalledWith(
      user.email,
      user.status,
      user.provider
    );
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", user.password);
    expect(tokenService.sign).toHaveBeenCalledWith(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      "1d"
    );
  });

  it("should not login a user with wrong password", async () => {
    const { userRepository, userService, tokenService, user } =
      generateUserMock();

    vi.spyOn(
      bcrypt,
      "compare" as Mocked<keyof typeof bcrypt>
    ).mockResolvedValue(false);

    vi.spyOn(userRepository, "getUserByEmailAndStatus").mockResolvedValueOnce(
      user
    );

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    await expect(
      userService.login("test@example.com", "wrong-password", "en")
    ).rejects.toEqual(
      new CastErrorHandler(getTranslate("invalidCredentials", "en"))
    );

    expect(userRepository.getUserByEmailAndStatus).toHaveBeenCalledWith(
      user.email,
      user.status,
      user.provider
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrong-password",
      user.password
    );

    expect(tokenService.sign).not.toHaveBeenCalled();
  });

  it("should not login a user non existent", async () => {
    const { userRepository, userService, tokenService } = generateUserMock();

    vi.spyOn(
      bcrypt,
      "compare" as Mocked<keyof typeof bcrypt>
    ).mockResolvedValue(false);

    vi.spyOn(userRepository, "getUserByEmailAndStatus").mockResolvedValueOnce(
      null
    );

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    await expect(
      userService.login("non-existent@example.com", "not-find-user", "en")
    ).rejects.toEqual(
      new CastErrorHandler(getTranslate("invalidCredentials", "en"))
    );

    expect(userRepository.getUserByEmailAndStatus).toHaveBeenCalledWith(
      "non-existent@example.com",
      "ACTIVE",
      "TsAPI"
    );

    expect(bcrypt.compare).toHaveBeenCalledWith("not-find-user", "");

    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
