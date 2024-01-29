import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

import { Content } from "@/components/content";
import { Profile } from "@/components/profile";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);
  const [pageViewed] = usePageViewed();

  // Initialise animation mount
  useEffect(() => {
    if (layoutState.layoutAnimState != LayoutAnimState.NOT_MOUNTED) {
      return;
    }

    if (pageViewed) {
      dispatch(SetLayoutAnimState(LayoutAnimState.COMPLETED));
      return;
    }

    dispatch(SetLayoutAnimState(LayoutAnimState.MOUNT_STARTED));
  }, [dispatch, layoutState.layoutAnimState, pageViewed]);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-brown1 to-brown2 text-beige">
      <Profile />
      <Content />
      <div className="absolute top-3 right-3 font-semibold flex flex-col gap-1 text-right">
        <Link href="https://www.linkedin.com/in/julianblair">LinkedIn</Link>
        <Link href="https://github.com/pondchamp/aboutme">GitHub</Link>
      </div>
    </div>
  );
};

export default Home;
