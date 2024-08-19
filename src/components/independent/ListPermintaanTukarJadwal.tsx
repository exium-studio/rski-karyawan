import { Box, Button, Center, StackProps, Text } from "@chakra-ui/react";
import useFilterTukarJadwal from "../../global/useFilterTukarJadwal";
import useDataState from "../../hooks/useDataState";
import Retry from "../dependent/Retry";
import TukarJadwalItem from "../dependent/TukarJadwalItem";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {}

export default function ListPermintaanTukarJadwal({ ...props }: Props) {
  const { filterTukarJadwal } = useFilterTukarJadwal();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-permintaan-swap`,
    payload: { ...filterTukarJadwal },
    dependencies: [filterTukarJadwal],
  });

  // SX

  return (
    <>
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}

      {!error && (
        <>
          <Text fontWeight={600} mb={2}>
            Riwayat
          </Text>

          {loading && (
            <CContainer gap={3} {...props}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} h={"185"} />
              ))}
            </CContainer>
          )}

          {!loading && (
            <>
              {error && (
                <>
                  {notFound && (
                    <NoData
                      minH={"300px"}
                      label="Tidak ada riwayat permintaan tukar jadwal"
                    />
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
                  {data?.data?.length > 0 ? (
                    <CContainer gap={3} {...props}>
                      {data?.data?.map((tukarJadwal: any, i: number) => (
                        <TukarJadwalItem key={i} data={tukarJadwal} />
                      ))}

                      <Button
                        flexShrink={0}
                        colorScheme="ap"
                        variant={"ghost"}
                        className="clicky"
                      >
                        Tampilkan Lebih Banyak
                      </Button>
                    </CContainer>
                  ) : (
                    <NoData
                      minH={"300px"}
                      label="Tidak ada riwayat permintaan tukar jadwal"
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
