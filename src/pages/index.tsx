import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const ContentContainer = dynamic(() =>
  import("@/components/content_container").then(
    (module) => module.ContentContainer
  )
);

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
    <div className="fixed inset-0 bg-gradient-to-b from-brown1 to-brown2 text-beige select-none">
      <ContentContainer />
    </div>
  );
};

export default Home;
