import { useEffect, useState } from "react";

export const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || init) {
      return;
    }
    setInit(true);
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [init]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { height, width };
};
