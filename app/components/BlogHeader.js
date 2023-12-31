'use client';

import Image from 'next/image';

const BlogHeader = function ({ createdAt, author }) {
  const createdDay = new Date(createdAt);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return (
    <div className="flex flex-wrap items-center">
      <Image
        className="rounded-full mb-4 mr-4"
        width={50}
        height={50}
        alt="anh"
        src={author.avatar}
      />
      <div className="flex flex-col">
        <p className="font-semibold text-base sm:text-lg">{author.name}</p>
        <div className="flex flex-wrap gap-4">
          <li className="list-none font-normal text-xs sm:text-sm">
            {author.url}
          </li>
          <li className="font-normal ml-2 text-lg ">
            {createdDay.toLocaleDateString('en-US', options)}
          </li>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
