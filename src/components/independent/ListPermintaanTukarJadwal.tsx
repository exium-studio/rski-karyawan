import { Box, Center, StackProps, Text } from "@chakra-ui/react";
import useFilterTukarJadwal from "../../global/useFilterTukarJadwal";
import useDataState from "../../hooks/useDataState";
import Retry from "../dependent/Retry";
import TukarJadwalItem from "../dependent/TukarJadwalItem";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {
  index: number;
  tabIndex: number;
}

export default function ListPermintaanTukarJadwal({
  index,
  tabIndex,
  ...props
}: Props) {
  const { filterTukarJadwal } = useFilterTukarJadwal();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-permintaan-swap`,
    payload: {
      ...(filterTukarJadwal?.date_range && {
        tgl_mulai: filterTukarJadwal.date_range.from,
      }),
      ...(filterTukarJadwal?.date_range && {
        tgl_selesai: filterTukarJadwal.date_range.to,
      }),
      ...(filterTukarJadwal?.kategori_tukar_jadwal?.length > 0 && {
        jenis: filterTukarJadwal.kategori_tukar_jadwal.map(
          (sp: any) => sp.value
        ),
      }),
      ...(filterTukarJadwal?.status_penukaran?.length > 0 && {
        status: filterTukarJadwal.status_penukaran.map((sp: any) => sp.value),
      }),
      offset: 6,
    },
    conditions: tabIndex === index,
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

                      {/* <Button
                        flexShrink={0}
                        colorScheme="ap"
                        variant={"ghost"}
                        className="clicky"
                      >
                        Tampilkan Lebih Banyak
                      </Button> */}
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
