'use client';
import parse from 'html-react-parser';
import BlogHeader from './BlogHeader';
import Layout from './Layout';
import AnchorComponent from './Anchor';
import detail from '../../app/blogs/[id]/id.module.css';
import { useEffect, useState } from 'react';
export default async function DetailBlog({ blogDetail }) {
  const [numbers, setNumbers] = useState(0);
  useEffect(() => {
    let num = (window.innerHeight - 70) / 30;
    setNumbers(parseInt(num));
  }, []);

  return (
    <>
      <main>
        <Layout>
          <section className="layout dark:text-[#AC4425]">
            <h1 className="text-center my-10 text-[2rem] font-bold">
              {blogDetail.title}
            </h1>

            <div className="flex justify-center mb-4">
              <BlogHeader
                createdAt={blogDetail.createdAt}
                author={blogDetail.author}
              />
            </div>

            <div className={`${detail.html}  flex flex-col`}>
              {parse(blogDetail.bodyHTML)}
            </div>
          </section>
        </Layout>
      </main>
    </>
  );
}
