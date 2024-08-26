import { Button, Center, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import useFilterCuti from "../../global/useFilterCuti";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import Retry from "../dependent/Retry";
import StatusApprovalBadge from "../dependent/StatusApprovalBadge";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function ListCuti() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { filterCuti } = useFilterCuti();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-riwayat-cuti`,
    payload: { ...filterCuti },
    dependencies: [filterCuti],
  });

  return (
    <CContainer gap={3} flex={1}>
      {loading &&
        Array.from({ length: 10 }).map((cuti, i) => (
          <Skeleton key={i} h={"185px"} />
        ))}

      {!loading && (
        <>
          {error && (
            <>
              {notFound && (
                <NoData minH={"132px"} label="Tidak ada riwayat cuti" />
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
              {data && data?.data?.length > 0 ? (
                <>
                  {data?.data?.map((cuti: any, i: number) => (
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
                            Tipe Cuti
                          </Text>
                          <Text fontWeight={500}>
                            {cuti?.tipe_cuti?.label || "-"}
                          </Text>
                        </CContainer>

                        <StatusApprovalBadge data={cuti?.status_cuti_id} />
                      </HStack>

                      <CContainer gap={1}>
                        <Text opacity={0.4} fontSize={12}>
                          Tanggal Cuti
                        </Text>
                        <Text fontWeight={500}>{`${formatDate(
                          cuti.tgl_from,
                          "basicShort"
                        )} - ${formatDate(cuti.tgl_to, "basicShort")}`}</Text>
                      </CContainer>

                      <SimpleGrid columns={2} gap={6}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Total Cuti
                          </Text>
                          <Text fontWeight={500}>{cuti.durasi} Hari</Text>
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
                  <Button
                    flexShrink={0}
                    colorScheme="ap"
                    variant={"ghost"}
                    className="clicky"
                  >
                    Tampilkan Lebih Banyak
                  </Button>
                </>
              ) : (
                <NoData minH={"300px"} label="Tidak ada riwayat cuti" />
              )}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
