import "dotenv/config";
import { FacebookAuthProvider } from "@/shared/providers";
import { UserRepository } from "../user.repository";
import { EmailService, TemplateService, TokenService } from "@/shared/services";
import { UserService } from "../user.service";
import { GoogleAuthProvider } from "@/shared/providers/google-auth-provider";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { TCreateUserInput, TUser } from "../user.types";

export const generateUserMock = () => {
  const dataBaseConnectionProvider: IDatabaseConnectionProvider =
    {} as unknown as IDatabaseConnectionProvider;
  const APP_SECRET = "mocked-secret";
  const userRepository = new UserRepository(dataBaseConnectionProvider);

  const mockedEmailEnvs = {
    host: "mocked-host",
    port: "mocked-port",
    secure: "mocked-secure",
    auth: {
      user: "mocked-user",
      pass: "mocked-pass",
    },
  };

  const templateService = new TemplateService();
  const tokenService = new TokenService(APP_SECRET);
  const emailService = new EmailService(templateService);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const userService = new UserService(
    userRepository,
    tokenService,
    emailService,
    googleProvider,
    facebookProvider
  );

  const userInput: TCreateUserInput = {
    email: "test@example.com",
    password: "testpassword",
    name: "Test User",
    provider: "TsAPI",
    status: "PENDING",
  };

  const user: TUser = {
    userId: "test-user-id",
    name: "Test",
    email: "test@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    status: "ACTIVE",
    password: "test-password",
    provider: "TsAPI",
    providerIdentifier: "",
    userPicture: "",
    mfaEnabled: false,
    mfaKey: "",
    mfaMethod: null,
  };

  return {
    userRepository,
    userService,
    emailService,
    tokenService,
    googleProvider,
    facebookProvider,
    user,
    userInput,
  };
};
