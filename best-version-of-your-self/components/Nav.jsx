"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"



const Nav = () => {

  const isLoggedin = true;

  // const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders();

  //     setProviders(response);
  //   }

  //   setUpProviders();
  // }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
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
      <div className="sm:flex hidden">
        {isLoggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={() => { }} className="outline_btn">
              Sign Out
            </button>
            <Link href='profile'>
              <Image
                // src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile-img"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {isLoggedin ? (
          <div className="flex">
            <Image
              // src={session?.user.image}
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
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(flase)}
                >
                  Create Prompt
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
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )
        }
      </div>
    </nav>
  )
}

export default Nav