'use client';

import Layout from './components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilepic from '../public/images/avatar.jpg';
import AnimatedText from './components/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from './components/Icons';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Thuong's Portfolio`}</title>
        <meta name="qq" content="cc"></meta>
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light ">
        <Layout className="pt-10">
          <div className="flex items-center justify-between w-full">
            <div className="w-1/2 inline-block cursor-pointer overflow-hidden rounded-xl">
              <Image
                src={profilepic}
                alt="avatar"
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw"
              />
            </div>

            <div className="w-1/2 ml-[15%] flex flex-col items-center self-center">
              <AnimatedText
                text="Tui là Minh Thường đây nè"
                className="!text-6xl !text-left 
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl
                "
              />
              <p className="my-4 text-base font-medium">
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js and
                web development.
              </p>

              <div className="flex items-center self-start mt-2">
                <Link
                  href="/dummy.pdf"
                  target={'_blank'}
                  className="flex items-center bg-dark text-light p-2.5 px-6
                rounded-lg text-lg font-semibold 
                hover:bg-light hover:text-dark dark:bg-light dark:text-dark
                border border-solid border-transparent 
                hover:border-dark hover:dark:bg-dark hover:dark:text-light
                hover:dark:border-light
                "
                  download={true}
                >
                  Resume <LinkArrow className={'w-6 ml-1'} />
                </Link>
                <Link
                  href="mailto:abcd@gmail.com"
                  className="ml-4 text-lg font-medium capitalize dark:text-light text-dark underline "
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
