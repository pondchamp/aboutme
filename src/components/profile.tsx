import { animate } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePageViewed } from "@/hooks/usePageViewed";
import { useViewport } from "@/hooks/useViewport";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";

const contianerYRefFinal = {
  height: "160px",
  lineHeight: "32px",
};

const contianerXRefFinal = {
  width: "800px",
};

const profileRefFinal = {
  gap: "8px",
  width: "120px",
};

const profileTxtRefFinal = {
  fontSize: "20px",
  profileWidth: "85px",
  transform: "translateX(280px) translateY(-90px) translateZ(0px)",
  width: "450px",
  x: 280,
  y: -80,
};

const profileImgRefFinal = {
  height: 85,
  width: 85,
};

const Title = dynamic(
  () => import("@/components/title").then((mod) => mod.Title),
  { ssr: false }
);

interface ClassProps {
  containerHeight: string;
  containerWidth: string;
  fontSize: string;
  gap: string;
  imgHeight: number;
  imgWidth: number;
  lineHeight: string;
  profileTxtWidth: string;
  profileWidth: string;
  subtitleOpacity: number;
  txtTansform: string;
  txtWidth: string;
}

export const Profile = () => {
  const { width, height } = useViewport();
  const dispatch = useAppDispatch();
  const [_, setPageViewed] = usePageViewed();
  const containerYRef = createRef<HTMLDivElement>();
  const containerXRef = createRef<HTMLDivElement>();
  const profileRef = createRef<HTMLDivElement>();
  const profileImgRef = createRef<HTMLDivElement>();
  const profileTitleRef = createRef<HTMLDivElement>();
  const profileSubtitleRef = createRef<HTMLDivElement>();
  const profileTxtRef = createRef<HTMLDivElement>();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);

  const profileIconSizeSm = 50;
  const contentScrollTop = 10;
  const shrinkIconScrollTop = 150;
  const shrinkIconScrollTopBuffered = shrinkIconScrollTop - 70;
  const classProps: ClassProps = useMemo(
    () =>
      layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ||
      layoutState.layoutAnimState == LayoutAnimState.PROFILE_MOUNTED
        ? {
            containerHeight: `${height}px`,
            containerWidth: `${width}px`,
            fontSize: "30px",
            gap: "16px",
            imgHeight: 120,
            imgWidth: 120,
            lineHeight: "36px",
            profileTxtWidth: "450px",
            profileWidth: `${width}px`,
            subtitleOpacity: 0,
            txtTansform: "translateX(0px) translateY(0px) translateZ(0px)",
            txtWidth: "450px",
          }
        : {
            containerHeight: contianerYRefFinal.height,
            containerWidth: contianerXRefFinal.width,
            fontSize: profileTxtRefFinal.fontSize,
            gap: profileRefFinal.gap,
            imgHeight: profileImgRefFinal.height,
            imgWidth: profileImgRefFinal.width,
            lineHeight: contianerYRefFinal.lineHeight,
            profileTxtWidth: profileTxtRefFinal.profileWidth,
            profileWidth: profileRefFinal.width,
            subtitleOpacity: 1,
            txtTansform: profileTxtRefFinal.transform,
            txtWidth: profileTxtRefFinal.width,
          },
    [height, layoutState.layoutAnimState, width]
  );

  // Post profile mount
  useEffect(() => {
    if (
      !profileRef.current ||
      !profileImgRef.current ||
      !profileTxtRef.current ||
      !profileTitleRef.current ||
      !profileSubtitleRef.current ||
      !containerXRef.current ||
      !containerYRef.current ||
      layoutState.layoutAnimState != LayoutAnimState.PROFILE_MOUNTED
    ) {
      return;
    }

    animate(
      profileTxtRef.current,
      {
        width: [classProps.txtWidth, profileTxtRefFinal.width],
        x: [0, 280],
        y: [0, -80],
      },
      { type: "keyframes" }
    );
    const subRef = profileSubtitleRef.current;
    animate(
      profileTitleRef.current,
      {
        fontSize: [classProps.fontSize, profileTxtRefFinal.fontSize],
        width: [classProps.profileTxtWidth, profileTxtRefFinal.profileWidth],
      },
      { type: "keyframes" }
    ).then(() =>
      animate(
        subRef,
        {
          opacity: [0, 1],
        },
        { type: "keyframes" }
      )
    );
    animate(
      profileImgRef.current,
      {
        height: [classProps.imgHeight, profileImgRefFinal.height],
        width: [classProps.imgWidth, profileImgRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      profileRef.current,
      {
        gap: [classProps.gap, profileRefFinal.gap],
        width: [classProps.profileWidth, profileRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      containerXRef.current,
      {
        width: [classProps.containerWidth, contianerXRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      containerYRef.current,
      {
        height: [classProps.containerHeight, contianerYRefFinal.height],
        lineHeight: [classProps.lineHeight, contianerYRefFinal.lineHeight],
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
    classProps,
    layoutState.layoutAnimState,
    profileRef,
    profileImgRef,
    profileTitleRef,
    profileSubtitleRef,
    profileTxtRef,
    containerXRef,
    containerYRef,
    setPageViewed,
    width,
  ]);

  return layoutState.layoutAnimState != LayoutAnimState.NOT_MOUNTED ? (
    <div
      className="z-20 absolute inset-x-0 flex items-center justify-center"
      style={{
        height: classProps.containerHeight,
      }}
      ref={containerYRef}
    >
      <div
        className="pt-12"
        style={{
          width: classProps.containerWidth,
        }}
        ref={containerXRef}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{
            gap: classProps.gap,
            width: classProps.profileWidth,
          }}
          ref={profileRef}
        >
          <div
            className="w-fit h-full"
            style={{
              height: classProps.imgHeight,
              width: classProps.imgWidth,
              zIndex: 20,
            }}
            ref={profileImgRef}
          >
            <Image
              src="img/me.jpg"
              alt="profile"
              onDragStart={(event) => event.preventDefault()}
              width={
                layoutState.contentScrollTop < shrinkIconScrollTopBuffered
                  ? classProps.imgHeight
                  : Math.max(
                      profileIconSizeSm,
                      classProps.imgHeight -
                        (layoutState.contentScrollTop -
                          shrinkIconScrollTopBuffered)
                    )
              }
              height={classProps.imgHeight}
              priority
              style={{
                borderRadius: 32,
              }}
            />
          </div>
          <div
            style={{
              opacity:
                layoutState.contentScrollTop < contentScrollTop
                  ? 1
                  : Math.max(
                      0,
                      1 -
                        ((layoutState.contentScrollTop - contentScrollTop) /
                          (shrinkIconScrollTop + 40)) *
                          3.5
                    ),
              paddingRight:
                layoutState.contentScrollTop < contentScrollTop
                  ? 0
                  : Math.min(
                      200,
                      (layoutState.contentScrollTop - contentScrollTop) * 3.5
                    ),
            }}
          >
            <div
              className="h-[80px] flex flex-col justify-center"
              style={{
                transform: classProps.txtTansform,
                width: classProps.txtWidth,
              }}
              ref={profileTxtRef}
            >
              <div
                style={{
                  fontSize: classProps.fontSize,
                  width: classProps.profileTxtWidth,
                }}
                ref={profileTitleRef}
              >
                <Title />
              </div>
              {layoutState.layoutAnimState != LayoutAnimState.MOUNT_STARTED && (
                <div
                  className="text-xs md:text-sm w-[170px] md:w-[450px]"
                  style={{
                    opacity: classProps.subtitleOpacity,
                  }}
                  ref={profileSubtitleRef}
                >
                  Brand Advertising &#x2022; Generative AI &#x2022; Economic
                  Analysis
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
