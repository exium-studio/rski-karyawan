import { Box, Center, HStack, Text } from "@chakra-ui/react";
import useDataState from "../../hooks/useDataState";
import SemuaPengumuman from "../../pages/main/Beranda/SemuaPengumuman";
import PengumumanItem from "../dependent/PengumumanItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function PengumumanBeranda() {
  const { error, notFound, loading, data, retry } = useDataState<any>({
    url: "/api/get-pengumuman",
    initialData: undefined,
    payload: {},
    limit: 4,
  });

  // SX

  return (
    <CContainer flex={0}>
      <HStack mb={4} justify={"space-between"} px={5}>
        <Text fontWeight={600}>Pengumuman</Text>

        <SemuaPengumuman />
      </HStack>

      <CContainer flex={0} align={"stretch"} gap={3}>
        {error && (
          <>
            {notFound && <NoData minH={"132px"} label="Tidak ada pengumuman" />}

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

                {data && (
                  <Box
                    overflowX={"auto"}
                    w={"100%"}
                    className="noScroll"
                    scrollSnapType={"x mandatory"}
                  >
                    <HStack px={5} w={"max-content"} gap={3} align={"stretch"}>
                      {data &&
                        data.map((pengumuman: any, i: number) => (
                          <PengumumanItem
                            key={i}
                            data={pengumuman}
                            scrollSnapAlign={"center"}
                            w={"calc(100vw - 64px)"}
                            maxW={"600px"}
                          />
                        ))}
                    </HStack>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
