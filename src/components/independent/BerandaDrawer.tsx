import { useContentBgColor } from "../../constant/colors";
import AktivitasAndaBeranda from "./AktivitasAndaBeranda";
import BerandaMenus from "./BerandaMenus";
import CContainer from "./wrapper/CContainer";

export default function BerandaDrawer() {
  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer
      id="berandaDrawer"
      mt={"520px"}
      zIndex={2}
      gap={6}
      p={5}
      bg={contentBgColor}
      borderRadius={"16px 16px 0 0"}
      maxH={"calc(100vh - 85px - 80px)"}
      mb={"85px"}
      className="noScroll"
      // overflowY={"auto"}
    >
      <BerandaMenus />
      <AktivitasAndaBeranda />
    </CContainer>
  );
}
