import { Box, HStack } from "@chakra-ui/react";
import { Dispatch, useEffect, useRef, useState } from "react";
import { Interface__Karyawan } from "../../constant/interfaces";
import KaryawanItem from "./KaryawanItem";

interface Props {
  data: Interface__Karyawan[];
  setActiveKaryawan: Dispatch<Interface__Karyawan>;
  index: number;
}

export default function ListDetailKaryawan({
  data,
  setActiveKaryawan,
  index,
}: Props) {
  const [activeKaryawanIndex, setActiveKaryawanIndex] = useState<number>(index);

  const [isInit, setIsInit] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeRef) {
      if (activeRef.current && containerRef.current) {
        containerRef.current.style.scrollSnapType = "none";

        activeRef.current.scrollIntoView({
          behavior: isInit ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.scrollSnapType = "x mandatory";
          }
        }, 600);
      }
    }
  }, [isInit, activeKaryawanIndex]);

  return (
    <Box
      ref={containerRef}
      overflowX={"auto"}
      w={"100%"}
      scrollSnapType={"x mandatory"}
      className="noScroll"
    >
      <HStack w={"max-content"} px={5} gap={3}>
        {data.map((karyawan, i) => {
          return (
            <Box
              key={i}
              ref={i === activeKaryawanIndex ? activeRef : null}
              onClick={() => {
                if (isInit) {
                  setIsInit(false);
                }
                setActiveKaryawanIndex(i);
                setActiveKaryawan(karyawan);
              }}
            >
              <KaryawanItem
                w={"280px"}
                data={karyawan}
                borderLeft={
                  i === activeKaryawanIndex
                    ? "4px solid var(--p500)"
                    : undefined
                }
                scrollSnapAlign={"center"}
                noArrowIcon
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
