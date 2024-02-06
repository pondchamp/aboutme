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
  transform: "translateX(280px) translateY(-80px) translateZ(0px)",
  width: "85px",
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
  const shrinkIconScrollTop = 150;
  const shrinkIconScrollTopBuffered = shrinkIconScrollTop - 70;
  const classProps: ClassProps = useMemo(
    () =>
      layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ||
      layoutState.layoutAnimState == LayoutAnimState.PROFILE_MOUNTED
        ? {
            containerHeight: "100%",
            containerWidth: "100%",
            fontSize: "30px",
            gap: "16px",
            imgHeight: 120,
            imgWidth: 120,
            lineHeight: "36px",
            profileWidth: "100%",
            txtTansform: "translateX(0px) translateY(0px) translateZ(0px)",
            txtWidth: "340px",
          }
        : {
            containerHeight: contianerYRefFinal.height,
            containerWidth: contianerXRefFinal.width,
            fontSize: profileTxtRefFinal.fontSize,
            gap: profileRefFinal.gap,
            imgHeight: profileImgRefFinal.height,
            imgWidth: profileImgRefFinal.width,
            lineHeight: contianerYRefFinal.lineHeight,
            profileWidth: profileRefFinal.width,
            txtTansform: profileTxtRefFinal.transform,
            txtWidth: profileTxtRefFinal.width,
          },
    [layoutState.layoutAnimState]
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
        x: [0, 280],
        y: [0, -80],
      },
      { type: "keyframes" }
    );
    animate(
      profileTitleRef.current,
      {
        fontSize: [classProps.fontSize, profileTxtRefFinal.fontSize],
        width: [classProps.txtWidth, profileTxtRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      profileSubtitleRef.current,
      {
        opacity: [0, 1],
      },
      { type: "keyframes" }
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
        width: [`${width}px`, profileRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      containerXRef.current,
      {
        width: [`${width}px`, contianerXRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      containerYRef.current,
      {
        height: [`${height}px`, contianerYRefFinal.height],
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
      className="w-full z-20 absolute inset-x-0 flex items-center justify-center"
      style={{
        fontSize: classProps.fontSize,
        height: classProps.containerHeight,
      }}
      ref={containerYRef}
    >
      <div
        style={{
          width: classProps.containerWidth,
        }}
        ref={containerXRef}
      >
        <div
          className="flex flex-col items-center justify-center pt-6"
          style={{
            gap: classProps.gap,
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
              opacity: Math.max(
                0,
                1 -
                  (layoutState.contentScrollTop / (shrinkIconScrollTop + 100)) *
                    3.5
              ),
              paddingRight: Math.min(200, layoutState.contentScrollTop * 3.5),
            }}
          >
            <div
              style={{
                transform: classProps.txtTansform,
              }}
              ref={profileTxtRef}
            >
              <div
                style={{
                  width: classProps.txtWidth,
                }}
                ref={profileTitleRef}
              >
                <Title />
              </div>
              {layoutState.layoutAnimState != LayoutAnimState.MOUNT_STARTED && (
                <div
                  className="whitespace-nowrap text-sm"
                  style={{
                    opacity: 0,
                  }}
                  ref={profileSubtitleRef}
                >
                  Brand Advertising - Generative AI - Economic Analysis
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
