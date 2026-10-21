import zxcvbn from "zxcvbn";

export function evaluatePassword(
  password: string
) {
  const result = zxcvbn(password);

  let label = "Very Weak";

  switch (result.score) {
    case 0:
      label = "Very Weak";
      break;

    case 1:
      label = "Weak";
      break;

    case 2:
      label = "Fair";
      break;

    case 3:
      label = "Good";
      break;

    case 4:
      label = "Strong";
      break;
  }

  return {
    score: result.score,
    label,
    feedback:
      result.feedback.warning ||
      result.feedback.suggestions.join(" "),
  };
}