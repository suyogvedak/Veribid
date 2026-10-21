export type PasswordIssueCode =
  | "MIN_LENGTH"
  | "MAX_LENGTH"
  | "CONTAINS_EMAIL"
  | "CONTAINS_USERNAME"
  | "CONTAINS_NAME"
  | "WEAK_PASSWORD"
  | "COMPROMISED_PASSWORD";

export type PasswordSeverity =
  | "info"
  | "warning"
  | "error";

export interface PasswordIssue {
  code: PasswordIssueCode;

  message: string;

  severity: PasswordSeverity;
}

export interface PasswordValidationInput {
  password: string;

  email?: string;

  username?: string;

  name?: string;
}

export interface PasswordStrengthResult {
  score: number;

  strength:
    | "Very Weak"
    | "Weak"
    | "Fair"
    | "Good"
    | "Strong";

  estimatedCrackTime: {
    online: string;

    offline: string;
  };

  feedback: string[];
}

export interface PasswordValidationResult {
  valid: boolean;

  score: number;

  strength:
    | "Very Weak"
    | "Weak"
    | "Fair"
    | "Good"
    | "Strong";

  estimatedCrackTime: {
    online: string;

    offline: string;
  };

  breached: boolean;

  issues: PasswordIssue[];
}