'use client';
import AnimatedText from '../components/AnimatedText';
import Layout from '../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/images/aboutavatar.jpg';
import { useEffect, useRef } from 'react';
import {
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import { usePathname } from 'next/navigation';
import TransitionEffect from '../components/TransitionEffect';

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref);

  useEffect(
    function () {
      if (isInView) {
        motionValue.set(value);
      }
    },
    [isInView, value, motionValue]
  );

  useEffect(
    function () {
      springValue.on('change', function (latest) {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      });
    },
    [springValue, value]
  );

  return <span ref={ref}></span>;
};

export default function About() {
  const path = usePathname();
  return (
    <>
      <Head>
        <title>MinhThuong | AboutPage</title>
        <meta name="description" content="any description"></meta>
      </Head>

      <TransitionEffect />
      <main
        className="flex w-full flex-col items-center justify-center
      dark:text-light
      "
      >
        <Layout className="pt-16">
          <AnimatedText
            className="mb-16
          lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 
          
          "
            text="Passion is the best!"
          />
          <div
            className="grid w-full grid-cols-8 gap-16 
          sm:gap-8 "
          >
            <div
              className="col-span-3 flex flex-col items-start justify-start
             xl:col-span-4 md:order-2 md:col-span-8"
            >
              <h2
                className="mb-4 text-lg font-bold uppercase 
              text-dark/75 dark:text-light/75"
              >
                Biography
              </h2>
              <p className="font-medium">
                {`Hi, I'm Nguyen Minh Thuong, a full-stack web developer with a
                passion for creating beautiful, functional,With a strong 
                foundation in both front-end and back-end technologies,
                 I am committed to delivering exceptional 
                user experiences and driving digital transformation through code.`}
              </p>
              <p className="my-4 font-medium">
                {` I has honed my skills in various web development frameworks
                 and languages, including but not limited to HTML, CSS, JavaScript, React.js, Node.js, Express.js,
                  and SQL/NoSQL databases. With a comprehensive understanding of the entire web development 
                  stack, I am able to 
                build scalable and efficient solutions with both position front-end and back-end.`}
              </p>
            </div>
            <div
              className="col-span-3 flex flex-col items-start justify-start
               relative h-max rounded-2xl 
            border-2
            border-solid border-dark bg-light p-8
             dark:bg-dark dark:border-light
            xl:col-span-4 md:order-1 md:col-span-8
            "
            >
              <div
                className="absolute top-0 -right-3 -z-10 
              w-[102%] h-[103%] rounded-[2rem] bg-light"
              ></div>
              <Image
                src={profilePic}
                alt="minhthuong"
                priority
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div
              className="col-span-2 flex flex-col items-end justify-between
            xl:col-span-8 xl:flex-row xl:items-center md:order-3
            "
            >
              <div className="flex flex-col items-end justify-center xl:items-center ">
                <span
                  className="inline-block text-7xl font-bold 
                md:text-6xl sm:text-5xl xs:text-4xl"
                >
                  <AnimatedNumbers value={15} />
                </span>
                <h2
                  className="text-xl font-medium capitalize
                dark:text-light/75
                text-dark/75   
                xl:text-center md:text-lg sm:text-base
                  xs:text-sm
                "
                >
                  Projects
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span
                  className="inline-block text-7xl font-bold 
                md:text-6xl sm:text-5xl xs:text-4xl "
                >
                  <AnimatedNumbers value={50} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75  
                   dark:text-light/75
                   xl:text-center md:text-lg sm:text-base
                   xs:text-sm
                   "
                >
                  Clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span
                  className="inline-block text-7xl font-bold
                md:text-6xl sm:text-5xl xs:text-4xl

                "
                >
                  <AnimatedNumbers value={1} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 
                    dark:text-light/75
                    xl:text-center md:text-lg sm:text-base
                    xs:text-sm
                    "
                >
                  Year experience
                </h2>
              </div>
            </div>
          </div>
          <Skills></Skills>
          <Experience></Experience>
          <Education />
        </Layout>
      </main>
    </>
  );
}
