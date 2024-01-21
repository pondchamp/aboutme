import { useEffect, useState } from "react";
import Typewriter, { TypewriterClass } from "typewriter-effect";

import { FullName, MyName } from "@/util";

export const Title = () => {
  const prefixChar = 3;
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
        .start();
    }
  }, [writer]);

  return (
    <>
      <div className={`pl-[26px] ${fixedText ? "hidden" : "block"}`}>
        <Typewriter onInit={animate} options={{}} />
      </div>
      <div className={fixedText ? "block" : "hidden"}>{fixedText}</div>
    </>
  );
};
