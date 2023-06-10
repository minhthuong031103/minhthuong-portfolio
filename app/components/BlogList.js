'use client';
import Pagination from '@mui/material/Pagination';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TransitionEffect from './TransitionEffect';
import Layout from './Layout';
import AnimatedText from './AnimatedText';
import AnchorComponent from './Anchor';
import Link from 'next/link';
import article1 from '../../public/project_images/musicplayer.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';

const FramerImage = motion(Image);

export const FeaturedArticle = function ({
  img,
  tags,
  title,
  time,
  summary,
  link,
  author,
}) {
  return (
    <li
      className=" relative col-span-1 w-full p-4 bg-light 
      border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light

      "
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
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          src={img}
          alt={title}
          className="w-full h-auto"
        ></FramerImage>
      </Link>
      <Link href={link} target={'_blank'}>
        <h2
          className="capitalize text-2xl font-bold my-2 hover:underline 
          xs:text-lg 
          "
        >
          {title}
        </h2>
      </Link>
      <div className="flex flex-row flex-wrap gap-4">
        {tags?.map(function (tag, index) {
          return (
            <div className="flex items-center mb-[20px]" key={index}>
              <AiOutlineTags className="mr-[10px] font-medium" />
              <Link href="/">#{tag}</Link>
            </div>
          );
        })}
      </div>

      <p className="text-sm mb-2 overflow-hidden">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
      <div className="flex">
        <div>
          <Image
            fill
            className="rounded-[50%] max-w-[50px] max-h-[50px] mb-4 mr-4"
            src={author.avatar}
            alt="author pfp"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-[1rem]"> {author.name} </p>
          <div className="flex flex-wrap">
            <Link
              target={'_blank'}
              href={author.url}
              className="underline list-none font-normal text-[0.85rem] md:mr-4 sm:mr-0"
            >
              {author.url}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
export default function BlogList({ blogData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numbers, setNumbers] = useState(0);
  useEffect(() => {
    let num = (window.innerHeight - 70) / 30;
    setNumbers(parseInt(num));
  }, []);
  const [blogsPerPage] = useState(4);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (event, value) => {
    setCurrentPage(value);
  };
  // this is for PAGINATION
  return (
    <>
      <Head>
        <title>MinhThuong | ArticlePage</title>
        <meta name="description" content="any description"></meta>
      </Head>
      <TransitionEffect />

      <main
        className="w-full mb-16 flex flex-col
         items-center justify-center overflow-hidden dark:text-light"
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Words can change the world"
            className="mb-16
               lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl 
            "
          />
          <AnchorComponent number={numbers} />
          <ul className="grid grid-cols-2 gap-16 md:grid-cols-1 lg:gap-8 md:gap-y-16">
            {currentBlogs ? (
              currentBlogs.map((blog) => {
                const createdDay = new Date(blog.createdAt);
                const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                };
                return (
                  <FeaturedArticle
                    key={blog.id}
                    img={article1}
                    title={blog.title}
                    summary={blog.bodyText.slice(0, 300) + '...'}
                    time={createdDay.toLocaleDateString('en-US', options)}
                    link="/"
                    tags={blog.tags}
                    author={blog.author}
                  />
                );
              })
            ) : (
              <div>ko co j</div>
            )}
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32 ">
            All Articles
          </h2>
          {blogData.length > 3 && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(blogData.length / blogsPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          )}
        </Layout>
      </main>
    </>
  );
}
