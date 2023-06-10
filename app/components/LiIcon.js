'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const LiIcon = function ({ reference }) {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['center end', 'center center'],
  });
  return (
    <figure className="stroke-dark absolute left-0 dark:stroke-light ">
      <svg className="-rotate-90 " width="75" height="75" viewBox="0 0 100 100">
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-primary  stroke-1 fill-none dark:stroke-primaryDark"
        ></circle>
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="fill-light stroke-[5px] dark:fill-dark"
          style={{ pathLength: scrollYProgress }}
        ></motion.circle>
        <circle
          cx="75"
          cy="50"
          r="10"
          className="animate-pulse stroke-1 fill-primary dark:fill-primaryDark"
        ></circle>
      </svg>
    </figure>
  );
};

export default LiIcon;
