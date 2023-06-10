import { motion } from 'framer-motion';

const Skill = function ({ name, x, y }) {
  return (
    <motion.div
      className="flex items-center justify-center absolute
    rounded-full 
    font-semibold 
    bg-dark text-light
    py-3 px-6 shadow-dark cursor-pointer  dark:text-dark dark:bg-light
    lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent
    xs:text-dark xs:dark:text-light xs:font-bold 
    
    "
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
    >
      {name}
    </motion.div>
  );
};

const Skills = function () {
  return (
    <>
      <h2
        className="font-bold text-8xl mt-64 w-full text-center
      md:text-6xl md:mt-32
      "
      >
        Skills
      </h2>
      <div
        className="bg-circularLight dark:bg-circularDark 
        w-full h-screen relative flex items-center justify-center 
        rounded-full 
        lg:bg-circularLightLg lg:dark:bg-circularDarkLg
        md:bg-circularLightMd md:dark:bg-circularDarkMd
        sm:bg-circularLightSm sm:dark:bg-circularDarkSm
        lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
        "
      >
        <motion.div
          className="flex items-center justify-center 
    rounded-full 
    font-semibold 
    bg-dark text-light
    p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light
    lg:p-6 md:p-4 xs:text-xs xs:p-2
    
    "
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>
        <Skill name="HTML" x="-20vw" y="2vw" />
        <Skill name="CSS" x="-5vw" y="-11vw" />
        <Skill name="Nextjs" x="27vw" y="-10vw" />
        <Skill name="JavaScript" x="0vw" y="11vw" />
        <Skill name="TypeScript" x="18vw" y="-3vw" />
        <Skill name="Nodejs" x="-29vw" y="-7vw" />
        <Skill name="Nestjs" x="12vw" y="-18vw" />
        <Skill name="ExpressJs" x="17vw" y="16vw" />
        <Skill name="Graphql" x="-14vw" y="-17vw" />
        <Skill name="MongoDB" x="-18vw" y="16vw" />
        <Skill name="Postgresql" x="30vw" y="5vw" />
      </div>
    </>
  );
};

export default Skills;
