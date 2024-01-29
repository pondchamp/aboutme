import { animate } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import { createRef, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

import { Profile } from "@/components/profile";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const profileRefFinal = {
  bottom: "82%",
  right: "80%",
};

const Home: NextPage = () => {
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
        className={`absolute top-0 left-0 min-w-[150px] flex items-center justify-center ${
          layoutState.layoutAnimState == LayoutAnimState.NOT_MOUNTED
            ? "hidden"
            : layoutState.layoutAnimState == LayoutAnimState.COMPLETED
            ? `bottom-[${profileRefFinal.bottom}] right-[${profileRefFinal.right}]`
            : "bottom-0 right-0"
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
      <Link
        className="absolute top-2 right-2 font-semibold"
        href="https://www.linkedin.com/in/julianblair/"
      >
        LinkedIn
      </Link>
    </div>
  );
};

export default Home;
