import { getBlogDetail } from '../components/utils/getBlog';
import BlogHeader from '../components/BlogHeader';
import parse from 'html-react-parser';
import detail from './id.module.css';
const BlogPost = function ({ blogData }) {
  const { author, bodyHTML, createdAt, title } = blogData;
  return (
    <section className="layout">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold">{title}</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className={`${detail.html} flex flex-col`}>{parse(bodyHTML)}</div>
      </div>
    </section>
  );
};

export default BlogPost;

export const getServerSideProps = async (context) => {
  const route = context.query.id;
  const id = Number(route);
  let blogDetail = await getBlogDetail(id);
  return {
    props: {
      blogData: blogDetail,
    },
  };
};
