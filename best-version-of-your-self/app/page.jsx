'use client'
import { useRef } from 'react';
import Link from "next/link"
import Login from "@/components/Login";
import CommunityList from "@/components/CommunityList";
import Background from "@/components/Background";
import { MantineProvider, Image, Affix, Transition, Button } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useWindowScroll, useMediaQuery } from '@mantine/hooks';
import '@mantine/carousel/styles.css';


const Home = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <MantineProvider>
      <Background>
        <div className="flex w-full h-[81px] bg-gray-900 pl-5 py-3 border-b-2 border-green-500">
          <Link href="/" className="flex gap-2 flex-center ">
            <Image
              src='/images/Logo.ico'
              alt="Prmptopia Logo"
              className="object-contain rounded-full h-[55px] w-[55px]"
            />
            <p className="logo_text">Better</p>
          </Link>
        </div>
        <div className="w-full">
          <Carousel
            withIndicators
            loop
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <Carousel.Slide>
              <div className='relative bg-banner-2 bg-cover bg-center h-[600px]'>
                <div className='absolute inset-0 bg-black opacity-30' />
                <p className='relative px-10 pt-20 md:leading-tight 
                              text-6xl text-white font-semibold font-inter 
                              sm:max-w-md md:max-w-lg'
                >
                  Ready to be the best version of yourself
                </p>
              </div>

            </Carousel.Slide>
            <Carousel.Slide>
              <div className='relative bg-banner-3 bg-cover bg-center h-[600px]'>
                <div className='absolute inset-0 bg-black opacity-30' />
                <p className='relative px-10 pt-20 text-6xl
                               text-white font-semibold font-inter 
                               sm:max-w-md md:max-w-lg'
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
                              sm:max-w-md md:max-w-lg'
                >
                  Create Habites & commit to be better than you were already
                </p>
              </div>
            </Carousel.Slide>
          </Carousel>
        </div>
        <div className='bg-gradient-radial from-[#3A6073] to-[#16222A] 
                        mt-5 mx-2 md:mx-8 rounded-xl shadow-lg'
        >
          <p className='text-5xl text-white font-semibold pt-7 pl-5 mb-8'>
            Top Communities
          </p>
          <hr className='mb-5 border-2 border-green-600' />
          <div className='flex-center px-2'>
            <CommunityList />
          </div>
        </div>
        <div className='block md:flex justify-center items-center 
                         bg-gradient-to-tr from-cyan-600 
                        to-green-800 mt-5 mx-2 md:mx-8 p-5 
                        rounded-xl shadow-lg mb-20'
        >
          <div className='w-full md:w-1/2 mb-4 flex-center'>
            <p className='text-3xl md:text-5xl md:w-2/3 font-semibold text-white text-center md:text-left'>
              Ready to join our community? Log in now.
            </p>
          </div>
          <div className='w-full md:w-1/2 flex-center'>
            <Login />
          </div>
        </div>

        <div className="flex justify-between w-full bg-green-800 py-2 px-4 fixed bottom-6 bg-opacity-90 rounded-t-xl">
          <p className="text-white sm:text-base text-sm font-semibold flex-center">
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

        <Affix position={isMediumScreen ? { bottom: 85, right: 8 } : { bottom: 90, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftSection={<ArrowUpIcon className='h-5 w-6' />}
                radius='xl'
                variant="gradient"
                gradient={{ from: 'green', to: 'cyan', deg: 190 }}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </Background>
    </MantineProvider >
  )
}

export default Home