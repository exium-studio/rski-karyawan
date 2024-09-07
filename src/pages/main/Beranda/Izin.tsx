import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import AjukanCuti from "../../../components/independent/AjukanCuti";
import FilterIzin from "../../../components/independent/FilterIzin";
import ListIzin from "../../../components/independent/ListIzin";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function Izin() {
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
        <Header left={"back"} title="Izin" px={4} />

        <FilterIzin />
      </Box>

      <CContainer flex={1} p={5} pb={"calc(92px)"} bg={contentBgColor}>
        <Text mx={1} fontWeight={600} mb={2}>
          Riwayat
        </Text>

        <ListIzin />
      </CContainer>

      <AjukanCuti />
    </CContainer>
  );
}
