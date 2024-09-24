export interface ITokenService {
  /**
   * Generate a token based on the payload
   *
   * @param payload content to be encoded
   * @param expiresIn if you need to set an expiration date, you can set it as string (e.g. '1h')
   */
  sign<P = any>(payload: P, expiresIn?: string): string;
}
