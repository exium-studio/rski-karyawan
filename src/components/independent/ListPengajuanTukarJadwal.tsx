import { Box, Button, StackProps, Text } from "@chakra-ui/react";
import { dummyPengajuanTukarJadwals } from "../../constant/dummy";
import useFilterCuti from "../../global/useFilterCuti";
import useDataState from "../../hooks/useDataState";
import Retry from "../dependent/Retry";
import TukarJadwalItem from "../dependent/TukarJadwalItem";
import AjukanTukarJadwal from "./AjukanTukarJadwal";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {}

export default function ListPengajuanTukarJadwal({ ...props }: Props) {
  const { filterCuti } = useFilterCuti();
  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyPengajuanTukarJadwals,
    url: "",
    dependencies: [filterCuti],
  });

  // SX

  return (
    <>
      <AjukanTukarJadwal />

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

          {!loading && !data && <NoData />}

          {!loading && data && (
            <>
              <CContainer gap={3} {...props}>
                {data.map((tukarJadwal, i) => (
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
            </>
          )}
        </>
      )}
    </>
  );
}
