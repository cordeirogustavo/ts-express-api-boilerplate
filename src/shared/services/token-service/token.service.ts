import {
  SignOptions,
  sign,
  verify,
  Algorithm as JWTAlgorithms,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { singleton } from "tsyringe";

export type JWTVerificationResult<T> = {
  valid: boolean;
  payload?: T;
  error?: string;
};

export type Algorithm = JWTAlgorithms;

@singleton()
export class TokenService {
  private readonly tokenOptions: SignOptions;

  constructor(
    private readonly secret: string,
    private readonly algorithm: Algorithm = "HS256"
  ) {
    this.tokenOptions = {
      algorithm,
    };
  }

  /**
   * Generate a token based on the payload
   *
   * @param payload content to be encoded
   * @param expiresIn if you need to set an expiration date, you can set it as string (e.g. '1h')
   */
  sign(payload: unknown, expiresIn?: string): string {
    const customOptions = expiresIn
      ? { ...this.tokenOptions, expiresIn }
      : this.tokenOptions;

    return sign(payload as any, this.secret, customOptions);
  }

  verify<T>(
    token: string,
    options?: {
      nonce?: string | undefined;
      subject?: string | undefined;
      maxAge?: string | number | undefined;
      issuer?: string | string[] | undefined;
      jwtid?: string | undefined;
    }
  ): JWTVerificationResult<T> {
    try {
      const payload = verify(token, this.secret, {
        ...options,
        algorithms: [this.algorithm],
      }) as T;

      return {
        valid: true,
        payload,
      };
    } catch (err: unknown) {
      return {
        valid: false,
        error:
          err instanceof TokenExpiredError
            ? "expiredToken"
            : err instanceof JsonWebTokenError
            ? "invalidToken"
            : String(err),
      };
    }
  }
}
