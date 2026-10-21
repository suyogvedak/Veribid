"use client";

import Navbar from "@/components/navbar/navbar";

import Link from "next/link";

import { signIn } from "next-auth/react";

import {
  useState,
} from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        }
      );

      if (result?.error) {
        setError(
          "Invalid email or password."
        );

        setLoading(false);

        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);

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
                <span>✓</span>

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

            {/* RIGHT SIDE FORM STARTS HERE */}
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
                  Welcome Back
                </h2>

                <p
                  className="
                    text-[var(--muted)]
                    mb-8
                  "
                >
                  Sign in to continue
                  bidding and managing
                  your auctions.
                </p>

                {error && (
                  <div
                    className="
                      mb-6

                      rounded-2xl

                      border
                      border-red-500/30

                      bg-red-500/10

                      p-4

                      text-red-500
                      text-sm
                    "
                  >
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleLogin}
                  className="
                    flex
                    flex-col
                    gap-5
                  "
                >

                  {/* EMAIL */}

                  <input
                    type="email"
                    placeholder="Email Address"
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

                  {/* PASSWORD */}

                  <div
                    className="
                      relative
                    "
                  >
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
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
                        pr-14

                        rounded-2xl

                        border
                        border-[var(--border)]

                        bg-transparent

                        outline-none
                      "
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-1/2

                        -translate-y-1/2

                        text-sm

                        text-[var(--muted)]

                        cursor-pointer
                      "
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>

                  {/* REMEMBER + FORGOT */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <label
                      className="
                        flex
                        items-center
                        gap-2

                        text-sm
                      "
                    >
                      <input
                        type="checkbox"
                        checked={
                          rememberMe
                        }
                        onChange={(e) =>
                          setRememberMe(
                            e.target.checked
                          )
                        }
                      />

                      Remember Me
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="
                        text-sm

                        text-violet-600

                        font-medium
                      "
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
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
                      ? "Logging In..."
                      : "Login"}
                  </button>

                  {/* DIVIDER */}

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

                  {/* GOOGLE LOGIN */}

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

                  {/* SIGNUP LINK */}

                  <p
                    className="
                      text-center

                      text-sm

                      text-[var(--muted)]
                    "
                  >
                    Don't have an
                    account?{" "}
                    <Link
                      href="/auth/signup"
                      className="
                        text-violet-600
                        font-semibold
                      "
                    >
                      Create Account
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