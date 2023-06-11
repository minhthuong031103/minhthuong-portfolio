import BlogList from '../components/BlogList';
import { getBlogs } from '../components/utils/getBlog';

async function fetchBlogs() {
  let blogs = await getBlogs();
  let tags = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  return {
    blogData: blogs,
    tags: tags,
  };
}

export default async function Blogs() {
  const { blogData, tags } = await fetchBlogs();

  return <BlogList tags={tags} blogData={blogData}></BlogList>;
}
