import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Header from "../../../components/dependent/Header";
import JadwalItem from "../../../components/dependent/JadwalItem";
import Skeleton from "../../../components/independent/Skeleton";
import {
  Interface__Jadwal,
  Interface__Karyawan,
} from "../../../constant/interfaces";
import useScrollToTop from "../../../hooks/useScrollToTop";

import { getCookie } from "typescript-cookie";
import ListKaryawanByJadwal from "../../../components/dependent/ListKaryawanByJadwal";
import Retry from "../../../components/dependent/Retry";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import { dummyMySchedules } from "../../../constant/dummy";
import useDetailJadwal from "../../../global/useDetailJadwal";
import useDataState from "../../../hooks/useDataState";

export default function DetailJadwal() {
  useScrollToTop();

  const user: Interface__Karyawan = JSON.parse(getCookie("userData") as string);

  const containerRef = useRef<HTMLDivElement>(null);

  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyMySchedules,
    url: "",
  });
  const { detailJadwalIndex, setDetailJadwalIndex } = useDetailJadwal();
  const [isInit, setIsInit] = useState<boolean>(true);

  const setActiveItemRef = (element: any) => {
    if (element) {
      const activeItem = element;

      if (activeItem && containerRef.current) {
        containerRef.current.style.scrollSnapType = "none";

        activeItem.scrollIntoView({
          behavior: isInit ? "auto" : "smooth", // Use isInit to determine scroll behavior
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
  };

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header title="Detail Jadwal" left={"back"} px={4} />

      <VStack gap={0} align={"stretch"} bg={contentBgColor} flex={1} py={6}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            <Box
              ref={containerRef}
              overflowX={"auto"}
              w={"100%"}
              scrollSnapType={"x mandatory"}
              className="noScroll"
            >
              <HStack w={"max-content"} px={5} gap={3}>
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} h={"114px"} w={"250px"} />
                  ))}

                {!loading &&
                  data &&
                  data.length > 0 &&
                  data.map((jadwal, i) => {
                    return (
                      <Box
                        key={i}
                        ref={i === detailJadwalIndex ? setActiveItemRef : null}
                        onClick={() => {
                          setIsInit(false);
                          setDetailJadwalIndex(i);
                        }}
                      >
                        <JadwalItem
                          data={jadwal}
                          h={"114px"}
                          minW={"250px"}
                          scrollSnapAlign={"center"}
                          borderLeft={
                            i === detailJadwalIndex
                              ? "5px solid var(--p500)"
                              : undefined
                          }
                          noAvatars
                          noArrow
                        />
                      </Box>
                    );
                  })}
              </HStack>
            </Box>

            <Text fontWeight={600} px={6} mt={6} mb={4}>
              Karyawan {user.unit_kerja.nama_unit || "Unit Kerja"}
            </Text>

            {loading && (
              <CContainer gap={3} px={5}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} h={"80px"} />
                ))}
              </CContainer>
            )}

            {!loading && data && (
              <ListKaryawanByJadwal
                data={data[detailJadwalIndex].assignees}
                px={5}
              />
            )}
          </>
        )}
      </VStack>
    </CContainer>
  );
}
