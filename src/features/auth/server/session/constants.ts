/**
 * Authentication Routes
 */

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",

  SIGNUP: "/auth/signup",

  FORGOT_PASSWORD: "/auth/forgot-password",

  RESET_PASSWORD: "/auth/reset-password",

  COMPLETE_PROFILE: "/complete-profile",

  PROFILE: "/profile",

  HOME: "/",
} as const;

/**
 * Route Prefixes
 */

export const AUTH_ROUTE_PREFIX = {
  AUTH: "/auth",

  API_AUTH: "/api/auth",
} as const;