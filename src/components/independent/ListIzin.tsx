import { Center, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import useFilterIzin from "../../global/useFilterIzin";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatDuration from "../../lib/formatDuration";
import formatTime from "../../lib/formatTime";
import Retry from "../dependent/Retry";
import StatusApprovalBadge from "../dependent/StatusApprovalBadge";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function ListIzin() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { filterIzin } = useFilterIzin();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-izin`,
    payload: {
      ...(filterIzin?.tahun?.length > 0 && {
        tahun: [filterIzin.tahun],
      }),
      ...(filterIzin?.status_izin?.length > 0 && {
        status: filterIzin.status_izin.map((sp: any) => sp.value),
      }),
      offset: 6,
    },
    dependencies: [filterIzin],
  });

  return (
    <CContainer gap={3} flex={1}>
      {loading &&
        Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} h={"185px"} />
        ))}

      {!loading && (
        <>
          {error && (
            <>
              {notFound && (
                <NoData minH={"132px"} label="Tidak ada riwayat izin" />
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
                  {data?.map((izin: any, i: number) => (
                    <CContainer
                      key={i}
                      p={4}
                      borderRadius={12}
                      bg={lightDarkColor}
                      gap={3}
                    >
                      <HStack justify={"space-between"} align={"start"}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Tanggal Izin
                          </Text>
                          <Text fontWeight={500}>
                            {formatDate(izin?.tgl_izin)}
                          </Text>
                        </CContainer>

                        <StatusApprovalBadge data={izin?.statusizin?.id} />
                      </HStack>

                      <CContainer gap={1}>
                        <Text opacity={0.4} fontSize={12}>
                          Waktu Izin
                        </Text>
                        <Text fontWeight={500}>
                          {formatTime(izin?.waktu_izin)}
                        </Text>
                      </CContainer>

                      <SimpleGrid columns={2} gap={6}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Durasi
                          </Text>
                          <Text fontWeight={500}>
                            {formatDuration(izin.durasi)}
                          </Text>
                        </CContainer>

                        {/* <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Disetujui oleh
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
                    onClick={loadMore}
                    isLoading={loadingLoadMore}
                  >
                    Tampilkan Lebih Banyak
                  </Button> */}
                </>
              ) : (
                <NoData minH={"300px"} label="Tidak ada riwayat izin" />
              )}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
