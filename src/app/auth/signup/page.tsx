"use client";

import Navbar from "@/components/navbar/navbar";

import Link from "next/link";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  evaluatePassword,
} from "@/lib/passwordStrength";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    usernameAvailable,
    setUsernameAvailable,
  ] = useState<boolean | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [
    acceptTerms,
    setAcceptTerms,
  ] = useState(false);

  const strength =
    evaluatePassword(password);

  // --------------------------------------------
  // Username availability
  // --------------------------------------------

  useEffect(() => {
    if (username.length < 3) {
      setUsernameAvailable(null);

      return;
    }

    const timer =
      setTimeout(async () => {
        try {
          const response =
            await fetch(
              "/api/auth/check-username",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  username:
                    username.trim(),
                }),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            setUsernameAvailable(null);

            return;
          }

          setUsernameAvailable(
            data.available === true
          );

        } catch {
          setUsernameAvailable(null);
        }
      }, 500);

    return () =>
      clearTimeout(timer);
  }, [username]);

  // --------------------------------------------
  // Signup
  // --------------------------------------------

  async function handleSignup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    // ------------------------------------------
    // Terms
    // ------------------------------------------

    if (!acceptTerms) {
      setError(
        "Please accept the Terms & Conditions."
      );

      return;
    }

    // ------------------------------------------
    // Username
    // ------------------------------------------

    if (
      usernameAvailable !== true
    ) {
      setError(
        usernameAvailable === false
          ? "Username already exists."
          : "Please enter a valid username."
      );

      return;
    }

    // ------------------------------------------
    // Password confirmation
    // ------------------------------------------

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    // ------------------------------------------
    // Password requirements
    // ------------------------------------------

    if (
      password.length < 8
    ) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }

    if (
      !/[A-Z]/.test(password)
    ) {
      setError(
        "Password must contain an uppercase letter."
      );

      return;
    }

    if (
      !/[a-z]/.test(password)
    ) {
      setError(
        "Password must contain a lowercase letter."
      );

      return;
    }

    if (
      !/[0-9]/.test(password)
    ) {
      setError(
        "Password must contain a number."
      );

      return;
    }

    if (
      !/[^A-Za-z0-9]/.test(
        password
      )
    ) {
      setError(
        "Password must contain a special character."
      );

      return;
    }

    // Must match the server-side
    // PasswordValidator requirement.
    if (
      strength.score < 3
    ) {
      setError(
        "Password is too weak."
      );

      return;
    }

    // ------------------------------------------
    // Submit
    // ------------------------------------------

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/auth/signup",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                name.trim(),

              username:
                username.trim(),

              email:
                email.trim()
                  .toLowerCase(),

              password,

              confirmPassword,
            }),
          }
        );

      const data =
        await response.json();

      // ----------------------------------------
      // API error
      // ----------------------------------------

      if (!response.ok) {
        setError(
          data.message ||
          "Signup failed."
        );

        return;
      }

      // ----------------------------------------
      // Signup successful
      // ----------------------------------------

      if (data.success) {
        router.push(
          "/auth/login"
        );

        return;
      }

      setError(
        data.message ||
        "Signup failed."
      );

    } catch {
      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          pt-24
          relative
          overflow-hidden
          bg-[var(--background)]
        "
      >

        {/* Background */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            pointer-events-none
          "
        >
          <div
            className="
              absolute
              -top-32
              -left-32
              w-[500px]
              h-[500px]
              rounded-full
              bg-violet-600/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              w-[500px]
              h-[500px]
              rounded-full
              bg-fuchsia-600/10
              blur-[120px]
            "
          />

          {/* Auction Hammer Silhouette */}

          <div
            className="
              hidden
              lg:flex

              absolute
              top-1/2
              left-1/3

              -translate-x-1/2
              -translate-y-1/2

              text-[28rem]
              font-black

              text-[var(--foreground)]
              opacity-[0.03]

              select-none
            "
          >
            ⚒
          </div>
        </div>

        <div
          className="
            relative
            z-10

            max-w-7xl
            mx-auto

            px-6
            py-10
          "
        >
          <div
            className="
              grid
              lg:grid-cols-2
              gap-12
              items-center
            "
          >

            {/* LEFT SIDE */}

            <div
              className="
                hidden
                lg:flex

                flex-col
                justify-center
              "
            >
              <div
                className="
                  inline-flex
                  items-center

                  gap-2

                  px-4
                  py-2

                  rounded-full

                  border
                  border-[var(--border)]

                  w-fit

                  mb-6
                "
              >
                <span>
                  ✓
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Trusted Across India
                </span>
              </div>

              <h1
                className="
                  text-6xl
                  font-black
                  leading-tight
                  mb-6
                "
              >
                VeriBid
              </h1>

              <p
                className="
                  text-xl
                  text-[var(--muted)]
                  mb-10
                  max-w-xl
                "
              >
                Next Generation Auction
                Marketplace built for
                secure bidding,
                verified users,
                and trusted
                transactions.
              </p>

              {/* Features */}

              <div
                className="
                  space-y-5
                  mb-12
                "
              >
                <div>
                  ✓ Identity Verified Users
                </div>

                <div>
                  ✓ Secure Bidding System
                </div>

                <div>
                  ✓ Fraud Detection
                </div>

                <div>
                  ✓ Real-Time Auctions
                </div>

                <div>
                  ✓ Trusted Transactions
                </div>
              </div>

              {/* Stats */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-4
                "
              >
                <div
                  className="
                    p-5
                    rounded-3xl

                    border
                    border-[var(--border)]

                    bg-[var(--card)]
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    12K+
                  </h3>

                  <p
                    className="
                      text-sm
                      text-[var(--muted)]
                    "
                  >
                    Auctions Hosted
                  </p>
                </div>

                <div
                  className="
                    p-5
                    rounded-3xl

                    border
                    border-[var(--border)]

                    bg-[var(--card)]
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    5K+
                  </h3>

                  <p
                    className="
                      text-sm
                      text-[var(--muted)]
                    "
                  >
                    Verified Users
                  </p>
                </div>

                <div
                  className="
                    p-5
                    rounded-3xl

                    border
                    border-[var(--border)]

                    bg-[var(--card)]
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    ₹2.5Cr+
                  </h3>

                  <p
                    className="
                      text-sm
                      text-[var(--muted)]
                    "
                  >
                    Transactions
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}

            <div
              className="
                w-full
                max-w-xl
                mx-auto
              "
            >
              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  shadow-2xl

                  p-8
                  md:p-10
                "
              >
                <h2
                  className="
                    text-4xl
                    font-bold
                    mb-2
                  "
                >
                  Create Account
                </h2>

                <p
                  className="
                    text-[var(--muted)]
                    mb-8
                  "
                >
                  Join the trusted marketplace
                  for verified auctions.
                </p>



                {error && (
                  <div
                    className="
                      mb-6
                      rounded-2xl
                      border border-red-500/30
                      bg-red-500/10
                      p-4
                      text-sm
                    "
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-red-500">
                        {error}
                      </p>

                      {error.toLowerCase().includes("email already exists") && (
                        <Link
                          href={`/auth/login?email=${encodeURIComponent(
                            email.trim().toLowerCase()
                          )}`}
                          className="
                            whitespace-nowrap
                            font-semibold
                            text-violet-500
                            hover:text-violet-400
                            transition-colors
                          "
                        >
                          Continue to Login →
                        </Link>
                      )}
                    </div>
                  </div>
                )}



                <form
                  onSubmit={handleSignup}
                  className="
                    flex
                    flex-col
                    gap-5
                  "
                >

                  {/* Full Name */}

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      p-4

                      rounded-2xl

                      border
                      border-[var(--border)]

                      bg-transparent

                      outline-none
                    "
                    required
                  />

                  {/* Username */}

                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value
                        )
                      }
                      className="
                        w-full

                        p-4

                        rounded-2xl

                        border
                        border-[var(--border)]

                        bg-transparent

                        outline-none
                      "
                      required
                    />

                    {username.length >= 3 && (
                      <div
                        className="
                          mt-2
                          text-sm
                        "
                      >
                        {usernameAvailable === true ? (
                          <span
                            className="
                              text-green-500
                            "
                          >
                            ✓ Username available
                          </span>
                        ) : usernameAvailable === false ? (
                          <span
                            className="
                              text-red-500
                            "
                          >
                            ✗ Username already taken
                          </span>
                        ) : (
                          <span
                            className="
                              text-[var(--muted)]
                            "
                          >
                            Checking username...
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Email */}

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      p-4

                      rounded-2xl

                      border
                      border-[var(--border)]

                      bg-transparent

                      outline-none
                    "
                    required
                  />

                  {/* Password */}

                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      className="
                        w-full

                        p-4

                        rounded-2xl

                        border
                        border-[var(--border)]

                        bg-transparent

                        outline-none
                      "
                      required
                    />

                    {/* Strength Meter */}

                    {password && (
                      <div
                        className="
                          mt-3
                        "
                      >
                        <div
                          className="
                            h-2

                            rounded-full

                            bg-black/10
                            dark:bg-white/10
                          "
                        >
                          <div
                            className="
                              h-full

                              rounded-full

                              bg-violet-600

                              transition-all
                              duration-300
                            "
                            style={{
                              width: `${(strength.score + 1) * 20
                                }%`,
                            }}
                          />
                        </div>

                        <div
                          className="
                            mt-2

                            flex
                            items-center
                            justify-between
                          "
                        >
                          <span
                            className="
                              text-sm
                              text-[var(--muted)]
                            "
                          >
                            Password Strength
                          </span>

                          <span
                            className="
                              text-sm
                              font-medium
                            "
                          >
                            {strength.label}
                          </span>
                        </div>

                        {strength.feedback && (
                          <p
                            className="
                              text-xs
                              mt-2
                              text-orange-500
                            "
                          >
                            {strength.feedback}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      p-4

                      rounded-2xl

                      border
                      border-[var(--border)]

                      bg-transparent

                      outline-none
                    "
                    required
                  />

                  {confirmPassword && (
                    <div
                      className="
                        text-sm
                      "
                    >
                      {password ===
                        confirmPassword ? (
                        <span
                          className="
                            text-green-500
                          "
                        >
                          ✓ Passwords match
                        </span>
                      ) : (
                        <span
                          className="
                            text-red-500
                          "
                        >
                          ✗ Passwords do not match
                        </span>
                      )}
                    </div>
                  )}

                  {/* Terms */}

                  <label
                    className="
                      flex
                      items-start
                      gap-3

                      text-sm
                    "
                  >
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) =>
                        setAcceptTerms(
                          e.target.checked
                        )
                      }
                      className="
                        mt-1
                      "
                    />

                    <span>
                      I agree to the
                      Terms &
                      Conditions and
                      Privacy Policy.
                    </span>
                  </label>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      usernameAvailable !== true ||
                      password !== confirmPassword ||
                      !acceptTerms
                    }
                    className="
                      w-full

                      py-4

                      rounded-2xl

                      bg-violet-600

                      text-white

                      font-semibold

                      hover:bg-violet-700

                      transition-all

                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create Account"}
                  </button>

                  {/* Divider */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex-1
                        h-px
                        bg-[var(--border)]
                      "
                    />

                    <span
                      className="
                        text-sm
                        text-[var(--muted)]
                      "
                    >
                      OR
                    </span>

                    <div
                      className="
                        flex-1
                        h-px
                        bg-[var(--border)]
                      "
                    />
                  </div>

                  {/* Google */}

                  <button
                    type="button"
                    onClick={() =>
                      signIn(
                        "google",
                        {
                          callbackUrl:
                            "/",
                        }
                      )
                    }
                    className="
                      w-full

                      py-4

                      rounded-2xl

                      border
                      border-[var(--border)]

                      hover:bg-[var(--card)]

                      transition-all
                    "
                  >
                    Continue With Google
                  </button>

                  {/* Login Link */}

                  <p
                    className="
                      text-center
                      text-sm
                      text-[var(--muted)]
                    "
                  >
                    Already have an
                    account?{" "}
                    <Link
                      href="/auth/login"
                      className="
                        text-violet-600
                        font-semibold
                      "
                    >
                      Login
                    </Link>
                  </p>

                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}