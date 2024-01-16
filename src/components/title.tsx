import { useEffect, useState } from "react";
import Typewriter, { TypewriterClass } from "typewriter-effect";

import { FullName, MyName } from "@/util";

export const Title = () => {
  const [init, setInit] = useState(false);
  const [writer, setWriter] = useState<TypewriterClass>();

  const animate = (typewriter: TypewriterClass) => {
    typewriter
      .changeDelay(1)
      .typeString(FullName)
      .callFunction(() => setInit(true))
      .changeDelay(50)
      .start();
    setWriter(typewriter);
  };

  useEffect(() => {
    if (writer) {
      writer.deleteAll(30).pauseFor(500).typeString(MyName).start();
      setWriter(writer);
    }
  }, [writer]);

  return (
    <>
      <div className={init ? "block" : "hidden"}>
        <Typewriter onInit={animate} options={{}} />
      </div>
      <div className={init ? "hidden" : "block"}>{FullName}</div>
    </>
  );
};
