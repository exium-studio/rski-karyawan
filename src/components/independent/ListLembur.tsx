import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatDurationShort from "../../lib/formatDurationShort";
import formatTime from "../../lib/formatTime";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function ListLembur() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-riwayat-lembur`,
    payload: {},
    dependencies: [],
  });

  return (
    <CContainer flex={1} gap={3}>
      {loading && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} h={"130px"} flex={"1 1 150px"} />
          ))}
        </>
      )}

      {!loading && (
        <>
          {error && (
            <>
              {notFound && (
                <NoData minH={"132px"} label="Tidak ada riwayat lembur" />
              )}

              {!notFound && (
                <Center my={"auto"} minH={"300px"}>
                  <Retry loading={loading} retry={retry} />
                </Center>
              )}
            </>
          )}

          {!error && (
            <>
              {data && data?.length > 0 ? (
                <>
                  {data?.map((lembur: any, i: number) => (
                    <CContainer
                      key={i}
                      p={4}
                      borderRadius={12}
                      bg={lightDarkColor}
                      flex={0}
                      gap={3}
                      position={"relative"}
                    >
                      {/* {!isDatePassed(lembur?.jadwal?.tgl_mulai) && (
                        <Box
                          w={"6px"}
                          h={"6px"}
                          borderRadius={"full"}
                          bg={"red.400"}
                          position={"absolute"}
                          top={4}
                          right={4}
                        /> 
                      )} */}
                      <SimpleGrid columns={2} gap={6}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Tanggal Lembur
                          </Text>
                          <Text fontWeight={500}>{`${formatDate(
                            lembur?.tgl_pengajuan || lembur?.jadwal?.tgl_mulai,
                            "basicShort"
                          )}`}</Text>
                        </CContainer>

                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Jam Kerja
                          </Text>
                          <Text fontWeight={500}>
                            {`${formatTime(
                              lembur.jadwal.jam_from
                            )} - ${formatTime(lembur.jadwal.jam_to)}`}
                          </Text>
                        </CContainer>
                      </SimpleGrid>

                      <SimpleGrid columns={2} gap={6}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Durasi
                          </Text>
                          <Text fontWeight={500}>
                            {formatDurationShort(lembur.durasi)}
                          </Text>
                        </CContainer>

                        {/* <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Diajukan oleh
                          </Text>
                          <Text fontWeight={500}>{"-"}</Text>
                        </CContainer> */}
                      </SimpleGrid>
                    </CContainer>
                  ))}
                  {/* <Button
                    flexShrink={0}
                    colorScheme="ap"
                    variant={"ghost"}
                    className="clicky"
                  >
                    Tampilkan Lebih Banyak
                  </Button> */}
                </>
              ) : (
                <NoData minH={"300px"} label="Tidak ada riwayat lembur" />
              )}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
