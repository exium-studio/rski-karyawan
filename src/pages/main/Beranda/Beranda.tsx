import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import {
  RiMoonClearLine,
  RiSunCloudyLine,
  RiSunFoggyLine,
  RiSunLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import AktivitasAndaBeranda from "../../../components/independent/AktivitasAndaBeranda";
import AttendanceBeranda from "../../../components/independent/AttendanceBeranda";
import BerandaMenus from "../../../components/independent/BerandaMenus";
import DigitalClock from "../../../components/independent/DigitalClock";
import MiniProfile from "../../../components/independent/MiniProfile";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import useScrollToTop from "../../../hooks/useScrollToTop";
import formatDate from "../../../lib/formatDate";
import getUserDataCookie from "../../../lib/getUserData";
import timeIs from "../../../lib/timeIs";
import PengumumanBeranda from "../../../components/independent/PengumumanBeranda";

export default function Beranda() {
  useScrollToTop();

  const user = getUserDataCookie();

  const today = new Date();
  const todayDate = formatDate(today.toString());
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottomOfWindow =
        window.scrollY + window.innerHeight ===
        document.documentElement.scrollHeight;
      if (bottomOfWindow) {
        setIsScrollToBottom(true);
      } else {
        setIsScrollToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // SX
  const contentBgColor = useContentBgColor();
  const attendancePanelBg = useColorModeValue("p.500", "#191919");

  return (
    <CContainer
      overflowY={"auto"}
      className="noScroll"
      h={"100vh"}
      bg={attendancePanelBg}
      flex={0}
      maxH={"calc(100vh - 85px)"}
    >
      <CContainer
        minH={"520px"}
        position={"fixed"}
        top={0}
        left={"50%"}
        transform={"translateX(-50%)"}
        maxW={"720px"}
      >
        <HStack p={4} justify={"space-between"} color={"white"} zIndex={2}>
          <MiniProfile data={user} />
        </HStack>

        <CContainer color={"white"} px={5} pb={2}>
          <CContainer align={"center"} zIndex={2} justify={"center"} mb={5}>
            <DigitalClock fontSize={32} lineHeight={1.2} />

            <Text>{todayDate}</Text>

            <AttendanceBeranda />
          </CContainer>

          <Icon
            as={
              timeIs() === "morning"
                ? RiSunFoggyLine
                : timeIs() === "noon"
                ? RiSunLine
                : timeIs() === "evening"
                ? RiSunCloudyLine
                : RiMoonClearLine
            }
            fontSize={400}
            position={"absolute"}
            left={"-100px"}
            bottom={"-100px"}
            zIndex={1}
            opacity={useColorModeValue(0.05, 0.02)}
          />
        </CContainer>
      </CContainer>

      <CContainer
        id="berandaDrawer"
        mt={"520px"}
        zIndex={2}
        gap={5}
        pt={0}
        bg={contentBgColor}
        borderRadius={"16px 16px 0 0"}
        minH={"calc(100vh - 80px)"}
        pb={"95px"}
        overflowY={isScrollToBottom ? "auto" : "clip"}
      >
        <BerandaMenus />

        <PengumumanBeranda />

        <AktivitasAndaBeranda />
      </CContainer>
    </CContainer>
  );
}
