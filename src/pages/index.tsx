import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center bg-gradient-to-b from-brown1 to-brown2 text-beige">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "easeInOut", type: "spring" }}
      >
        <Image
          className="rounded-[48pt]"
          src="img/me.jpg"
          alt="profile"
          width={150}
          height={150}
        />
      </motion.div>
      <h1 className="text-3xl">Julian J. Blair</h1>
      <div>
        <Link
          className="font-semibold"
          href="https://www.linkedin.com/in/julianblair/"
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
};

export default Home;
