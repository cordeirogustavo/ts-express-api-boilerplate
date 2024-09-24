export type TUserForgotPasswordEmail = {
  hello: string;
  userName: string;
  forgotPasswordEmailMessage: string;
  ignoreEmailMessage: string;
  createNewPassword: string;
  createNewPasswordLink: string;
  allRightsReserved: string;
};
export const UserForgotPasswordEmailTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <!-- Forcing initial-scale shouldn't be necessary -->
    <meta name="viewport" content="width=device-width" />
    <!-- Use the latest (edge) version of IE rendering engine -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <meta name="x-apple-disable-message-reformatting" />
    <!-- Tell iOS not to automatically link certain text strings. -->
    <meta
      name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no"
    />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
      rel="stylesheet"
    />
    <title></title>
  </head>
  <body>
    <div
      style="
        text-align: center;
        width: 100%;
        display: inline-block;
        background-color: #18181b;
      "
    >
      <div style="width: 600px; margin: 0 auto; background-color: #18181b">
        <table
          style="
            border: none;
            width: 600px;
            margin: 0 auto;
            display: inline-block;
            background-color: #18181b;
          "
          border="0"
          cellspacing="0"
          cellpadding="0"
          align="center"
        >
          <tbody>
            <tr>
              <td
                style="
                  height: 50px;
                  width: 520px;
                  padding: 20px 40px;
                  text-align: center;
                  background-color: #18181b;
                  border-bottom: 1px solid #27272a;
                "
              >
                <img
                  src=""
                  alt="logo"
                  style="
                    max-width: 100%;
                    max-height: 100%;
                    width: 100;
                    height: 100;
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="600"
          style="
            border: none;
            width: 600px;
            margin: 0 auto;
            display: inline-block;
            background-color: #18181b;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  padding: 20px 20px 10px 40px;
                  font-size: 15px;
                  line-height: 20px;
                  color: #555555;
                  text-align: left;
                "
              >
                <h1
                  style="
                    margin: 0 0 14px 0;
                    font-size: 20px;
                    line-height: 24px;
                    color: #d4d4d8;
                    font-weight: 300;
                    font-family: Roboto, RobotoDraft, Helvetica, Arial,
                      sans-serif;
                  "
                >
                  <%= hello %>, <%= userName %>,
                </h1>
                <p
                  style="
                    font-size: 13px;
                    font-weight: 300;
                    margin: 0;
                    color: #d4d4d8;
                    font-family: Roboto, RobotoDraft, Helvetica, Arial,
                      sans-serif;
                  "
                >
                  <%= forgotPasswordEmailMessage %>
                </p>
                <br />
                <p
                  style="
                    font-size: 13px;
                    font-weight: 300;
                    margin: 0;
                    color: #d4d4d8;
                    font-family: Roboto, RobotoDraft, Helvetica, Arial,
                      sans-serif;
                  "
                >
                  <%= ignoreEmailMessage %>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="240"
          style="
            border: none;
            width: 240px;
            margin: 0 auto;
            display: inline-block;
            background-color: #18181b;
            padding: 0;
          "
        >
          <tbody>
            <tr>
              <td colspan="5">
                <p>&nbsp;</p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background: #f3f4f6;
                  border-radius: 8px;
                  vertical-align: middle;
                  text-align: center;
                  padding: 10px 0;
                  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                  width: 100%;
                "
              >
                <a
                  href="<%= createNewPasswordLink %>"
                  target="_blank"
                  rel="noopener"
                  style="
                    text-decoration: none;
                    display: inline-block;
                    width: 240px;
                    text-align: center;
                    color: #18181b;
                    font-size: 18px;
                    font-family: Roboto, RobotoDraft, Helvetica, Arial,
                      sans-serif;
                    font-weight: 400;
                    line-height: 23.4px;
                    white-space: nowrap;
                  "
                >
                  <%= createNewPassword %>
                </a>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="600"
          style="
            border: none;
            width: 600px;
            margin: 0 auto;
            display: inline-block;
            background-color: #18181b;
          "
        >
          <tbody>
            <tr>
              <td style="text-align: left; padding: 0px 40px 40px">
                <p
                  style="
                    margin-top: 8px !important;
                    font-size: 11px;
                    font-weight: 300;
                    margin: 0;
                    color: #d4d4d8;
                    font-family: Roboto, RobotoDraft, Helvetica, Arial,
                      sans-serif;
                  "
                >
                  CryptoPeek © <%= allRightsReserved %>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>
`;
