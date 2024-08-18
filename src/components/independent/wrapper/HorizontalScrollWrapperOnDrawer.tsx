import { Box, BoxProps } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props extends BoxProps {}

export default function HorizontalScrollWrapperOnDrawer({ ...props }: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchEnd, setTouchEnd] = useState(false);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.scrollLeft !== target.scrollWidth - target.clientWidth) {
      if (!touchEnd) {
        setIsScrolling(true);
      }
    } else {
      setIsScrolling(false);
    }
  }

  function handleTouchStart() {
    setTouchEnd(false);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (isScrolling) {
      e.stopPropagation();
    }
  }

  function handleTouchEnd() {
    setTouchEnd(true);
    setIsScrolling(false);
  }

  return (
    <Box
      w={"100%"}
      overflowX={"auto"}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="noScroll"
      {...props}
    ></Box>
  );
}
