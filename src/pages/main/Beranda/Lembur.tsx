import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import StatistikLembur from "../../../components/dependent/StatistikLembur";
import ListLembur from "../../../components/independent/ListLembur";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useDataState from "../../../hooks/useDataState";
import { dummyLemburs } from "../../../constant/dummy";
import {
  Interface__Lembur,
  Interface__StatistikLembur,
} from "../../../constant/interfaces";
import Retry from "../../../components/dependent/Retry";
import NoData from "../../../components/independent/NoData";

export default function Lembur() {
  useScrollToTop();

  const dummy = {
    statistik: {
      total_waktu: 4560,
      total_lembur: 4,
    },
    riwayat: dummyLemburs,
  };

  const { error, loading, data, retry } = useDataState<{
    statistik: Interface__StatistikLembur;
    riwayat: Interface__Lembur[];
  }>({
    initialData: dummy,
    url: "",
  });

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Box
        position={"sticky"}
        top={"0"}
        bg={lightDarkColor}
        borderBottom={"1px solid var(--divider2) !important"}
        zIndex={2}
      >
        <Header left={"back"} title="Lembur" px={4} />

        {/* <FilterCuti /> */}
      </Box>

      <CContainer p={5} pb={8} bg={contentBgColor}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            {!data && <NoData />}

            {data && (
              <>
                <Text mx={1} fontWeight={600} mb={2}>
                  Statistik Lembur
                </Text>

                <StatistikLembur loading={loading} data={data?.statistik} />

                <Text fontWeight={600} mt={6} mb={2}>
                  Riwayat
                </Text>

                <ListLembur loading={loading} data={data?.riwayat} />
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
