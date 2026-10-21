"use client";

import Navbar from "@/components/navbar/navbar";

import Link from "next/link";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/auth/forgot-password",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error
        );

        return;
      }

      setSuccess(
        "Password reset link sent successfully."
      );
    } catch {
      setError(
        "Something went wrong."
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
          pt-32
          px-6
        "
      >
        <div
          className="
            max-w-lg
            mx-auto
          "
        >
          <div
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-8
            "
          >
            <h1
              className="
                text-3xl
                font-bold
                mb-2
              "
            >
              Forgot Password
            </h1>

            <p
              className="
                text-[var(--muted)]
                mb-8
              "
            >
              Enter your email and
              we'll send you a
              password reset link.
            </p>

            {error && (
              <div
                className="
                  mb-4
                  text-red-500
                "
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="
                  mb-4
                  text-green-500
                "
              >
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="
                flex
                flex-col
                gap-4
              "
            >
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
                  p-4
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-transparent
                "
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  py-4

                  rounded-2xl

                  bg-violet-600

                  text-white

                  font-semibold
                "
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>
            </form>

            <Link
              href="/auth/login"
              className="
                mt-6
                inline-block

                text-violet-600
              "
            >
              Back To Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}