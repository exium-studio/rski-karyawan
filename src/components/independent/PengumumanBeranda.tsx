import { Box, Center, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { dummyPengumuman } from "../../constant/dummy";
import useDataState from "../../hooks/useDataState";
import PengumumanItem from "../dependent/PengumumanItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function PengumumanBeranda() {
  const { error, notFound, loading, data, retry } = useDataState({
    initialData: dummyPengumuman,
    url: "/api/latest-penngumuman",
  });

  // SX

  return (
    <CContainer flex={0}>
      <HStack mb={4} justify={"space-between"} px={5}>
        <Text fontWeight={600}>Pengumuman</Text>

        <Text
          color={"p.500"}
          as={Link}
          to={"/beranda/pengumuman"}
          fontWeight={500}
          fontSize={"12px !important"}
        >
          Semua Pengumuman
        </Text>
      </HStack>

      <CContainer flex={0} align={"stretch"} gap={3}>
        {error && (
          <>
            {notFound && <NoData label="Tidak ada pengumuman" />}

            {!notFound && (
              <Center my={"auto"} minH={"300px"}>
                <Retry loading={loading} retry={retry} />
              </Center>
            )}
          </>
        )}

        {!error && (
          <>
            {loading && (
              <Box
                overflowX={"auto"}
                w={"100%"}
                className="noScroll"
                scrollSnapType={"x mandatory"}
              >
                <HStack px={5} w={"max-content"} gap={3} align={"stretch"}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      h={"123px"}
                      w={"calc(100vw - 64px)"}
                      scrollSnapAlign={"center"}
                    />
                  ))}
                </HStack>
              </Box>
            )}

            {!loading && (
              <>
                {!data && <NoData label="Tidak ada pengumuman" />}

                <Box
                  overflowX={"auto"}
                  w={"100%"}
                  className="noScroll"
                  scrollSnapType={"x mandatory"}
                >
                  <HStack px={5} w={"max-content"} gap={3} align={"stretch"}>
                    {data &&
                      data.map((pengumuman, i) => (
                        <PengumumanItem
                          key={i}
                          data={pengumuman}
                          scrollSnapAlign={"center"}
                          w={"calc(100vw - 64px)"}
                        />
                      ))}
                  </HStack>
                </Box>
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
