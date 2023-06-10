'use client';

import AnimatedText from '../components/AnimatedText';
import Layout from '../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import article1 from '../../public/images/article1.jpg';
import { motion } from 'framer-motion';
const FramerImage = motion(Image);

const FeaturedArticle = function ({ img, title, time, summary, link }) {
  return (
    <li
      className=" relative col-span-1 w-full p-4 bg-light 
    border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light "
    >
      <div
        className="absolute top-0 -right-3 -z-10 
              w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl"
      ></div>
      <Link
        href={link}
        target={'_blank'}
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          priority
          sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          src={img}
          alt={title}
          className="w-full h-auto"
        ></FramerImage>
      </Link>

      <Link href={link} target={'_blank'}>
        <h2 className="capitalize text-2xl font-bold my-2 hover:underline  ">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

export default function Blogs() {
  return (
    <>
      <Head>
        <title>MinhThuong | ArticlePage</title>
        <meta name="description" content="any description"></meta>
      </Head>
      <main
        className="w-full mb-16 flex flex-col
       items-center justify-center overflow-hidden dark:text-light"
      >
        <Layout className="pt-16">
          <AnimatedText text="Words can change the world" className="mb-16" />
          <ul className="grid grid-cols-2 gap-16 ">
            <FeaturedArticle
              img={article1}
              title="Minh thuiong viet blog"
              summary="dang viet cai nay de test thoi nhe hahaha"
              time="9 phut doc"
              link="/"
            />
            <FeaturedArticle
              img={article1}
              title="Minh thuiong viet blog"
              summary="dang viet cai nay de test thoi nhe hahaha"
              time="9 phut doc"
              link="/"
            />
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32 ">
            All Articles
          </h2>
        </Layout>
      </main>
    </>
  );
}
