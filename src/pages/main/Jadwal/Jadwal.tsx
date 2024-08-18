import { Alert, Box, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import { useState } from "react";
import getCurrentWeeksDateRange from "../../../lib/getCurrentWeeksDateRange";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import CContainer from "../../../components/independent/wrapper/CContainer";
import DateRangePickerDrawer from "../../../components/dependent/input/DateRangePickerDrawer";
import ListJadwalSaya from "../../../components/dependent/ListJadwalSaya";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function Jadwal() {
  useScrollToTop();

  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(getCurrentWeeksDateRange());

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
        <Header title={"Jadwal"} />

        <DateRangePickerDrawer
          id="jadwal_daterange_picker_drawer"
          name="jadwal_daterange"
          onConfirm={(inputValue) => {
            setDateRange(inputValue);
          }}
          inputValue={dateRange}
          maxRange={31}
          nonNullable
          border={"none"}
          borderRadius={0}
          px={"20px !important"}
          fontWeight={600}
          _focus={{ border: "none" }}
        />
      </Box>

      <CContainer p={5} bg={contentBgColor}>
        <Alert status="info" p={4} borderRadius={8} mb={3}>
          <Text fontSize={14}>
            Sekadar pengingat: HRD memperbarui jadwal kerja Anda setiap Minggu.
            Selalu perhatikan perubahan terbaru!!!
          </Text>
        </Alert>

        {dateRange && <ListJadwalSaya dateRange={dateRange} />}
      </CContainer>
    </CContainer>
  );
}
