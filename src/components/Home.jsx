import React, { useRef } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";
import { motion, useInView } from "framer-motion";

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      name="home"
      className="w-full h-screen"
      initial={{ opacity: 0, x: -200 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 1.25,
        ease: [0.17, 0.55, 0.55, 1],
      }}
    >
      <div className="max-w-[1000px] mx-auto flex px-8 gap-8 h-full">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-gray-500">Hi, my name is</p>
          <h1 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
            Ashish Kumar Mishra
          </h1>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#8892b0]">
            I'm a Full Stack Developer
          </h2>
          <p className="text-[#8892b0] py-4 max-w-[700px]">
            I'm a Full stack Developer specializing in building (and
            occasionally designing) digital experiences. Currently, I'm focused
            on building responsive full stack web applications.
          </p>
          <div>
            <Link to="work" smooth={true} duration={500}>
              <button className="text-white group border-2 py-3 px-6 flex items-center my-2 hover:bg-white hover:border-white hover:text-black">
                View Work
                <span className="group-hover:rotate-90">
                  <HiArrowNarrowRight className="ml-2" />
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <div>
            <div className="absolute bg-white w-[22%] h-[10%] rotate-0 rounded-md shadow-[5px_5px_20px_rgb(204,214,246)]" />
            <div className="absolute bg-white w-[22%] h-[10%] rotate-45 rounded-md shadow-[5px_5px_20px_rgb(204,214,246)]" />
            <div className="absolute bg-white w-[22%] h-[10%] rotate-90 rounded-md shadow-[5px_5px_20px_rgb(204,214,246)]" />
            <div className="absolute bg-white w-[22%] h-[10%] -rotate-45 rounded-md shadow-[5px_5px_20px_rgb(204,214,246)]" />
          </div>
          <div className="flex justify-center items-center z-5">
            <p>my image for portfolio</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
