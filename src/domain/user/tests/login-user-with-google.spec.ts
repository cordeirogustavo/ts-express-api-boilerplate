import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTranslate } from "@/shared/utils";
import { generateUserMock } from "./user-mock";
import { CastErrorHandler } from "@/shared/errors/handlers";
describe("User Login With Google", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login with facebook when user is already registered", async () => {
    const { userRepository, userService, tokenService, googleProvider, user } =
      generateUserMock();

    vi.spyOn(googleProvider, "authenticate").mockResolvedValueOnce({
      googleId: "mocked-google-id",
      email: user.email || "",
      name: user.name,
      picture: "mocked-google-picture",
    });

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce({
      ...user,
      provider: "google",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    const loggedGoogleUser = await userService.loginWithGoogle(
      "mocked-google-id",
      "en"
    );

    expect(loggedGoogleUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: loggedGoogleUser.token,
      userPicture: user.userPicture,
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

  it("should login with google when user is not registered and create a new user", async () => {
    const { userRepository, userService, tokenService, googleProvider, user } =
      generateUserMock();

    vi.spyOn(googleProvider, "authenticate").mockResolvedValueOnce({
      googleId: "mocked-google-id",
      email: user.email || "",
      name: user.name,
      picture: "mocked-google-picture",
    });

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(userRepository, "createUser").mockResolvedValueOnce({
      ...user,
      provider: "google",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    const loggedGoogleUser = await userService.loginWithGoogle(
      "mocked-google-id",
      "en"
    );

    expect(loggedGoogleUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: loggedGoogleUser.token,
      userPicture: user.userPicture,
    });

    expect(userRepository.createUser).toHaveBeenCalledWith({
      email: user.email,
      name: user.name,
      password: "",
      provider: "google",
      userPicture: "mocked-google-picture",
      status: "ACTIVE",
      providerIdentifier: "mocked-google-id",
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

  it("should fail google login", async () => {
    const { userRepository, userService, tokenService, googleProvider, user } =
      generateUserMock();

    vi.spyOn(googleProvider, "authenticate").mockResolvedValueOnce(null);

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(userRepository, "createUser").mockResolvedValueOnce({
      ...user,
      provider: "google",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    await expect(
      userService.loginWithGoogle("mocked-google-id", "en")
    ).rejects.toEqual(
      new CastErrorHandler(getTranslate("failedGoogleLogin", "en"))
    );

    expect(userRepository.getUserByEmail).not.toHaveBeenCalled();
    expect(userRepository.createUser).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
