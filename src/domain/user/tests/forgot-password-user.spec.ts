import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateUserMock } from "./user-mock";

describe("Forgot Password", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send an email with a reset password link", async () => {
    const { userRepository, userService, emailService, tokenService, user } =
      generateUserMock();

    vi.spyOn(tokenService, "sign").mockReturnValue("mocked-jwt-token");
    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(user);
    vi.spyOn(emailService, "sendResetPasswordEmail").mockResolvedValueOnce(
      undefined
    );

    const requestEmail = user.email || "";

    const result = await userService.forgotPassword(requestEmail, "en");

    expect(result).toEqual({
      success: true,
      email: requestEmail,
    });

    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
      requestEmail,
      user.provider
    );
    expect(userRepository.getUserByEmail).toHaveResolvedWith(user);
    expect(tokenService.sign).toHaveBeenCalledWith(
      {
        userId: user.userId,
        email: requestEmail,
        type: "FORGOT_PASSWORD",
      },
      "1d"
    );
    expect(emailService.sendResetPasswordEmail).toHaveBeenCalledWith(
      requestEmail,
      user.name,
      "en",
      "mocked-jwt-token"
    );
  });

  it("should return success with passed email when user does not exist", async () => {
    const { userRepository, userService, emailService, tokenService } =
      generateUserMock();

    vi.spyOn(tokenService, "sign").mockReturnValue("mocked-jwt-token");
    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(emailService, "sendResetPasswordEmail").mockResolvedValueOnce(
      undefined
    );

    const requestEmail = "test@example.com";

    const result = await userService.forgotPassword(requestEmail, "en");

    expect(result).toEqual({
      success: true,
      email: requestEmail,
    });
    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
      requestEmail,
      "TsAPI"
    );
    expect(emailService.sendResetPasswordEmail).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
