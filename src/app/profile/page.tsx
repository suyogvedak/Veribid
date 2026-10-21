import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import Navbar from "@/components/navbar/navbar";

export default async function ProfilePage() {
  const session =
  (await getServerSession(
    authOptions as any
  )) as any;

if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },

    include: {
      auctions: true,
      bids: true,
      watchlist: true,
      verification: true,
      accounts: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  const profileFields = [
    user.name,
    user.username,
    user.phoneNumber,
    user.location,
    user.bio,
    user.image,
  ];

  const completedFields =
    profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const accountType =
  user.accounts.some(
    (account) =>
      account.provider === "google"
  )
    ? "Google OAuth"
    : "Email & Password";
  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          pt-32
          pb-16
          px-6
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              mb-8
            "
          >
            My Profile
          </h1>

          <div
            className="
              grid
              lg:grid-cols-3
              gap-8
            "
          >
            {/* LEFT SIDE */}

            <div
              className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-8
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                "
              >
                <div
                  className="
                    w-28
                    h-28
                    rounded-full

                    bg-gradient-to-r
                    from-violet-600
                    to-fuchsia-600

                    flex
                    items-center
                    justify-center

                    text-white
                    text-4xl
                    font-bold
                  "
                >
                  {user.name?.charAt(0) ||
                    user.email.charAt(0)}
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    mt-4
                  "
                >
                  {user.name ||
                    "Unnamed User"}
                </h2>

                <p
                  className="
                    text-[var(--muted)]
                  "
                >
                  @{user.username || "user"}
                </p>
              </div>

              <div
                className="
                  mt-8
                  space-y-4
                "
              >
                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Username
                  </p>

                  <p>
                    @{user.username}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Account Type
                  </p>

                  <p>{accountType}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Email
                  </p>

                  <p>{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Phone
                  </p>

                  <p>
                    {user.phoneNumber ||
                      "Not Added"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Location
                  </p>

                  <p>
                    {user.location ||
                      "Not Added"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Bio
                  </p>

                  <p>
                    {user.bio ||
                      "No bio added"}
                  </p>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="
                  mt-8

                  w-full

                  flex
                  items-center
                  justify-center

                  px-5
                  py-3

                  rounded-xl

                  bg-gradient-to-r
                  from-violet-600
                  to-fuchsia-600

                  text-white
                  font-medium

                  hover:scale-105
                  transition-all
                  duration-300

                  cursor-pointer
                "
              >
                Edit Profile
              </Link>
            </div>

            {/* RIGHT SIDE */}

            <div className="lg:col-span-2 space-y-8">

              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-6
                "
              >
                {/* Verification */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-6
                  "
                >
                  <p className="text-sm text-[var(--muted)]">
                    Verification
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-2
                    "
                  >
                    {user.isVerified
                      ? "Verified"
                      : "Not Verified"}
                  </h3>
                </div>

                {/* Reputation */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-6
                  "
                >
                  <p className="text-sm text-[var(--muted)]">
                    Reputation
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-2
                    "
                  >
                    {user.reputation}
                  </h3>
                </div>

                {/* Profile Completion */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-6
                  "
                >
                  <p className="text-sm text-[var(--muted)]">
                    Profile Completion
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-2
                    "
                  >
                    {profileCompletion}%
                  </h3>

                  <div
                    className="
                      mt-4
                      h-3
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
                      "
                      style={{
                        width:
                          `${profileCompletion}%`,
                      }}
                    />
                  </div>
                </div>
              {/* KYC VERIFICATION STATUS */}
                <div
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-6
                  "
                >
                  <p className="text-sm text-[var(--muted)]">
                    KYC Status
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-2
                    "
                  >
                    {user.verification?.status ??
                      "Pending"}
                  </h3>
                </div>
              </div>

              {/* ACCOUNT DETAILS */}

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-8
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Account Details
                </h2>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Email
                  </p>

                  <p>{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)]">
                    Username
                  </p>

                  <p>@{user.username}</p>
                </div>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-6
                  "
                >
                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Role
                    </p>

                    <p>{user.role}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Total Wins
                    </p>

                    <p>{user.totalWins}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Member Since
                    </p>

                    <p>
                      {user.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Last Updated
                    </p>

                    <p>
                      {user.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            
             {/* SECURITY CARD */}


              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-8
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Security
                </h2>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-6
                  "
                >
                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Authentication Method
                    </p>

                    <p>{accountType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Password Status
                    </p>

                    <p>
                      {user.password
                        ? "Configured"
                        : "Managed By Google"}
                    </p>
                  </div>
                </div>
              </div>

              {/* MARKETPLACE STATS */}

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-8
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Marketplace Statistics
                </h2>

                <div
                  className="
                    grid
                    md:grid-cols-4
                    gap-6
                  "
                >
                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Auctions
                    </p>

                    <p className="text-3xl font-bold">
                      {user.auctions.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Bids
                    </p>

                    <p className="text-3xl font-bold">
                      {user.bids.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Watchlist
                    </p>

                    <p className="text-3xl font-bold">
                      {user.watchlist.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Won Auctions
                    </p>

                    <p className="text-3xl font-bold">
                      {user.totalWins}
                    </p>
                  </div>
                </div>
              </div>

              {/* VERIFICATION CARD */}

              <div
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-8
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Verification Documents
                </h2>

                <div className="space-y-4">

                  <div>
                    Aadhaar:
                    {" "}
                    {user.verification?.aadhaarUrl
                      ? "Uploaded"
                      : "Not Uploaded"}
                  </div>

                  <div>
                    PAN:
                    {" "}
                    {user.verification?.panUrl
                      ? "Uploaded"
                      : "Not Uploaded"}
                  </div>

                  <div>
                    Selfie:
                    {" "}
                    {user.verification?.selfieUrl
                      ? "Uploaded"
                      : "Not Uploaded"}
                  </div>

                  <div>
                    Status:
                    {" "}
                    {user.verification?.status ??
                      "Not Submitted"}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}