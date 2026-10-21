import zxcvbn from "zxcvbn";

import type {
  PasswordStrengthResult,
} from "./types";

const LABELS = [
  "Very Weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
] as const;

export function calculatePasswordStrength(
  password: string,
  userInputs: string[] = []
): PasswordStrengthResult {

  const result = zxcvbn(
    password,
    userInputs.filter(Boolean)
  );

  return {

    score: result.score,

    strength: LABELS[result.score],

    estimatedCrackTime: {

      online: String(
        result.crack_times_display
          .online_no_throttling_10_per_second
      ),

      offline: String(
        result.crack_times_display
          .offline_slow_hashing_1e4_per_second
      ),

    },

    feedback: [

      ...(result.feedback.warning
        ? [result.feedback.warning]
        : []),

      ...result.feedback.suggestions,

    ],

  };

}