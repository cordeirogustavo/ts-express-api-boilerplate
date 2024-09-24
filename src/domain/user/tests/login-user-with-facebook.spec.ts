import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTranslate } from "@/shared/utils";
import { generateUserMock } from "./user-mock";
import { CastErrorHandler } from "@/shared/errors/handlers";
describe("User Login With facebook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login with facebook when user is already registered", async () => {
    const {
      userRepository,
      userService,
      tokenService,
      facebookProvider,
      user,
    } = generateUserMock();

    vi.spyOn(facebookProvider, "authenticate").mockResolvedValueOnce({
      facebookId: "mocked-facebook-id",
      email: user.email || "",
      name: user.name,
      picture: "mocked-facebook-picture",
    });

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce({
      ...user,
      provider: "facebook",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    const loggedFacebookUser = await userService.loginWithFacebook(
      "mocked-facebook-id",
      "en"
    );

    expect(loggedFacebookUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: loggedFacebookUser.token,
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

  it("should login with facebook when user is not registered and create a new user", async () => {
    const {
      userRepository,
      userService,
      tokenService,
      facebookProvider,
      user,
    } = generateUserMock();

    vi.spyOn(facebookProvider, "authenticate").mockResolvedValueOnce({
      facebookId: "mocked-facebook-id",
      email: user.email || "",
      name: user.name,
      picture: "mocked-facebook-picture",
    });

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(userRepository, "createUser").mockResolvedValueOnce({
      ...user,
      provider: "facebook",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    const loggedFacebookUser = await userService.loginWithFacebook(
      "mocked-facebook-id",
      "en"
    );

    expect(loggedFacebookUser).toEqual({
      userId: user.userId,
      email: user.email,
      name: user.name,
      token: loggedFacebookUser.token,
      userPicture: user.userPicture,
    });

    expect(userRepository.createUser).toHaveBeenCalledWith({
      email: user.email,
      name: user.name,
      password: "",
      provider: "facebook",
      userPicture: "mocked-facebook-picture",
      status: "ACTIVE",
      providerIdentifier: "mocked-facebook-id",
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

  it("should fail facebook login", async () => {
    const {
      userRepository,
      userService,
      tokenService,
      facebookProvider,
      user,
    } = generateUserMock();

    vi.spyOn(facebookProvider, "authenticate").mockResolvedValueOnce(null);

    vi.spyOn(userRepository, "getUserByEmail").mockResolvedValueOnce(null);
    vi.spyOn(userRepository, "createUser").mockResolvedValueOnce({
      ...user,
      provider: "facebook",
    });

    vi.spyOn(tokenService, "sign").mockResolvedValueOnce("mocked-jwt-token");

    await expect(
      userService.loginWithFacebook("mocked-facebook-id", "en")
    ).rejects.toEqual(
      new CastErrorHandler(getTranslate("failedFacebookLogin", "en"))
    );

    expect(userRepository.getUserByEmail).not.toHaveBeenCalled();
    expect(userRepository.createUser).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
