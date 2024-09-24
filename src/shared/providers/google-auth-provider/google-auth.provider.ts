import { singleton } from "tsyringe";
import {
  IGoogleAuthProvider,
  TGoogleUser,
} from "./google-auth.provider.interface";
import { getTranslate, TLanguages } from "@/shared/utils/translates";
import { CastErrorHandler } from "@/shared/errors/handlers";
@singleton()
export class GoogleAuthProvider implements IGoogleAuthProvider {
  async authenticate(
    idToken: string,
    language: TLanguages
  ): Promise<TGoogleUser | null> {
    const requestQueryParams = {
      code: idToken,
      client_id: process.settings.google.oauth.clientId || "",
      client_secret: process.settings.google.oauth.clientSecret || "",
      redirect_uri: process.settings.app.url || "",
      grant_type: "authorization_code",
    };

    const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestQueryParams),
    });

    if (!tokenResponse.ok) {
      throw new CastErrorHandler(getTranslate("failedGoogleLogin", language));
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new CastErrorHandler(getTranslate("failedGoogleLogin", language));
    }
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new CastErrorHandler(getTranslate("failedGoogleLogin", language));
    }

    const userInfo = await userInfoResponse.json();

    return {
      googleId: userInfo.id,
      email: userInfo.email || "",
      name: userInfo.name || "",
      picture: userInfo.picture || "",
    };
  }
}
