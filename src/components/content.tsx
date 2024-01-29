import { animate } from "framer-motion";
import { createRef, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  LayoutAnimState,
  SetContentScrollTop,
  SetLayoutAnimState,
} from "@/slice/LayoutSlice";

export const Content = () => {
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
    <div className="absolute inset-0" ref={contentRef}>
      <Scrollbars
        onScrollFrame={({ scrollTop }) =>
          dispatch(SetContentScrollTop(scrollTop))
        }
      >
        <div className="w-full h-[1000px] flex items-center justify-center">
          <span className="text-2xl font-bold">🚧 Under Construction 🚧</span>
        </div>
      </Scrollbars>
    </div>
  ) : (
    <></>
  );
};
