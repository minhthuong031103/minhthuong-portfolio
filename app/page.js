'use client';

import Layout from './components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilepic from '../public/images/avatar.jpg';
import AnimatedText from './components/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from './components/Icons';
import TransitionEffect from './components/TransitionEffect';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Thuong's Portfolio`}</title>
        <meta name="qq" content="cc"></meta>
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light ">
        <Layout className="pt-0 md:p-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 inline-block cursor-pointer overflow-hidden rounded-xl md:w-full">
              <Image
                src={profilepic}
                alt="avatar"
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              />
            </div>

            <div
              className="w-1/2 ml-[15%] lg:ml-[0px] flex flex-col items-center self-center 
            lg:w-full lg:text-center"
            >
              <AnimatedText
                text="Tui là Minh Thường đây nè"
                className="!text-6xl !text-left 
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl
                "
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js and
                web development.
              </p>

              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="/minhthuong.pdf"
                  target={'_blank'}
                  className="flex items-center bg-dark text-light p-2.5 px-6
                rounded-lg text-lg font-semibold 
                hover:bg-light hover:text-dark dark:bg-light dark:text-dark
                border border-solid border-transparent 
                hover:border-dark hover:dark:bg-dark hover:dark:text-light
                hover:dark:border-light md:p-2 md:px-4 md:text-base
                "
                  download={true}
                >
                  Resume <LinkArrow className={'w-6 ml-1'} />
                </Link>
                <Link
                  href="mailto:abcd@gmail.com"
                  className="ml-4 text-lg font-medium capitalize
                   dark:text-light text-dark underline
                   md:text-base
                   "
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
