import { singleton } from "tsyringe";
import {
  IFacebookAuthProvider,
  TFacebookUser,
} from "./facebook-auth.provider.interface";
import { getTranslate, TLanguages } from "@/shared/utils/translates";
import { CastErrorHandler } from "@/shared/errors/handlers";

@singleton()
export class FacebookAuthProvider implements IFacebookAuthProvider {
  async authenticate(
    userId: string,
    token: string,
    language: TLanguages
  ): Promise<TFacebookUser | null> {
    const userInfoResponse = await fetch(
      `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`,
      {
        method: "GET",
      }
    );

    if (!userInfoResponse.ok) {
      const errorText = await userInfoResponse.text();
      throw new CastErrorHandler(getTranslate("failedFacebookLogin", language));
    }

    const userInfo = await userInfoResponse.json();

    if (!userInfo.id) {
      throw new CastErrorHandler(getTranslate("failedFacebookLogin", language));
    }

    return {
      facebookId: userInfo.id,
      email: userInfo.email || "",
      name: userInfo.name || "",
      picture: userInfo.picture?.data?.url || "",
    };
  }
}
