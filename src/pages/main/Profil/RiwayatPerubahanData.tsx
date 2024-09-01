import { Box } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import RiwayatPerubahanDataItem from "../../../components/dependent/RiwayatPerubahanDataItem";
import NoData from "../../../components/independent/NoData";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";

export default function RiwayatPerubahanData() {
  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-riwayat-perubahan`,
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Riwayat Perubahan Data"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5} gap={3} flex={1}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            {loading && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} h={"185px"} />
                ))}
              </>
            )}

            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && (
                  <NoData label="Tidak ada riwayat" />
                )}

                {(data || (data && data.length > 0)) &&
                  data.map((riwayat: any, i: number) => (
                    <RiwayatPerubahanDataItem key={i} data={riwayat} />
                  ))}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
