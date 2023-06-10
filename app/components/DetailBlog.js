import Head from 'next/head';
import { getBlogs } from './utils/getBlog';
import TransitionEffect from './TransitionEffect';
import Layout from './Layout';
import AnimatedText from './AnimatedText';
import AnchorComponent from './Anchor';
import { FeaturedArticle } from '../blogs/page';
import article1 from '../../public/images/article1.jpg';
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

export default async function DetailBlog(numbers) {
  const { blogData, tags } = fetchBlogs();

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
    // <section className={styles.blog}>
    //   <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
    //     {blog ? (
    //       blog.map(function (item) {
    //         const imageCover = ImageCover.find((image) => image.id === item.id);
    //         const createdDay: Date = new Date(item.createdAt);
    //         const options: Intl.DateTimeFormatOptions = {
    //           year: 'numeric',
    //           month: 'short',
    //           day: 'numeric',
    //         };
    //         return (
    //           <div className={styles.boxItems} key={item.id}>
    //             <Link
    //               href={item.url}
    //               target="_blank"
    //               rel="noreferrer"
    //               className="link"
    //             >
    //               <div className="img">
    //                 <img src={imageCover?.cover || ''} alt="" />
    //               </div>
    //             </Link>
    //             <div className="bg-slate-100 rounded-lg">
    //               <div className="flex flex-row gap-1">
    //                 <AiOutlineTags className={styles.icon} />
    //                 {item.tags.map(function (tag, index) {
    //                   return (
    //                     <div key={index} className={styles.tag}>
    //                       <Link className="ml-[2px]" href="/">
    //                         #{tag}
    //                       </Link>
    //                     </div>
    //                   );
    //                 })}
    //               </div>

    //               <h3 className="text-2xl">{item.title}</h3>

    //               <p>{item.bodyText.slice(0, 180)}...</p>
    //               <div className={styles.date}>
    //                 <AiOutlineClockCircle className={styles.icon} />{' '}
    //                 <label htmlFor="">
    //                   {createdDay.toLocaleDateString('en-US', options)}
    //                 </label>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })
    //     ) : (
    //       <div className="box boxItems">
    //         <h1>Không có bài viết nào</h1>
    //       </div>
    //     )}
    //   </div>
    // </section>
  );
}
