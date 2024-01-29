import { animate } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { LayoutWidths, useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { LayoutAnimState } from "@/slice/LayoutSlice";

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

export const Profile = () => {
  const { widthFlags } = useResponsiveLayout();
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
    <div
      ref={profileImgRef}
      className={`z-10 flex flex-col gap-4 items-center justify-center ${
        layoutState.layoutAnimState == LayoutAnimState.COMPLETED
          ? "scale-[.7]"
          : ""
      }`}
    >
      <Image
        className={
          !!widthFlags[LayoutWidths.md] ? "rounded-[48pt]" : "rounded-[40pt]"
        }
        src="img/me.jpg"
        alt="profile"
        width={!!widthFlags[LayoutWidths.md] ? 150 : 120}
        height={!!widthFlags[LayoutWidths.md] ? 150 : 120}
        priority
      />
      <h1 className="text-2xl md:text-3xl h-9">
        <Title />
      </h1>
    </div>
  );
};
