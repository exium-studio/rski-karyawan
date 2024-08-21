import { Box, HStack } from "@chakra-ui/react";
import { Dispatch, useEffect, useRef, useState } from "react";
import { Interface__Jadwal } from "../../constant/interfaces";
import JadwalItem from "./JadwalItem";

interface Props {
  data: Interface__Jadwal[];
  setActiveJadwal: Dispatch<Interface__Jadwal>;
  index: number;
}

export default function ListDetailJadwalSaya({
  data,
  setActiveJadwal,
  index,
}: Props) {
  const [activeJadwalIndex, setActiveJadwalIndex] = useState<number>(index);

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
  }, [isInit, activeJadwalIndex]);

  return (
    <Box
      ref={containerRef}
      overflowX={"auto"}
      w={"100%"}
      scrollSnapType={"x mandatory"}
      className="noScroll"
    >
      <HStack w={"max-content"} px={5} gap={3}>
        {data.map((jadwal, i) => {
          return (
            <Box
              key={i}
              ref={i === activeJadwalIndex ? activeRef : null}
              onClick={() => {
                if (isInit) {
                  setIsInit(false);
                }
                setActiveJadwalIndex(i);
                setActiveJadwal(jadwal);
              }}
            >
              <JadwalItem
                data={jadwal}
                w={"calc(100vw - 72px)"}
                h={"114px"}
                scrollSnapAlign={"center"}
                borderLeft={
                  i === activeJadwalIndex ? "4px solid var(--p500)" : undefined
                }
                noAvatars
                noArrow
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
