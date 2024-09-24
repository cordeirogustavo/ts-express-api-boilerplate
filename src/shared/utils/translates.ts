export type TLanguages = "pt" | "en";

type TTranslations = {
  [key in TLanguages]: {
    [key: string]: string;
  };
};

export const translations: TTranslations = {
  pt: {
    userAlreadyExists:
      "O usuário já cadastrado, se você esqueceu sua senha tente usar a opção esqueci minha senha",
    userCreated:
      "O usuário foi criado com sucesso, você receberá um e-mail para ativação da sua conta",
    userUpdated: "O usuário foi atualizado com sucesso",
    invalidUserId: "Id de usuário inválido",
    invalidCredentials: "Credenciais inválidas",
    userNotFound: "O usuário não foi encontrado",
    invalidReCaptcha: "ReCaptcha inválido",
    failedInReCaptchaValidation:
      "Falha na validação do reCaptcha, verifique o token informado",
    invalidToken: "Token inválido",
    expiredToken: "Token expirado",
    userNotAuthenticated: "Usuário não autenticado",
    hello: "Olá",
    emailConfirmation: "Bem vindo! Confirme seu endereço de email",
    welcomeActivateEmailMessage:
      "Obrigado por se registrar! Para concluir o processo de criação de sua conta, por favor confirme seu endereço de email clicando no botão abaixo:",
    ignoreEmailMessage:
      "Se você não realizou nenhuma solicitação em nosso site, por favor ignore este e-mail. Este link tem validade de 24 horas.",
    confirmAccount: "Confirmar Conta",
    allRightsReserved: "Todos os direitos reservados",
    forgotPasswordEmailMessage:
      "Recebemos uma solicitação de redefinição de senha, para concluir o processo, por favor crie uma nova senha clicando no botão abaixo:",
    createNewPassword: "Criar Nova Senha",
    forgotPasswordRequestTitle: "Solicitação de redefinição de senha",
    forgotPasswordRequestMessage:
      "Recebemos uma solicitação de redefinição de senha, para concluir o processo verifique seu email",
    failedGoogleLogin: "Falha na autenticação do Google",
    failedFacebookLogin: "Falha na autenticação do Facebook",
  },
  en: {
    userAlreadyExists:
      "User already registered, if you forgot your password, try using forgot password option",
    userCreated:
      "User created successfully, you will receive an email to activate your account",
    userUpdated: "User updated successfully",
    invalidUserId: "Invalid user id",
    invalidCredentials: "Invalid credentials",
    userNotFound: "User not found",
    invalidReCaptcha: "Invalid reCaptcha",
    failedInReCaptchaValidation:
      "Failed in reCaptcha validation, check the token informed",
    invalidToken: "Invalid token",
    expiredToken: "Token expired",
    userNotAuthenticated: "User not authenticated",
    hello: "Hi",
    emailConfirmation: "Welcome! Confirm your email address",
    welcomeActivateEmailMessage:
      "Thank you for registering! To complete the registration process, please confirm your email address by clicking on the button below:",
    ignoreEmailMessage:
      "If you did not make any request on our site, please ignore this email. This link has a validity of 24 hours.",
    confirmAccount: "Confirm Account",
    allRightsReserved: "All rights reserved",
    forgotPasswordEmailMessage:
      "We received a request to reset your password, to complete the process, please create a new password by clicking on the button below:",
    createNewPassword: "Create New Password",
    forgotPasswordRequestTitle: "Reset password requested",
    forgotPasswordRequestMessage:
      "We received a request to reset your password, to complete the process, please check your email",
    failedGoogleLogin: "Failed in Google login",
    failedFacebookLogin: "Failed in Facebook login",
  },
};

export const getTranslate = (key: string, language: string | null = "en") => {
  return translations[language as TLanguages][key];
};
