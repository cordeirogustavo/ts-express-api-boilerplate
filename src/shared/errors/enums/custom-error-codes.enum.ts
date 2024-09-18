/** Error ranges
 * 1000:1999 – Informational
 * 2000:2999 - Validation error
 * 3000:3999 - Client Error (process.configurations, etc.)
 * 4000:4999 – Database error
 * 5000:5999 – Server Error (files, connections, etc.) */
export const CustomErrorCodes = {
  NOTHING_BEING_UPDATED: 1000,
  MAX_DEVICES_REACHED: 1001,
  TOKEN_NOT_EXPIRED: 1002,
  TOKEN_CANT_BE_RENEWED: 1003,
  NO_APPLICATION_FOUND: 1004,
  NO_CUSTOMER_USER_FOUND: 1005,
  NO_INTEGRATION_FOUND: 1006,
  NO_TEMPLATE_EMAIL_FOUND: 1007,
  NO_CUSTOMER_FOUND: 1008,
  NO_CUSTOMER_PROFILE_FOUND: 1009,
  NO_PRODUCT_FOUND: 1010,

  INVALID_CREDENTIALS: 2000,
  INVALID_TOKEN: 2001,
  VALIDATION_FAILED: 2002,
  INVALID_CONTENT: 2003,
  PASSWORD_EXPIRED: 2004,
  PASSWORD_INVALIDATED: 2005,
  TOO_MANY_TRIES: 2006,
  NOT_AUTHORIZED: 2007,
  NO_PASSWORD_PROVIDED: 2008,
  INVALID_CODE_OTP: 2009,
  DEFAULT_PROFILES_DEACTIVATED: 2010,
  USER_DEACTIVATED: 2011,
  PASSWORD_INVALID_POLICY: 2012,
  REPEATED_PASSWORD: 2013,
  NOT_AVAILABLE_2FA: 2019,

  USER_CUSTOMERS_DEACTIVATED: 3000,
  WRONG_USER_CUSTOMER: 3001,
  CUSTOMER_APPLICATIONS_DEACTIVATED: 3002,

  DUPLICATED_DATA: 4000,
  CAST_ERROR: 4001,
  SYNTAX_ERROR: 4002,
  DIVERGENT_DOCUMENT_CORE: 4003,
  ALERT_NO_CONTACTS_MONITORED: 4004,
  ALERT_NO_BASE_SUMMARY: 4005,
  ALERT_NO_RESPONSIBLE: 4006,
  ALERT_NOTIFICATION_DISABLED: 4007,

  METHOD_NOT_ALLOWED: 5001,
  RESOURCE_NOT_FOUND: 5004,
  UNKNOWN_ERROR: 5002,

  DATABASE_ERROR_UNKNOWN: 5003,
  EXTERNAL_SERVICE_ERROR: 5005,
};