import { Box } from "@chakra-ui/react";
import Header from "../../components/dependent/Header";
import FilterAktivitas from "../../components/independent/FilterAktivitas";
import ListAktivitas from "../../components/independent/ListAktivitas";
import CContainer from "../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../constant/colors";

export default function Aktivitas() {
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
        <Header left={"back"} title={"Aktivitas"} />

        <FilterAktivitas />
      </Box>

      <CContainer p={5} pb={8} bg={contentBgColor}>
        <ListAktivitas />
      </CContainer>
    </CContainer>
  );
}
