import { animate } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRef, useEffect, useMemo } from "react";
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

interface ClassProps {
  containerHeight: string;
  containerWidth: string;
  fontSize: string;
  gap: string;
  imgHeight: number;
  imgWidth: number;
  lineHeight: string;
}

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
          }
        : {
            containerHeight: profileRefFinal.height,
            containerWidth: profileRefFinal.width,
            fontSize: profileRefFinal.fontSize,
            gap: profileRefFinal.gap,
            imgHeight: profileImgRefFinal.height,
            imgWidth: profileImgRefFinal.width,
            lineHeight: profileRefFinal.lineHeight,
          },
    [layoutState.layoutAnimState]
  );

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
        height: [classProps.imgHeight, profileImgRefFinal.height],
        width: [classProps.imgWidth, profileImgRefFinal.width],
      },
      { type: "keyframes" }
    );
    animate(
      profileRef.current,
      {
        fontSize: [classProps.fontSize, profileRefFinal.fontSize],
        gap: [classProps.gap, profileRefFinal.gap],
        height: [`${height}px`, profileRefFinal.height],
        lineHeight: [classProps.lineHeight, profileRefFinal.lineHeight],
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
    classProps,
    layoutState.layoutAnimState,
    profileImgRef,
    profileRef,
    setPageViewed,
    width,
  ]);

  return layoutState.layoutAnimState != LayoutAnimState.NOT_MOUNTED ? (
    <div
      className="z-20 absolute top-0 inset-x-0 flex justify-center"
      style={{
        fontSize: classProps.fontSize,
        height: classProps.containerHeight,
        width: classProps.containerWidth,
      }}
      ref={profileRef}
    >
      <div
        style={{
          height: "100%",
          width: "800px",
        }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{
            gap: classProps.gap,
          }}
        >
          <div
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
          <div className="h-9 text-center flex items-center justify-center">
            <h1
              style={{
                opacity: Math.max(
                  0,
                  1 - (layoutState.contentScrollTop / shrinkIconScrollTop) * 3.5
                ),
                paddingBottom: Math.min(
                  150,
                  layoutState.contentScrollTop * 1.5
                ),
              }}
            >
              <Title />
            </h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
