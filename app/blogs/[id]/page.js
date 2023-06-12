import { getBlogDetail } from '../../components/utils/getBlog';
import BlogHeader from '../../components/BlogHeader';
import parse from 'html-react-parser';
import detail from './id.module.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Layout from '@/app/components/Layout';
import Head from 'next/head';
import base_img from '../../../public/project_images/base.jpg';
async function getDetailPost(id) {
  let blogDetail = await getBlogDetail(id);
  return {
    blogData: blogDetail,
  };
}
const GeneralHead = ({ description, ogUrl, ogImage, ogTitle }) => {
  return (
    <>
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Minh Thuong" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
    </>
  );
};
const BlogPost = async function ({ params }) {
  const blogDetail = (await getDetailPost(params.id)).blogData;

  const { author, bodyHTML, createdAt, title } = blogDetail;
  // console.log(hljs.highlightAuto(bodyHTML));
  return (
    <>
      <Head>
        {/* default deets */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Hello đây là Blog của Minh Thường" />
        <meta charSet="utf-8" />
        {/* OG Sharing Deets */}
        <GeneralHead
          description="Hello đây là Blog của Minh Thường"
          ogUrl="minhthuong-portfolio.com"
          ogImage={base_img}
          ogTitle={title}
        />
        {/* Twitter Sharing Deets */}
        {/* <TwitterHead
    description={content.acf.excerpt}
    ogUrl={currentURL}
    ogImage={content.acf.Featured_Image}
    ogTitle={content.title.rendered}
  /> */}
        {/* regular title */}
        <title>{title}</title>
      </Head>
      <section className="layout dark:text-[#AC4425]">
        <div className="max-w-[100%] lg:px-6 px-60">
          <p className="text-center my-10 text-5xl xs:text-2xl font-bold mt-10  ">
            {title}
          </p>
          <div className="flex justify-center mb-4">
            <BlogHeader createdAt={createdAt} author={author} />
          </div>

          <div className={`${detail.html} flex overflow-auto flex-col`}>
            {parse(bodyHTML)}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
