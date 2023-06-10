'use client';

import Link from 'next/link';
import Layout from './Layout';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg">
      <Layout className="py-8 flex items-center justify-between dark:text-light dark:border-light">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Built with{' '}
          <span className="text-primary dark:text-primaryDark text-2xl px-1">
            &#9825;
          </span>{' '}
          by MinhThuong
          <Link href="MinhThuong"></Link>
        </div>
        <Link
          className="underline underline-offset-2"
          href="https://facebook.com/minhno.minhno.7"
          target={'_blank'}
        >
          Say Hello
        </Link>
      </Layout>
    </footer>
  );
}
