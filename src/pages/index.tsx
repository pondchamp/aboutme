import { animate } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import { createRef, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

import { Profile } from "@/components/profile";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { useViewport } from "@/hooks/useViewport";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const profileRefFinal = {
  bottom: "82%",
  maxWidth: "160px",
  minWidth: "160px",
  right: "80%",
};

const Home: NextPage = () => {
  const { width } = useViewport();
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);
  const [pageViewed, setPageViewed] = usePageViewed();
  const profileRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();

  // Initialise animation mount
  useEffect(() => {
    if (
      !profileRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.NOT_MOUNTED
    ) {
      return;
    }

    if (pageViewed) {
      dispatch(SetLayoutAnimState(LayoutAnimState.COMPLETED));
      return;
    }

    dispatch(SetLayoutAnimState(LayoutAnimState.MOUNT_STARTED));
  }, [dispatch, layoutState.layoutAnimState, pageViewed, profileRef]);

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

  // content mount
  useEffect(() => {
    if (
      !contentRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.CONTENT_MOUNT_READY
    ) {
      return;
    }

    animate(
      contentRef.current,
      { opacity: [0, 1] },
      {
        onComplete: () => {
          dispatch(SetLayoutAnimState(LayoutAnimState.COMPLETED));
        },
        type: "spring",
      }
    );
  }, [
    dispatch,
    layoutState.layoutAnimState,
    pageViewed,
    contentRef,
    setPageViewed,
  ]);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-brown1 to-brown2 text-beige">
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
        <Profile />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          layoutState.layoutAnimState != LayoutAnimState.COMPLETED
            ? "opacity-0"
            : ""
        }`}
        ref={contentRef}
      >
        <span className="text-2xl font-bold">🚧 Under Construction 🚧</span>
      </div>
      <div className="absolute top-3 right-3 font-semibold flex flex-col gap-1 text-right">
        <Link href="https://www.linkedin.com/in/julianblair">LinkedIn</Link>
        <Link href="https://github.com/pondchamp/aboutme">GitHub</Link>
      </div>
    </div>
  );
};

export default Home;
