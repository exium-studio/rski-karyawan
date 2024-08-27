import { Avatar, HStack, Icon, Text } from "@chakra-ui/react";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import Header from "../../../components/dependent/Header";
import JenisKaryawanBadge from "../../../components/dependent/JenisKaryawanBadge";
import LogoutProfil from "../../../components/independent/LogoutProfil";
import { ProfilColorModeSwitcher } from "../../../components/independent/ProfilColorModeSwitcher";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { Interface__User } from "../../../constant/interfaces";
import profilMenus from "../../../constant/profilMenus";
import { iconSize } from "../../../constant/sizes";
import getUserData from "../../../lib/getUserData";

export default function Profil() {
  const user: Interface__User = getUserData();

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
      <Header
        title="Profil"
        borderBottom={"1px solid var(--divider2)"}
        // right={<NotificationButton aria-label="Notification" />}
      />

      <CContainer flex={1} bg={contentBgColor} p={5}>
        <HStack
          borderRadius={12}
          bg={useLightDarkColor()}
          align={"stretch"}
          gap={4}
          mb={6}
          overflow={"clip"}
          position={"relative"}
        >
          <HStack p={4} gap={3}>
            <Avatar name={user?.nama} src={user?.foto_profil || ""} />
            <CContainer justify={"center"}>
              <Text fontSize={14} fontWeight={500} mb={"2px"}>
                {user.nama}
              </Text>
              <Text fontSize={12} opacity={0.4} noOfLines={1}>
                {user.unit_kerja?.[0]?.nama_unit}
              </Text>
            </CContainer>
          </HStack>

          <JenisKaryawanBadge
            mt={"auto"}
            ml={"auto"}
            borderRadius={"10px 0 10px 0"}
            w={"100px"}
            h={"fit-content"}
            data={user?.unit_kerja?.[0]?.jenis_karyawan}
          />
        </HStack>

        <CContainer gap={3} mb={3}>
          <Text opacity={0.4}>Status</Text>
          <HStack
            px={4}
            h={"48px"}
            bg={lightDarkColor}
            borderRadius={8}
            cursor={"pointer"}
            justify={"space-between"}
            border={"1px solid"}
            borderColor={"green.400"}
            // className="clicky"
          >
            <Text color={"green.400"}>Reward Presensi</Text>
            <HStack>
              <Text>Rp 300.000</Text>
              <Icon as={RiCheckboxCircleFill} color={"green.400"} />
              {/* <Icon as={RiCloseCircleFill} color={"red.400"} /> */}
            </HStack>
          </HStack>
        </CContainer>

        {profilMenus.map((menu, i) => (
          <CContainer key={i} gap={3} mb={3}>
            <Text opacity={0.4}>{menu.title}</Text>
            {menu.items.map((item, ii) => (
              <HStack
                key={ii}
                px={4}
                h={"48px"}
                bg={lightDarkColor}
                borderRadius={8}
                cursor={"pointer"}
                className="clicky"
                _active={{ opacity: 0.6 }}
                as={Link}
                to={item.link}
              >
                <Icon as={item.icon} fontSize={iconSize} />
                <Text>{item.label}</Text>
              </HStack>
            ))}
          </CContainer>
        ))}

        <ProfilColorModeSwitcher />

        <LogoutProfil />
      </CContainer>
    </CContainer>
  );
}
