import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import type { TypewriterClass } from "typewriter-effect";

import { useAppSelector } from "@/hooks";
import { LayoutAnimState, SetLayoutAnimState } from "@/slice/LayoutSlice";
import { FullName, MyName } from "@/util";

const Typewriter = dynamic(() => import("typewriter-effect"));

const prefixChar = 3;

export const Title = () => {
  const dispatch = useDispatch();
  const layoutState = useAppSelector((state) => state.layout, shallowEqual);
  const [fixedText, setFixedText] = useState<string | undefined>(FullName);
  const [writer, setWriter] = useState<TypewriterClass>();

  const animate = (typewriter: TypewriterClass) => {
    typewriter
      .changeDelay(1)
      .typeString(FullName)
      .callFunction(() => setFixedText(undefined))
      .changeDeleteSpeed(20)
      .changeDelay(50)
      .start();
    setWriter(typewriter);
  };

  useEffect(() => {
    if (writer) {
      writer
        .deleteChars(FullName.length - prefixChar)
        .pauseFor(200)
        .typeString(MyName.slice(prefixChar))
        .pauseFor(200)
        .callFunction(() => setFixedText(MyName))
        .callFunction(() =>
          dispatch(SetLayoutAnimState(LayoutAnimState.PROFILE_MOUNTED))
        )
        .start();
    }
  }, [dispatch, writer]);

  return layoutState.layoutAnimState == LayoutAnimState.NOT_MOUNTED ? (
    <></>
  ) : (
    <>
      <h1 className="text-center">
        {layoutState.layoutAnimState == LayoutAnimState.MOUNT_STARTED ? (
          <>
            <span className={`${fixedText ? "hidden" : "block"}`}>
              <Typewriter onInit={animate} options={{}} />
            </span>
            <span className={fixedText ? "block" : "hidden"}>{fixedText}</span>
          </>
        ) : (
          <>{MyName}</>
        )}
      </h1>
    </>
  );
};
