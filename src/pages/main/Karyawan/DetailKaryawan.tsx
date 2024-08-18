import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Header from "../../../components/dependent/Header";
import KaryawanItem from "../../../components/dependent/KaryawanItem";
import ListJadwalKaryawan from "../../../components/dependent/ListJadwalKaryawan";
import Retry from "../../../components/dependent/Retry";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import { dummyKaryawans } from "../../../constant/dummy";
import {
  Interface__Jadwal,
  Interface__Karyawan,
} from "../../../constant/interfaces";
import useDetailKaryawan from "../../../global/useDetailKaryawan";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function DetailJadwal() {
  useScrollToTop();

  const containerRef = useRef<HTMLDivElement>(null);

  const { error, loading, data, retry } = useDataState<Interface__Karyawan[]>({
    initialData: dummyKaryawans,
    url: "",
  });
  const { detailKaryawanId, setDetailKaryawanId } = useDetailKaryawan();
  const [isInit, setIsInit] = useState<boolean>(true);
  const [jadwalKaryawanList, setJadwalKaryawanList] = useState<
    Interface__Jadwal[] | undefined
  >(undefined);

  useEffect(() => {
    if (data) {
      if (!detailKaryawanId) {
        setDetailKaryawanId(data[0].id);
        setJadwalKaryawanList(data[0].jadwals);
      } else {
        if (!jadwalKaryawanList) {
          const theKaryawan = data.find(
            (karyawan) => karyawan.id === detailKaryawanId
          );
          setJadwalKaryawanList(theKaryawan?.jadwals);
        }
      }
    }
  }, [data, detailKaryawanId, setDetailKaryawanId, jadwalKaryawanList]);

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
      <Header title="Detail Karyawan" left={"back"} px={4} />

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
              w={"100%"}
              overflowX={"auto"}
              className="noScroll"
              scrollSnapType={"x mandatory"}
            >
              <HStack w={"max-content"} px={6} gap={3}>
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} h={"80px"} w={"280px"} />
                  ))}

                {!loading &&
                  data &&
                  data.length > 0 &&
                  data?.map((karyawan, i) => (
                    <Box
                      key={i}
                      ref={
                        karyawan.id === detailKaryawanId
                          ? setActiveItemRef
                          : null
                      }
                      onClick={() => {
                        setIsInit(false);
                        setDetailKaryawanId(karyawan.id);
                        setJadwalKaryawanList(karyawan.jadwals);
                      }}
                    >
                      <KaryawanItem
                        w={"280px"}
                        data={karyawan}
                        borderLeft={
                          karyawan.id === detailKaryawanId
                            ? "5px solid var(--p500)"
                            : ""
                        }
                        scrollSnapAlign={"center"}
                        noArrowIcon
                      />
                    </Box>
                  ))}
              </HStack>
            </Box>

            <Text fontWeight={600} px={6} mt={6} mb={4}>
              Jadwal Karyawan Minggu Ini
            </Text>

            {loading && (
              <CContainer gap={3} px={5}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} h={"114px"} />
                ))}
              </CContainer>
            )}

            {!loading && data && (
              <ListJadwalKaryawan data={jadwalKaryawanList} px={6} />
            )}
          </>
        )}
      </VStack>
    </CContainer>
  );
}
