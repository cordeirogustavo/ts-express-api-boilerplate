import { describe, it, expect, vi, beforeEach } from "vitest";
import { mapUserToUserDto } from "../user.mapper";
import { getTranslate } from "@/shared/utils";
import { generateUserMock } from "./user-mock";
import { CastErrorHandler } from "@/shared/errors/handlers";

describe("User Update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update a user", async () => {
    const { userRepository, userService, user, userInput } = generateUserMock();

    vi.spyOn(userRepository, "updateUser").mockResolvedValueOnce(user);

    const result = await userService.updateUser(
      "test-user-id",
      "test-user-id",
      userInput,
      "en"
    );

    expect(result).toEqual(mapUserToUserDto(user));
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      "test-user-id",
      userInput
    );
  });

  it("should not update a user with different userId", async () => {
    const { userRepository, userService, user, userInput } = generateUserMock();

    vi.spyOn(userRepository, "updateUser").mockResolvedValueOnce(user);

    await expect(
      userService.updateUser(
        "test-user-id",
        "different-test-user-id",
        userInput,
        "en"
      )
    ).rejects.toEqual(
      new CastErrorHandler(getTranslate("invalidUserId", "en"))
    );

    expect(userRepository.updateUser).not.toHaveBeenCalled();
  });
});
