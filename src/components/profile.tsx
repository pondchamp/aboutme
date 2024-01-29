import { animate } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { useViewport } from "@/hooks/useViewport";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const profileRefFinal = {
  height: "160px",
  width: "120px",
};

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

export const Profile = () => {
  const { width, height } = useViewport();
  const dispatch = useAppDispatch();
  const [_, setPageViewed] = usePageViewed();
  const profileRef = createRef<HTMLDivElement>();
  const profileImgRef = createRef<HTMLDivElement>();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);
  const finalScale = 0.7;

  // Post profile mount
  useEffect(() => {
    if (
      !profileImgRef.current ||
      !profileRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.PROFILE_MOUNTED
    ) {
      return;
    }

    animate(
      profileImgRef.current,
      { scale: [1, finalScale] },
      { type: "keyframes" }
    );
    animate(
      profileRef.current,
      {
        height: [`${height}px`, profileRefFinal.height],
        width: [`${width}px`, profileRefFinal.width],
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
    height,
    layoutState.layoutAnimState,
    profileImgRef,
    profileRef,
    setPageViewed,
    width,
  ]);

  const profileIconSizeLg = 120;
  const profileIconSizeSm = 70;
  const shrinkIconScrollTop = 200;
  const shrinkIconScrollTopBuffer = 120;
  const { initWidth, initHeight } =
    layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ||
    layoutState.layoutAnimState == LayoutAnimState.PROFILE_MOUNTED
      ? { initHeight: "100%", initWidth: "100%" }
      : {
          initHeight: profileRefFinal.height,
          initWidth: profileRefFinal.width,
        };

  return (
    <div
      className={`absolute top-0 left-0 flex items-center justify-center ${
        layoutState.layoutAnimState == LayoutAnimState.NOT_MOUNTED
          ? "hidden"
          : ""
      }`}
      style={{
        height: initHeight,
        width: initWidth,
      }}
      ref={profileRef}
    >
      <div
        ref={profileImgRef}
        className="z-10 flex flex-col gap-4 items-center justify-center"
        style={
          layoutState.layoutAnimState == LayoutAnimState.COMPLETED
            ? { scale: finalScale }
            : {}
        }
      >
        <div
          style={{
            height: profileIconSizeLg,
            width: profileIconSizeLg,
            zIndex: 20,
          }}
        >
          <Image
            src="img/me.jpg"
            alt="profile"
            width={
              layoutState.contentScrollTop <
              shrinkIconScrollTop - shrinkIconScrollTopBuffer
                ? profileIconSizeLg
                : Math.max(
                    profileIconSizeSm,
                    profileIconSizeLg -
                      (layoutState.contentScrollTop -
                        (shrinkIconScrollTop - shrinkIconScrollTopBuffer))
                  )
            }
            height={profileIconSizeLg}
            priority
            style={{
              borderRadius: 48,
            }}
          />
        </div>
        <div className="w-full h-10 text-center flex items-center">
          <h1
            className="text-3xl pb-24"
            style={{
              opacity: Math.max(
                0,
                1 - (layoutState.contentScrollTop / shrinkIconScrollTop) * 3
              ),
              paddingBottom: Math.min(150, layoutState.contentScrollTop * 1.5),
            }}
          >
            <Title />
          </h1>
        </div>
      </div>
    </div>
  );
};
