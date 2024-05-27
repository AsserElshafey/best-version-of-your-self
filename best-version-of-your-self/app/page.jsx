'use client'
import { useRef } from 'react';
import Link from "next/link"
import Login from "@/components/Login";
import CommunityList from "@/components/CommunityList";
import Background from "@/components/Background";
import { MantineProvider, Image, ScrollArea } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import '@mantine/carousel/styles.css';


const Home = () => {

  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <MantineProvider>
      <Background>
        <div className="flex w-full bg-gray-900 pl-5 py-3 border-b-2 border-green-500 mb-2 fixed top-0 z-50">
          <Link href="/" className="flex gap-2 flex-center ">
            <Image
              src='/images/Logo.ico'
              alt="Prmptopia Logo"
              width={55}
              height={55}
              className="object-contain rounded-full"
            />
            <p className="logo_text">Better</p>
          </Link>
        </div>
        <div className="w-full mt-20">
          <Carousel
            loop
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <Carousel.Slide>
              <div className='relative bg-banner-2 bg-cover bg-center h-[600px]'>
                <div className='absolute inset-0 bg-black opacity-30' />
                <p className='relative px-10 pt-20 md:leading-tight 
                              text-7xl text-white font-semibold font-inter 
                              sm:max-w-sm md:max-w-md lg:max-w-lg'
                >
                  Ready to be the best version of yourself
                </p>
              </div>

            </Carousel.Slide>
            <Carousel.Slide>
              <div className='relative bg-banner-3 bg-cover bg-center h-[600px]'>
                <div className='absolute inset-0 bg-black opacity-30' />
                <p className='relative px-10 pt-20 text-6xl md:text-7xl
                               text-white font-semibold font-inter 
                               sm:max-w-sm md:max-w-md lg:max-w-lg'
                >
                  Join communities and participate with your friends
                </p>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div className='relative bg-banner-1 bg-cover bg-center h-[600px]'>
                <div className='absolute inset-0 bg-black opacity-30' />
                <p className='relative px-10 pt-20 md:leading-tight 
                              text-6xl text-white font-semibold font-inter
                               sm:max-w-sm md:max-w-md lg:max-w-lg'
                >
                  Create Habites & commit to be better than you were already
                </p>
              </div>
            </Carousel.Slide>
          </Carousel>
        </div>
        <div className=' bg-gradient-to-tr from-pink-600 
                        to-blue-800 mt-5 mx-2 md:mx-8 rounded-xl shadow-lg'>
          <p className='text-5xl text-white font-Pacifico font-semibold pt-7 pl-5 mb-8'>
            Top Communities
          </p>
          <hr className='mb-5 border-2 border-green-600' />
          <div className='flex-center px-2'>
            <CommunityList />
          </div>
        </div>
        <div className='block md:flex justify-center items-center gap-10 
                        md:gap-40 bg-gradient-to-tr from-cyan-600 
                        to-green-800 mt-5 mx-2 md:mx-8 p-5 
                        rounded-xl shadow-lg mb-20'
        >
          <div className='w-full md:max-w-md mb-4'>
            <p className='text-3xl md:text-5xl font-Pacifico font-semibold text-white text-center md:text-left'>
              Ready to join our community? Log in now.
            </p>
          </div>
          <div className='w-full md:w-auto flex-center'>
            <Login />
          </div>
        </div>

        <div className="flex justify-between w-full bg-green-800 py-2 px-4 fixed bottom-6 bg-opacity-90 rounded-t-xl">
          <p className="text-white tet font-semibold">
            Are you ready to sign in ?
          </p>
          <div className='flex gap-2'>
            <Link
              type="button"
              href='/login'
              className="green_btn"
            >
              Log In
            </Link>
            <Link
              type="button"
              href='/signup'
              className="outline_btn"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Background>
    </MantineProvider >
  )
}

export default Home