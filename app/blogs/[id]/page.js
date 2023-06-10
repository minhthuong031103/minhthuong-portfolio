import { getBlogDetail } from '../../components/utils/getBlog';
import BlogHeader from '../../components/BlogHeader';
import parse from 'html-react-parser';
import detail from './id.module.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Layout from '@/app/components/Layout';

async function getDetailPost(id) {
  let blogDetail = await getBlogDetail(id);
  return {
    blogData: blogDetail,
  };
}

const BlogPost = async function ({ params }) {
  const blogDetail = (await getDetailPost(params.id)).blogData;

  const { author, bodyHTML, createdAt, title } = blogDetail;
  // console.log(hljs.highlightAuto(bodyHTML));
  return (
    <>
      <Layout className="dark:text-[#AC4425]">
        <p className="text-center my-10 text-5xl xs:text-2xl font-bold">
          {title}
        </p>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>

        <div className={`${detail.html}  flex flex-col`}>{parse(bodyHTML)}</div>
      </Layout>
    </>
  );
};

export default BlogPost;
