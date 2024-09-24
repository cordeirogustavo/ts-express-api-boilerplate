import { TLanguages } from "@/shared/utils/translates";

export type TFacebookUser = {
  facebookId: string;
  email: string;
  name: string;
  picture: string;
};

export interface IFacebookAuthProvider {
  authenticate(
    userId: string,
    token: string,
    language: TLanguages
  ): Promise<TFacebookUser | null>;
}
