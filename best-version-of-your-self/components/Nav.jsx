"use client";
import Link from "next/link"
import Image from "next/image"
import api from "../utils/api";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";


/* Todo:
- handle isloggedin
- populate with more data
- change host with .env host
*/

const Nav = () => {
  const router = useRouter()
  const isLoggedin = true;

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [username, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedin) {
        try {
          const response = await api.get('http://localhost:8000/api/v1/user/');
          setUser(response.data.username);
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isLoggedin]); // Run effect only when isLoggedin changes

  function signOut() {
    localStorage.clear()
    router.push('/')
  }

  return (
    <nav className="flex-between w-full py-3 px-3 bg-gray-800 border-b-2 border-green-600 shadow-md fixed">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src='/images/gigachad.jpg'
          alt="Prmptopia Logo"
          width={55}
          height={55}
          className="object-contain rounded-full"
        />
        <p className="logo_text">BVOYS</p>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden relative">
        {isLoggedin ? (
          <div className="flex">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => setToggleDropDown((prev) => !prev)}
            >
              <Image
                src='/images/gigachad.jpg'
                width={45}
                height={40}
                className="rounded-full mr-2"
                alt="profile-img"

              />
              <span>
                <p className="font-semibold text-white">{firstName}, {lastName}</p>
                <p className="text-white text-xs">{username}</p>
              </span>
            </div>

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(flase)}
                >
                  My Profile
                </Link>
                <Link
                  href='/my-habits'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(flase)}
                >
                  My Habits
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )
            }
          </div>
        ) : (
          <>
            <Link
              type="button"
              href='/login'
              className="green_btn"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {isLoggedin ? (
          <div className="flex">
            <Image
              src='/images/gigachad.jpg'
              width={37}
              height={37}
              className="rounded-full"
              alt="profile-img"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(flase)}
                >
                  My Profile
                </Link>
                <Link
                  href='/my-habits'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(flase)}
                >
                  My Habits
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )
            }
          </div>

        ) : (
          <>
            <Link
              type="button"
              href='/login'
              className="green_btn"
            >
              Sign In
            </Link>
          </>
        )
        }
      </div>
    </nav>
  )
}

export default Nav