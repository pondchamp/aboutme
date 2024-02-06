import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

interface ScrollPassthroughProps extends PropsWithChildren {
  className?: string;
}

export const ScrollPassthrough = forwardRef<
  HTMLDivElement,
  ScrollPassthroughProps
>(({ children, className = "" }, ref) => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const [contentHover, setContentHover] = useState(false);

  useEffect(() => {
    const handleScrolling = (event: WheelEvent) => {
      if (!!internalRef?.current) {
        if (contentHover === false) {
          internalRef.current.scrollTop += event.deltaY;
        }
      }
    };

    window.addEventListener("wheel", handleScrolling);

    return () => {
      window.removeEventListener("wheel", handleScrolling);
    };
  });

  return (
    <div
      className={className}
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      onMouseEnter={() => {
        setContentHover(true);
      }}
      onMouseLeave={() => {
        setContentHover(false);
      }}
    >
      {children}
    </div>
  );
});
ScrollPassthrough.displayName = "Search";
