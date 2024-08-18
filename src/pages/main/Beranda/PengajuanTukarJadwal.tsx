import ListPengajuanTukarJadwal from "../../../components/independent/ListPengajuanTukarJadwal";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";

export default function PengajuanTukarJadwal() {
  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer
      p={5}
      bg={contentBgColor}
      minW={"100%"}
      scrollSnapAlign={"center"}
      h={"calc(100vh - 40px - 56px - 85px)"}
      overflowY={"auto"}
    >
      <ListPengajuanTukarJadwal />
    </CContainer>
  );
}
