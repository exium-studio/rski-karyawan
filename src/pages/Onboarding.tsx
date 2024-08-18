import { Box, Button, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalSliderIndicator from "../components/dependent/HorizontalSliderIndicator";
import Container from "../components/independent/wrapper/Container";

export default function Onboarding() {
  const navigate = useNavigate();

  const images = ["welcome.webp", "ideas.webp", "development.webp"];
  const titles = [
    "Selamat Datang di Aplikasi Presensi Rumah Sakit Kasih Ibu!",
    "Desain dan peningkatan fitur yang mulus",
    "Semua tugas karyawan dalam satu aplikasi!",
  ];
  const narratives = [
    "Kami sangat senang Anda bergabung dengan tim kami. Aplikasi ini dirancang untuk memudahkan Anda dalam melakukan presensi dan mengelola waktu kerja Anda di Rumah Sakit Kasih Ibu.",
    "Sederhanakan proses SDM Anda dan tingkatkan alur kerja Anda dengan fitur intuitif kami yang dirancang untuk fleksibilitas tertinggi",
    "Siap untuk produktivitas puncak? Mari selami dan tingkatkan efisiensi Anda!",
  ];

  const [active, setActive] = useState(0);
  function handleNext() {
    if (active < 2) {
      setActive(active + 1);
    } else {
      navigate("/login");
    }
  }
  function handleLewati() {
    localStorage.setItem("firsttime", "pass");
    navigate("/login");
  }

  useEffect(() => {
    if (active === 2) {
      localStorage.setItem("firsttime", "pass");
    }
  }, [active]);

  // SX

  return (
    <Container p={4}>
      <HStack ml={"auto"} onClick={handleLewati}>
        <Text>Lewati</Text>
        <Icon as={RiArrowRightSLine} fontSize={20} />
      </HStack>

      <Box maxW={"400px"} mx={"auto"} my={16}>
        <Image src={`/vectors/${images[active]}`} w={"100%"} />
      </Box>

      <Box px={2}>
        <Text fontSize={22} fontWeight={600} lineHeight={1.4} mb={4}>
          {titles[active]}
        </Text>
        <Text mb={12}>{narratives[active]}</Text>
      </Box>

      <HStack justify={"space-between"} mt={"auto"}>
        <HorizontalSliderIndicator length={3} active={active + 1} />

        <Button className="btn-ap clicky" colorScheme="ap" onClick={handleNext}>
          {active === 2 ? "Masuk" : "Selanjutnya"}
        </Button>
      </HStack>
    </Container>
  );
}
