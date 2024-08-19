import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import StatistikCuti from "../../../components/dependent/StatistikCuti";
import AjukanCuti from "../../../components/independent/AjukanCuti";
import FilterCuti from "../../../components/independent/FilterCuti";
import ListCuti from "../../../components/independent/ListCuti";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { dummyCutis } from "../../../constant/dummy";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";
import NoData from "../../../components/independent/NoData";

export default function Cuti() {
  useScrollToTop();

  const dummy = {
    statistik: [
      {
        nama: "Cuti Tahunan",
        terpakai: 4,
        kuota: 12, // kuota pertahun
        is_need_requirement: false,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti di Luar Tanggungan",
        terpakai: 5,
        kuota: 30, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti Besar",
        terpakai: 7,
        kuota: 12, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti Kelahiran",
        terpakai: 0,
        kuota: 90, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti Sakit",
        terpakai: 2,
        kuota: null, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti Nikah",
        terpakai: 0,
        kuota: null, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
      {
        nama: "Cuti Kematian",
        terpakai: 1,
        kuota: null, // kuota pertahun
        is_need_requirement: true,
        keterangan:
          "Keterangan entitas cuti, berupa deskripsi cuti, diperuntukan untuk apa, dan dapat disertakan syarat - syarat cuti disini, dapat diedit ",
      },
    ],
    riwayat: dummyCutis,
  };

  const { error, loading, data, retry } = useDataState<any>({
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
        <Header left={"back"} title="Cuti" px={4} />

        <FilterCuti />
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
                  Statistik Cuti
                </Text>

                <StatistikCuti  />

                <Text mx={1} fontWeight={600} mt={5} mb={2}>
                  Riwayat
                </Text>

                <ListCuti loading={loading} data={data.riwayat} />
              </>
            )}
          </>
        )}
      </CContainer>

      <AjukanCuti />
    </CContainer>
  );
}
