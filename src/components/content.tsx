import { animate } from "framer-motion";
import { createRef, useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

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
        type: "spring",
      }
    );
  }, [dispatch, layoutState.layoutAnimState, contentRef]);
  return (
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
  );
};
