import { describe, it, expect, vi, beforeEach } from "vitest";
import { mapUserToUserDto } from "../user.mapper";
import { getTranslate } from "@/shared/utils";
import { generateUserMock } from "./user-mock";
import { CastErrorHandler } from "@/shared/errors/handlers";

describe("User Create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a user when no existing user with the same email", async () => {
    const {
      userRepository,
      userService,
      emailService,
      tokenService,
      user,
      userInput,
    } = generateUserMock();

    vi.spyOn(tokenService, "sign").mockReturnValue("mocked-jwt-token");
    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(userRepository, "createUser").mockResolvedValueOnce(user);

    vi.spyOn(
      emailService,
      "sendAccountConfirmationEmail"
    ).mockResolvedValueOnce(undefined);

    const result = await userService.createUser(userInput, "en");

    expect(result).toEqual(mapUserToUserDto(user));

    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
      userInput.email,
      userInput.provider
    );
    expect(userRepository.getUserByEmail).toHaveResolvedWith(null);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      ...userInput,
      password: expect.stringMatching(/^\$2[aby]\$.{56}$/),
    });
    expect(tokenService.sign).toHaveBeenCalledWith(
      {
        userId: user.userId,
        email: user.email,
        type: "CONFIRM_ACCOUNT",
      },
      "1d"
    );
    expect(emailService.sendAccountConfirmationEmail).toHaveBeenCalledWith(
      user.email,
      user.name,
      "en",
      "mocked-jwt-token"
    );
  });

  it("should not create a user when an existing user with the same email", async () => {
    const { userRepository, userService, tokenService, userInput, user } =
      generateUserMock();

    vi.spyOn(tokenService, "sign").mockReturnValue("mocked-jwt-token");
    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(user);
    vi.spyOn(userRepository, "createUser").mockRejectedValueOnce(undefined);

    await expect(userService.createUser(userInput, "en")).rejects.toEqual(
      new CastErrorHandler(getTranslate("userAlreadyExists", "en"))
    );

    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
      userInput.email,
      userInput.provider
    );
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });
});
