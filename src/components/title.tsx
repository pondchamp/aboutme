import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { TypewriterClass } from "typewriter-effect";

import { usePageViewed } from "@/hooks/usePageViewed";
import { FullName, MyName } from "@/util";

const Typewriter = dynamic(() => import("typewriter-effect"));

export const Title = () => {
  const prefixChar = 3;
  const [pageViewed, setPageViewed] = usePageViewed();
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
        .callFunction(setPageViewed)
        .start();
    }
  }, [setPageViewed, writer]);

  return pageViewed ? (
    <>{MyName}</>
  ) : (
    <>
      <span className={`pl-[26px] ${fixedText ? "hidden" : "block"}`}>
        <Typewriter onInit={animate} options={{}} />
      </span>
      <span className={fixedText ? "block" : "hidden"}>{fixedText}</span>
    </>
  );
};
