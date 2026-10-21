"use client";

import Navbar from "@/components/navbar/navbar";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [
    usernameAvailable,
    setUsernameAvailable,
  ] = useState<boolean | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function checkUsername(
    value: string
  ) {
    setUsername(value);

    if (value.length < 3) {
      setUsernameAvailable(null);
      return;
    }

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
              username: value,
            }),
          }
        );

      const data =
        await response.json();

      setUsernameAvailable(
        data.available
      );
    } catch {
      setUsernameAvailable(null);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (
      usernameAvailable !== true
    ) {
      setError(
        "Please choose an available username."
      );

      return;
    }

    try {
      setLoading(true);

    if (!username.trim()) {
  setError(
    "Username is required"
  );
  return;
}

if (!phoneNumber.trim()) {
  setError(
    "Phone Number is required"
  );
  return;
}

if (!location.trim()) {
  setError(
    "Location is required"
  );
  return;
}

      const response =
        await fetch(
          "/api/profile/complete",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              username,
              phoneNumber,
              location,
              bio,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Failed to save profile."
        );

        setLoading(false);

        return;
      }

      router.push("/");
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
          pt-24
          px-6
          relative
          overflow-hidden
        "
      >
        {/* Background */}

        <div
          className="
            absolute
            inset-0
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
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              text-[30rem]

              font-black

              opacity-[0.03]
            "
          >
            ⚒
          </div>
        </div>

        <div
          className="
            relative
            z-10

            max-w-6xl
            mx-auto
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
            {/* LEFT */}

            <div
              className="
                hidden
                lg:block
              "
            >
              <h1
                className="
                  text-6xl
                  font-black
                  mb-6
                "
              >
                Complete
                Your Profile
              </h1>

              <p
                className="
                  text-xl
                  text-[var(--muted)]
                  mb-8
                "
              >
                Choose your username
                and finish setting up
                your VeriBid account.
              </p>

              <div
                className="
                  space-y-4
                "
              >
                <div>
                  ✓ Public Username
                </div>

                <div>
                  ✓ Seller Reputation
                </div>

                <div>
                  ✓ Auction Identity
                </div>

                <div>
                  ✓ Verified Marketplace
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <div
                className="
                  rounded-3xl

                  border
                  border-[var(--border)]

                  bg-[var(--background)]

                  shadow-xl

                  p-8
                "
              >
                <h2
                  className="
                    text-3xl
                    font-bold
                    mb-2
                  "
                >
                  Finish Setup
                </h2>

                <p
                  className="
                    text-[var(--muted)]
                    mb-8
                  "
                >
                  Complete your
                  VeriBid profile.
                </p>

                {error && (
                  <div
                    className="
                      mb-6

                      p-4

                      rounded-2xl

                      bg-red-500/10

                      border
                      border-red-500/30

                      text-red-500
                    "
                  >
                    {error}
                  </div>
                )}

                <div
                  className="
                    mb-8

                    rounded-2xl

                    border
                    border-[var(--border)]

                    p-4
                  "
                >
                  <h3
                    className="
                      font-semibold
                      mb-3
                    "
                  >
                    Required To Continue
                  </h3>

                  <div
                    className="
                      space-y-2
                      text-sm
                    "
                  >
                    <div>
                      {username
                        ? "✓"
                        : "○"} Username
                    </div>

                    <div>
                      {phoneNumber
                        ? "✓"
                        : "○"} Phone Number
                    </div>

                    <div>
                      {location
                        ? "✓"
                        : "○"} Location
                    </div>

                    <div>
                      ○ Bio (Optional)
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="
                    flex
                    flex-col
                    gap-5
                  "
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) =>
                        checkUsername(
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
                      "
                      required
                    />

                    {username.length >
                      2 && (
                      <div
                        className="
                          mt-2
                          text-sm
                        "
                      >
                        {usernameAvailable ? (
                          <span
                            className="
                              text-green-500
                            "
                          >
                            ✓ Username
                            available
                          </span>
                        ) : (
                          <span
                            className="
                              text-red-500
                            "
                          >
                            ✗ Username
                            already taken
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={
                      phoneNumber
                    }
                    onChange={(e) =>
                      setPhoneNumber(
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
                  />

                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                      setLocation(
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
                  />

                  <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) =>
                      setBio(
                        e.target.value
                      )
                    }
                    rows={4}
                    className="
                      p-4

                      rounded-2xl

                      border
                      border-[var(--border)]

                      bg-transparent
                    "
                  />

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      usernameAvailable !== true ||
                      !phoneNumber.trim() ||
                      !location.trim()
                      }
                    className="
                      py-4

                      rounded-2xl

                      bg-violet-600

                      text-white

                      font-semibold

                      cursor-pointer

                      hover:bg-violet-700

                      transition-all

                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading
                      ? "Saving..."
                      : "Save & Continue"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}