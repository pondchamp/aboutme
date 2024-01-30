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
  fontSize: "20px",
  gap: "8px",
  height: "160px",
  lineHeight: "32px",
  width: "120px",
};

const profileImgRefFinal = {
  height: 85,
  width: 85,
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

  const profileIconSizeSm = 50;
  const shrinkIconScrollTop = 100;
  const shrinkIconScrollTopBuffered = shrinkIconScrollTop - 70;
  const {
    initWidth,
    initHeight,
    initImgWidth,
    initImgHeight,
    initFontSize,
    initLineHeight,
    initFlexGap,
  } =
    layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ||
    layoutState.layoutAnimState == LayoutAnimState.PROFILE_MOUNTED
      ? {
          initFlexGap: "16px",
          initFontSize: "30px",
          initHeight: "100%",
          initImgHeight: 120,
          initImgWidth: 120,
          initLineHeight: "36px",
          initWidth: "100%",
        }
      : {
          initFlexGap: profileRefFinal.gap,
          initFontSize: profileRefFinal.fontSize,
          initHeight: profileRefFinal.height,
          initImgHeight: profileImgRefFinal.height,
          initImgWidth: profileImgRefFinal.width,
          initLineHeight: profileRefFinal.lineHeight,
          initWidth: profileRefFinal.width,
        };

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
      {
        height: [initImgHeight, profileImgRefFinal.height],
        width: [initImgWidth, profileImgRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      profileRef.current,
      {
        fontSize: [initFontSize, profileRefFinal.fontSize],
        gap: [initFlexGap, profileRefFinal.gap],
        height: [`${height}px`, profileRefFinal.height],
        lineHeight: [initLineHeight, profileRefFinal.lineHeight],
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
    initFlexGap,
    initFontSize,
    initImgHeight,
    initImgWidth,
    initLineHeight,
    layoutState.layoutAnimState,
    profileImgRef,
    profileRef,
    setPageViewed,
    width,
  ]);

  return layoutState.layoutAnimState != LayoutAnimState.NOT_MOUNTED ? (
    <div
      className="z-10 absolute top-0 left-0 flex flex-col items-center justify-center"
      style={{
        fontSize: initFontSize,
        gap: initFlexGap,
        height: initHeight,
        width: initWidth,
      }}
      ref={profileRef}
    >
      <div
        style={{
          height: initImgHeight,
          opacity:
            layoutState.contentScrollTop < shrinkIconScrollTopBuffered
              ? 1
              : Math.max(
                  0.6,
                  1 -
                    (layoutState.contentScrollTop -
                      shrinkIconScrollTopBuffered) /
                      100
                ),
          width: initImgWidth,
          zIndex: 20,
        }}
        ref={profileImgRef}
      >
        <Image
          src="img/me.jpg"
          alt="profile"
          width={
            layoutState.contentScrollTop < shrinkIconScrollTopBuffered
              ? initImgHeight
              : Math.max(
                  profileIconSizeSm,
                  initImgHeight -
                    (layoutState.contentScrollTop - shrinkIconScrollTopBuffered)
                )
          }
          height={initImgHeight}
          priority
          style={{
            borderRadius: 32,
          }}
        />
      </div>
      <div className="w-full h-9 text-center flex items-end justify-center">
        <h1
          style={{
            opacity: Math.max(
              0,
              1 - (layoutState.contentScrollTop / shrinkIconScrollTop) * 3.5
            ),
            paddingBottom: Math.min(150, layoutState.contentScrollTop * 1.5),
          }}
        >
          <Title />
        </h1>
      </div>
    </div>
  ) : (
    <></>
  );
};
