import { animate } from "framer-motion";
import { createRef, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { ScrollPassthrough } from "@/layouts/ScrollPassthrough";
import {
  LayoutAnimState,
  SetContentScrollTop,
  SetLayoutAnimState,
} from "@/slice/LayoutSlice";

import { Content } from "./content";

export const ContentContainer = () => {
  const dispatch = useAppDispatch();
  const contentRef = createRef<HTMLDivElement>();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);

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
        type: "keyframes",
      }
    );
  }, [dispatch, layoutState.layoutAnimState, contentRef]);

  return layoutState.layoutAnimState == LayoutAnimState.COMPLETED ||
    layoutState.layoutAnimState == LayoutAnimState.CONTENT_MOUNT_READY ? (
    <div className="absolute inset-0">
      <div className="z-10 fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-brown1 from-10% to-transparent"></div>
      <Scrollbars
        onUpdate={({ scrollTop }) => dispatch(SetContentScrollTop(scrollTop))}
      >
        <ScrollPassthrough
          ref={contentRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-full max-w-[800px] flex justify-center px-4 pt-36 pb-20"
        >
          <Content />
        </ScrollPassthrough>
      </Scrollbars>
    </div>
  ) : (
    <></>
  );
};
