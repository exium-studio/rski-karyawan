import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import StatistikCuti from "../../../components/dependent/StatistikCuti";
import AjukanCuti from "../../../components/independent/AjukanCuti";
import FilterCuti from "../../../components/independent/FilterCuti";
import ListCuti from "../../../components/independent/ListCuti";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function Cuti() {
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
        <Header left={"back"} title="Cuti" px={4} />

        <FilterCuti />
      </Box>

      <CContainer flex={1} p={5} pb={"calc(92px)"} bg={contentBgColor}>
        <Text mx={1} fontWeight={600} mb={2}>
          Kuota Cuti
        </Text>

        <StatistikCuti />

        <Text mx={1} fontWeight={600} mt={5} mb={2}>
          Riwayat
        </Text>

        <ListCuti />
      </CContainer>

      <AjukanCuti />
    </CContainer>
  );
}
