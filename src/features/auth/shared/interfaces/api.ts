/**
 * Standard interface for API
 * operations that return data.
 */
export interface ApiResult<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Interface used when an API
 * operation fails.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  field?: string;
}