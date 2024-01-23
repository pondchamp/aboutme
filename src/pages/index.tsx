import { motion } from "framer-motion";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center bg-gradient-to-b from-brown1 to-brown2 text-beige">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "easeInOut", type: "spring" }}
      >
        <div className="block md:hidden">
          <Image
            className="rounded-[40pt]"
            src="img/me.jpg"
            alt="profile"
            width={120}
            height={120}
            priority
          />
        </div>
        <div className="hidden md:block">
          <Image
            className="rounded-[48pt]"
            src="img/me.jpg"
            alt="profile"
            width={150}
            height={150}
            priority
          />
        </div>
      </motion.div>
      <h1 className="text-2xl md:text-3xl h-9">
        <Title />
      </h1>
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
