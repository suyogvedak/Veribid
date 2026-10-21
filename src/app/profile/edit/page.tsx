"use client";

import { useSession } from "next-auth/react";

import {
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar/navbar";

export default function EditProfilePage() {
  const { data: session } =
    useSession();

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [username,
    setUsername] =
    useState("");

  const [phoneNumber,
    setPhoneNumber] =
    useState("");

  const [location,
    setLocation] =
    useState("");

  const [bio, setBio] =
    useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(
        session.user.name
      );
    }
  }, [session]);

  async function saveProfile() {
    const response =
      await fetch(
        "/api/profile/update",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            username,
            phoneNumber,
            location,
            bio,
          }),
        }
      );

    if (response.ok) {
      router.push(
        "/profile"
      );
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
          pb-20
        "
      >
        <div
          className="
            max-w-3xl
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
            Edit Profile
          </h1>

          <div
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-8
              space-y-6
            "
          >
            <div>
              <label>
                Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  border
                "
              />
            </div>

            <div>
              <label>
                Username
              </label>

              <input
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  border
                "
              />
            </div>

            <div>
              <label>
                Phone Number
              </label>

              <input
                value={
                  phoneNumber
                }
                onChange={(e) =>
                  setPhoneNumber(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  border
                "
              />
            </div>

            <div>
              <label>
                Location
              </label>

              <input
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  border
                "
              />
            </div>

            <div>
              <label>
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                rows={5}
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  border
                "
              />
            </div>

            <button
              onClick={
                saveProfile
              }
              className="
                w-full
                py-3
                rounded-xl

                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600

                text-white

                cursor-pointer
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
}