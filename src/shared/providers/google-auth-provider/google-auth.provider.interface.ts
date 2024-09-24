import { TLanguages } from "@/shared/utils/translates";

export type TGoogleUser = {
  googleId: string;
  email: string;
  name: string;
  picture: string;
};

export interface IGoogleAuthProvider {
  authenticate(
    token: string,
    language: TLanguages
  ): Promise<TGoogleUser | null>;
}
