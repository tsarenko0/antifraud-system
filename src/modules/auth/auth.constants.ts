export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_NOT_FOUND_E = 'Refresh token not found.';
export const USER_EMAIL_EXISTS_E = 'User with this email already exists.';
export const getRefreshCacheKey = (refresh: string) => `refresh:${refresh}`;
export const USER_REFRESH_NOT_FOUND_E =
  'User connected with this refresh token not found.';
export const REFRESH_USER_NOT_EXISTS_E =
  "User connected with this refresh token doesn't exist now.";
export const USER_EMAIL_NOT_EXISTS_E = "User with this email doesn't exist";
export const WRONG_PASSWORD_E = 'Wrong password';

export const PASSWORD_MIN_LEN = 8;
export const PASSWORD_MAX_LEN = 72;
