import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import StatistikLembur from "../../../components/dependent/StatistikLembur";
import ListLembur from "../../../components/independent/ListLembur";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function Lembur() {
  useScrollToTop();

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
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

      <CContainer flex={1} p={5} pb={8} bg={contentBgColor}>
        <Text mx={1} fontWeight={600} mb={2}>
          Statistik Lembur
        </Text>

        <StatistikLembur />

        <Text fontWeight={600} mt={6} mb={2}>
          Riwayat
        </Text>

        <ListLembur />
      </CContainer>
    </CContainer>
  );
}
