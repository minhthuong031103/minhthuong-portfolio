'use client';

import Link from 'next/link';
import Logo from './Logo';
import { usePathname, useRouter } from 'next/navigation';
import {
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  MoonIcon,
  PinterestIcon,
  SunIcon,
  TwitterIcon,
} from './Icons';
import { motion } from 'framer-motion';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
const CustomMobileLink = ({ href, title, className = '', toggle, path }) => {
  const router = useRouter();

  const handleClick = function () {
    toggle();
    router.push(href);
  };

  return (
    <button
      href={href}
      onClick={handleClick}
      className={`${className} relative group text-light dark:text-dark my-2 
      
      `}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-light 
         absolute
        left-0 -bottom-0.5 group-hover:w-full 
        transition-[width] 
         ease duration-300 dark:bg-dark
         ${path === href ? 'w-full' : 'w-0'}
         `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const CustomLink = ({ href, title, className = '', path }) => {
  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark
         absolute
        left-0 -bottom-0.5 group-hover:w-full 
        transition-[width] 
         ease duration-300 dark:bg-light
         ${path === href ? 'w-full' : 'w-0'}
         `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Navbar = function () {
  const [text, count] = useTypewriter({
    words: [
      'Hi, My name is Minh Thuong',
      'A software guy',
      '< ILoveCoding />',
      'A full-stack developer',
      'Contact me for work',
    ],
    loop: true,
    delaySpeed: 1000,
  });
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = function () {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="w-full px-32 py-8 font-medium
    flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8
    "
    >
      <button
        onClick={handleClick}
        className="flex-col justify-center items-center hidden lg:flex"
      >
        <span
          className={`bg-dark dark:bg-light block transition-all
           duration-300 ease-out h-0.5 w-6 rounded-sm
          ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5  '}`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm
          transition-all
           duration-300 ease-out
        my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        ></span>
        <span
          className={`bg-dark dark:bg-light block h-0.5 w-6
          transition-all
           duration-300 ease-out
       rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}
        `}
        ></span>
      </button>
      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          <CustomLink
            path={pathname}
            href="/"
            title="Home"
            className="mr-4"
          ></CustomLink>
          <CustomLink
            path={pathname}
            href="/about"
            title="About"
            className="mx-4"
          ></CustomLink>
          <CustomLink
            path={pathname}
            href="/projects"
            title="Projects"
            className="mx-4"
          ></CustomLink>
          <CustomLink
            path={pathname}
            href="/blogs"
            title="Blogs"
            className="ml-4"
          ></CustomLink>
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href="https://twitter.com"
            target={'_blank'}
            whileHover={{
              y: -2,
            }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mr-3"
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target={'_blank'}
            whileHover={{
              y: -2,
            }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target={'_blank'}
            whileHover={{
              y: -2,
            }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <LinkedInIcon />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target={'_blank'}
            whileHover={{
              y: -2,
            }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3 bg-light rounded-full"
          >
            <PinterestIcon />
          </motion.a>
          <button
            className={`ml-3 flex items-center justify-center rounded-full p-1 
          
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'} `}
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            {mode === 'dark' ? (
              <SunIcon className={'fill-dark'} />
            ) : (
              <MoonIcon className={'fill-dark'} />
            )}
          </button>
        </nav>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between items-center fixed 
        top-1/2 left-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md
        py-32
      -translate-x-1/2 -translate-y-1/2"
        >
          <nav className="flex items-center flex-col justify-center ">
            <CustomMobileLink
              path={pathname}
              href="/"
              title="Home"
              className=""
              toggle={handleClick}
            ></CustomMobileLink>
            <CustomMobileLink
              path={pathname}
              href="/about"
              title="About"
              className=""
              toggle={handleClick}
            ></CustomMobileLink>
            <CustomMobileLink
              path={pathname}
              href="/projects"
              title="Projects"
              className=""
              toggle={handleClick}
            ></CustomMobileLink>
            <CustomMobileLink
              path={pathname}
              href="/blogs"
              title="Blogs"
              className=""
              toggle={handleClick}
            ></CustomMobileLink>
          </nav>

          <nav className="flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href="https://twitter.com"
              target={'_blank'}
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target={'_blank'}
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 bg-light dark:bg-dark rounded-full sm:mx-1"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target={'_blank'}
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target={'_blank'}
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 bg-light rounded-full sm:mx-1"
            >
              <PinterestIcon />
            </motion.a>
            <button
              className={`w-6 h-6 ease m-1 ml-3 sm:mx-1 flex items-center justify-center rounded-full p-1  
               
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'} `}
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'dark' ? (
                <SunIcon className={'fill-dark'} />
              ) : (
                <MoonIcon className={'fill-dark'} />
              )}
            </button>
          </nav>
        </motion.div>
      ) : null}

      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />

        <h2 className="mt-2 text-base md:text-sm sm:text-xs font-bold">
          {text}
        </h2>
      </div>
    </header>
  );
};

export default Navbar;
