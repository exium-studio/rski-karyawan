import ListPermintaanTukarJadwal from "../../../components/independent/ListPermintaanTukarJadwal";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";

export default function PermintaanTukarJadwal() {
  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer
      p={5}
      // pb={"calc(48px + 32px)"}
      bg={contentBgColor}
      minW={"100%"}
      scrollSnapAlign={"center"}
      h={"calc(100vh - 40px - 56px - 85px)"}
      overflowY={"auto"}
    >
      <ListPermintaanTukarJadwal />
    </CContainer>
  );
}
