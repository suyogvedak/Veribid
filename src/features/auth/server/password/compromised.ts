import crypto from "crypto";

export async function isPasswordCompromised(
  password: string
): Promise<boolean> {

  const hash = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  const prefix = hash.substring(0, 5);

  const suffix = hash.substring(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
    {
      headers: {
        "Add-Padding": "true",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to query HIBP."
    );
  }

  const text = await response.text();

  return text
    .split("\n")
    .some((line) =>
      line.startsWith(suffix)
    );
}