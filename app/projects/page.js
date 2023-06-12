'use client';

import AnimatedText from '../components/AnimatedText';
import { GithubIcon } from '../components/Icons';
import Layout from '../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import project1 from '../../public/project_images/musicplayer.png';
import project2 from '../../public/project_images/aiCare.png';
import project3 from '../../public/project_images/portfolio.png';
import project4 from '../../public/project_images/dialuxury.png';
import project5 from '../../public/project_images/store.png';
import { motion } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import AnchorComponent from '../components/Anchor';
import { useEffect, useState } from 'react';
const FramerImage = motion(Image);

const FeaturedProject = function ({ type, title, summary, img, link, github }) {
  return (
    <article
      className="relative flex w-full items-center
      justify-between rounded-3xl rounded-br-2xl border border-solid
       border-dark bg-light p-12 shadow-2xl 
     dark:border-light dark:bg-dark 
     lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4 
     "
    >
      <div
        className="absolute top-0 -right-3 -z-10 
              w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light
              xs:-right-2 sm:h-[102%] xs:w-[100%] xs:rounded-[1.5rem] 
              
              "
      ></div>
      <Link
        href={link}
        target={'_blank'}
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg 
        lg:w-full
        "
      >
        <FramerImage
          whileHover={{ scale: 1.05 }}
          src={img}
          alt={title}
          priority
          className="w-full h-auto "
        ></FramerImage>
      </Link>
      <div
        className="w-1/2 flex flex-col items-start justify-between pl-6
      lg:w-full lg:pl-0 lg:pt-6
      "
      >
        <span
          className="text-primary font-medium text-xl dark:text-primaryDark
        xs:text-base 
        "
        >
          {type}
        </span>
        <Link
          href={link}
          target={'_blank'}
          className="hover:underline underline-offset-2"
        >
          <h2
            className="my-2 w-full text-left text-4xl font-bold dark:text-light
          sm:text-sm
          "
          >
            {title}
          </h2>
        </Link>
        <p
          className="my-2 font-medium text-dark dark:text-light
        sm:text-sm
        
        "
        >
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target={'_blank'}
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 font-semibold
            dark:bg-light dark:text-dark 
            sm:px-4 sm:text-base
            "
          >
            Visit project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = function ({ title, type, img, link, github }) {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl 
    border border-solid border-dark bg-light p-6 relative 
    dark:bg-dark dark:border-light
    xs:p-4
    "
    >
      <div
        className="absolute top-0 -right-3 -z-10 
              w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl
              dark:bg-light
              md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]
              "
      ></div>
      <Link
        href={link}
        target={'_blank'}
        className="w-full cursor-pointer overflow-hidden rounded-lg "
      >
        <FramerImage
          priority
          sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw"
          whileHover={{ scale: 1.05 }}
          src={img}
          alt={title}
          className="w-full h-auto "
        ></FramerImage>
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4 ">
        <span
          className="text-primary font-medium text-xl dark:text-primaryDark
        lg:text-lg md:text-base  
        "
        >
          {type}
        </span>
        <Link
          href={link}
          target={'_blank'}
          className="hover:underline underline-offset-2"
        >
          <h2
            className="my-2 w-full text-left text-3xl font-bold
          lg:text-2xl
          "
          >
            {title}
          </h2>
        </Link>

        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target={'_blank'}
            className="text-lg font-semibold underline
            md:text-base
            "
          >
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  const [numbers, setNumbers] = useState(0);
  useEffect(() => {
    let num = (window.innerHeight - 70) / 30;
    setNumbers(parseInt(num));
  }, []);
  return (
    <>
      <TransitionEffect />

      <Head>
        <title>MinhThuong | ProjectPage</title>
        <meta name="description" content="any description"></meta>
      </Head>

      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="My showcase projects"
            className="mb-16
          lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl 
          "
          />
          <AnchorComponent number={numbers} />
          <div
            className="grid grid-cols-12 gap-24 gap-y-32
          xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0
          "
          >
            <div className="col-span-12">
              <FeaturedProject
                title="Music Player"
                summary="A beautiful Mucsic App using NextJS, Tailwind CSS, Context API, Supabase, PostgresQL. 
              It can add music from user, pay with Stripe and play music. "
                img={project1}
                link="https://thuongmusic.vercel.app/"
                type="Featured Project"
                github="https://github.com/minhthuong031103/MusicPlayer-nextjs"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="AI-Care, Emotibot"
                summary="Commerce project Third prize UIT Webdev Adventure using JavaScript, HTML, CSS, TailwindCSS, MERN Stack ( MongoDB, ExpressJS, Reactjs, Nodejs ), 
                OpenAI API, Rapid API, Cloudinary "
                img={project2}
                link="https://ai-care-uit.vercel.app/"
                type="Featured Project"
                github="https://github.com/minhthuong031103/AI-Care-frontend"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Portfolio Website"
                summary="An appealing portfolio website about my self using NextJS, TailwindCSS, Framer Motion, Github GraphQL "
                img={project3}
                link="https://minhthuong-portfolio.vercel.app/"
                type="Featured Project"
                github="https://github.com/minhthuong031103/minhthuong-portfolio"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Dialuxury"
                summary="A diamond store website use MERN Stack with Client and Admin Dashboard"
                img={project4}
                link="https://dialuxury.vercel.app/"
                type="Featured Project"
                github="https://github.com/minhthuong031103/web_trangsuc_se104/"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Convenience Store"
                summary="A desktop app use WPF C# framework adn SQL Server"
                img={project5}
                link="https://github.com/Ninhnon/ConvenienceStore"
                type="Featured Project"
                github="https://github.com/Ninhnon/ConvenienceStore"
              />
            </div>
            {/* <div className="col-span-6 sm:col-span-12"> //cot 1
              {' '}
              <Project
                title="AI-Care, Emotibot"
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. 
It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your 
local currency"
                img={project2}
                link="https://github.com"
                type="Self-Project"
                github="https://github.com"
              /> //cot 2
            </div> */}

            {/* <div className="col-span-6 sm:col-span-12"> </div> */}
          </div>
        </Layout>
      </main>
    </>
  );
}
