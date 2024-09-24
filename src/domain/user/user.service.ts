import { inject, singleton } from "tsyringe";
import bcrypt from "bcryptjs";
import { UserSymbols } from "./user.symbols";
import { UserRepository } from "./user.repository";
import { getTranslate, TLanguages, capitalizeWords } from "@/shared/utils";
import { mapUserToUserDto } from "./user.mapper";
import { EmailService, TokenService, ServicesSymbols } from "@/shared/services";
import { ProvidersSymbols } from "@/shared/providers/providers.symbols";
import { IGoogleAuthProvider } from "@/shared/providers/google-auth-provider";
import { IFacebookAuthProvider } from "@/shared/providers";
import {
  TAuthPayload,
  TCreateUserInput,
  TForgotPassword,
  TUpdateUserInput,
  TUserDTO,
} from "./user.types";
import { IUserService } from "./user.service.interface";
import { CastErrorHandler, UnhandledError } from "@/shared/errors/handlers";

@singleton()
export class UserService implements IUserService {
  constructor(
    @inject(UserSymbols.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(ServicesSymbols.TokenService)
    private readonly tokenService: TokenService,
    @inject(ServicesSymbols.EmailService)
    private readonly emailService: EmailService,
    @inject(ProvidersSymbols.GoogleAuthProvider)
    private readonly googleAuthProvider: IGoogleAuthProvider,
    @inject(ProvidersSymbols.FacebookAuthProvider)
    private readonly facebookAuthProvider: IFacebookAuthProvider
  ) {}

  validateUserId = (
    userIdFromRequest: string,
    userIdInput: string,
    language: TLanguages = "en"
  ) => {
    if (userIdFromRequest !== userIdInput) {
      if (!userIdFromRequest) return;
      throw new CastErrorHandler(getTranslate("invalidUserId", language));
    }
  };

  async getUserById(
    userId: string,
    userIdFromRequest: string,
    language: TLanguages
  ): Promise<TUserDTO> {
    this.validateUserId(userIdFromRequest, userId, language);
    const user = await this.userRepository.getUserById(userId);
    if (!user)
      throw new CastErrorHandler(getTranslate("userNotFound", language));
    return mapUserToUserDto(user);
  }

  async createUser(
    userData: TCreateUserInput,
    language: TLanguages
  ): Promise<TUserDTO> {
    const alreadyExists = await this.userRepository.getUserByEmail(
      userData?.email || "",
      "TsAPI"
    );
    if (alreadyExists)
      throw new CastErrorHandler(getTranslate("userAlreadyExists", language));

    const createdUser = await this.userRepository.createUser({
      ...userData,
      name: capitalizeWords(userData?.name),
      email: userData?.email?.toLocaleLowerCase().trim(),
      password: userData?.password
        ? await bcrypt.hash(userData.password, 10)
        : "",
    });

    const user = mapUserToUserDto(createdUser);

    if (!createdUser.email) return user;

    const confirmToken = this.tokenService.sign(
      {
        userId: createdUser.userId,
        email: createdUser.email,
        type: "CONFIRM_ACCOUNT",
      },
      "1d"
    );

    await this.emailService.sendAccountConfirmationEmail(
      createdUser.email,
      createdUser.name,
      language,
      confirmToken
    );

    return user;
  }

  async updateUser(
    userId: string,
    userIdFromRequest: string,
    userData: TUpdateUserInput,
    language: TLanguages
  ): Promise<TUserDTO> {
    this.validateUserId(userIdFromRequest, userId, language);
    const updatedUser = await this.userRepository.updateUser(userId, userData);
    if (!updatedUser)
      throw new CastErrorHandler(getTranslate("userNotFound", language));
    return mapUserToUserDto(updatedUser);
  }

  async confirmAccount(
    token: string,
    language: TLanguages
  ): Promise<TAuthPayload> {
    const decoded = this.tokenService.verify<{
      userId: string;
      email: string;
      type: string;
    }>(token);

    if (!decoded.valid)
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    if (!decoded.payload?.type || decoded.payload.type !== "CONFIRM_ACCOUNT")
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    const user = await this.userRepository.getUserByIdAndEmailAndStatus(
      decoded.payload?.userId,
      decoded.payload?.email,
      "PENDING",
      "TsAPI"
    );

    if (!user)
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    const confirmedUser = await this.userRepository.updateUser(
      decoded.payload?.userId,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        status: "ACTIVE",
      }
    );

    return {
      userId: confirmedUser.userId,
      email: confirmedUser?.email || "",
      name: confirmedUser.name,
      userPicture: confirmedUser.userPicture || "",
      token: this.tokenService.sign(
        {
          userId: confirmedUser.userId,
          name: confirmedUser.name,
          email: confirmedUser.email,
        },
        "1d"
      ),
    };
  }

  async forgotPassword(
    email: string,
    language: TLanguages
  ): Promise<TForgotPassword> {
    const user = await this.userRepository.getUserByEmail(email, "TsAPI");

    if (!user)
      return {
        email: email,
        success: true,
      };

    const resetPasswordToken = this.tokenService.sign(
      {
        userId: user.userId,
        email: user.email,
        type: "FORGOT_PASSWORD",
      },
      "1d"
    );

    if (!user.email) return { email: email, success: true };

    await this.emailService.sendResetPasswordEmail(
      user.email,
      user.name,
      language,
      resetPasswordToken
    );

    return {
      email: email,
      success: true,
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
    language: TLanguages
  ): Promise<TAuthPayload> {
    const decoded = this.tokenService.verify<{
      userId: string;
      email: string;
      type: string;
    }>(token);

    if (!decoded.valid)
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    if (!decoded.payload?.type || decoded.payload.type !== "FORGOT_PASSWORD")
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    const user = await this.userRepository.getUserByIdAndEmail(
      decoded.payload?.userId,
      decoded.payload?.email,
      "TsAPI"
    );

    if (!user)
      throw new CastErrorHandler(getTranslate("invalidToken", language));

    this.validateUserId(decoded.payload?.userId, user.userId, language);

    const updatePasswordUser = await this.userRepository.updateUser(
      user.userId,
      {
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(newPassword, 10),
        status: "ACTIVE",
      }
    );

    return {
      userId: updatePasswordUser.userId,
      email: decoded.payload.email,
      name: updatePasswordUser.name,
      userPicture: updatePasswordUser.userPicture || "",
      token: this.tokenService.sign(
        {
          userId: updatePasswordUser.userId,
          name: updatePasswordUser.name,
          email: updatePasswordUser.email,
        },
        "1d"
      ),
    };
  }

  async login(
    email: string,
    password: string,
    language: TLanguages
  ): Promise<TAuthPayload> {
    const user = await this.userRepository.getUserByEmailAndStatus(
      email.toLocaleLowerCase().trim(),
      "ACTIVE",
      "TsAPI"
    );

    const isPasswordValid = await bcrypt.compare(
      password || "",
      user?.password || ""
    );

    if (!user || !isPasswordValid)
      throw new CastErrorHandler(getTranslate("invalidCredentials", language));

    return {
      userId: user.userId,
      email: user?.email || "",
      name: user.name,
      userPicture: user.userPicture || "",
      token: this.tokenService.sign(
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        "1d"
      ),
    };
  }

  async loginWithGoogle(
    idToken: string,
    language: TLanguages = "en"
  ): Promise<TAuthPayload> {
    const googleUser = await this.googleAuthProvider.authenticate(
      idToken,
      language
    );

    if (!googleUser)
      throw new CastErrorHandler(getTranslate("failedGoogleLogin", language));

    let user = await this.userRepository.getUserByEmail(
      googleUser.email,
      "google"
    );

    if (!user) {
      user = await this.userRepository.createUser({
        email: googleUser.email,
        name: capitalizeWords(googleUser.name),
        provider: "google",
        userPicture: googleUser.picture,
        status: "ACTIVE",
        providerIdentifier: googleUser.googleId,
        password: "",
      });
    }

    return {
      userId: user.userId,
      email: user.email || "",
      name: user.name,
      userPicture: user.userPicture || "",
      token: this.tokenService.sign(
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        "1d"
      ),
    };
  }

  async loginWithFacebook(
    userId: string,
    token: string,
    language: TLanguages = "en"
  ): Promise<TAuthPayload> {
    const facebookUser = await this.facebookAuthProvider.authenticate(
      userId,
      token,
      language
    );

    if (!facebookUser)
      throw new CastErrorHandler(getTranslate("failedFacebookLogin", language));

    let user = await this.userRepository.getUserByEmail(
      facebookUser.email,
      "facebook"
    );

    if (!user) {
      user = await this.userRepository.createUser({
        email: facebookUser.email,
        name: capitalizeWords(facebookUser.name),
        provider: "facebook",
        userPicture: facebookUser.picture,
        status: "ACTIVE",
        providerIdentifier: facebookUser.facebookId,
        password: "",
      });
    }

    return {
      userId: user.userId,
      email: user.email || "",
      name: user.name,
      userPicture: user.userPicture || "",
      token: this.tokenService.sign(
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        "1d"
      ),
    };
  }
}
