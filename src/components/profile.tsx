import { animate, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { LayoutAnimState } from "@/slice/LayoutSlice";

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

export const Profile = () => {
  const dispatch = useAppDispatch();
  const profileImgRef = createRef<HTMLDivElement>();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);

  useEffect(() => {
    if (
      !profileImgRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.PROFILE_MOUNTED
    ) {
      return;
    }

    animate(profileImgRef.current, { scale: [1, 0.7] }, { type: "spring" });
  }, [dispatch, layoutState.layoutAnimState, profileImgRef]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        ref={profileImgRef}
        className={`${
          layoutState.layoutAnimState == LayoutAnimState.COMPLETED
            ? "scale-[.7]"
            : ""
        }`}
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
      </div>
      <h1 className="text-2xl md:text-3xl h-9">
        <Title />
      </h1>
    </div>
  );
};
