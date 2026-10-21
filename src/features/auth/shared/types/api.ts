/**
 * Generic successful API response.
 */
export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

/**
 * Generic failed API response.
 */
export type ApiFailure = {
  success: false;
  message: string;
  field?: string;
  code?: string;
};

/**
 * Standard API response used
 * throughout the authentication system.
 */
export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiFailure;