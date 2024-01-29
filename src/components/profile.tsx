import { animate } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { LayoutWidths, useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useViewport } from "@/hooks/useViewport";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const profileRefFinal = {
  bottom: "82%",
  maxWidth: "160px",
  minWidth: "160px",
  right: "80%",
};

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

export const Profile = () => {
  const { width } = useViewport();
  const { widthFlags } = useResponsiveLayout();
  const dispatch = useAppDispatch();
  const [pageViewed, setPageViewed] = usePageViewed();
  const profileRef = createRef<HTMLDivElement>();
  const profileImgRef = createRef<HTMLDivElement>();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);

  // Post profile mount
  useEffect(() => {
    if (
      !profileRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.PROFILE_MOUNTED
    ) {
      return;
    }

    animate(
      profileRef.current,
      {
        bottom: ["0%", profileRefFinal.bottom],
        maxWidth: [`${width}px`, profileRefFinal.maxWidth],
        minWidth: ["0px", profileRefFinal.minWidth],
        right: ["0%", profileRefFinal.right],
      },
      {
        onComplete: () => {
          setPageViewed();
          dispatch(SetLayoutAnimState(LayoutAnimState.CONTENT_MOUNT_READY));
        },
        type: "keyframes",
      }
    );
  }, [
    dispatch,
    layoutState.layoutAnimState,
    pageViewed,
    profileRef,
    setPageViewed,
    width,
  ]);

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
      className={`absolute top-0 left-0 flex items-center justify-center ${
        layoutState.layoutAnimState == LayoutAnimState.NOT_MOUNTED
          ? "hidden"
          : layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ||
            layoutState.layoutAnimState == LayoutAnimState.PROFILE_MOUNTED
          ? "bottom-0 right-0"
          : `min-w-[${profileRefFinal.minWidth}] max-w-[${profileRefFinal.maxWidth}] bottom-[${profileRefFinal.bottom}] right-[${profileRefFinal.right}]`
      }`}
      ref={profileRef}
    >
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
    </div>
  );
};
