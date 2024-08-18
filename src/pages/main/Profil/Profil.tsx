import { Avatar, Badge, HStack, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import Header from "../../../components/dependent/Header";
import LogoutProfil from "../../../components/independent/LogoutProfil";
import { ProfilColorModeSwitcher } from "../../../components/independent/ProfilColorModeSwitcher";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { Interface__User } from "../../../constant/interfaces";
import profilMenus from "../../../constant/profilMenus";
import { iconSize } from "../../../constant/sizes";

export default function Profil() {
  const user: Interface__User = JSON.parse(getCookie("userData") as string);

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header
        title="Profil"
        borderBottom={"1px solid var(--divider"}
        // right={<NotificationButton aria-label="Notification" />}
      />

      <CContainer bg={contentBgColor} p={5}>
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
            <Avatar name={user.nama} src={user.foto_profil || ""} />
            <CContainer justify={"center"}>
              <Text fontSize={14} fontWeight={500} mb={"2px"}>
                {user.nama}
              </Text>
              <Text fontSize={12} opacity={0.4}>
                {user.unit_kerja?.nama_unit}
              </Text>
            </CContainer>
          </HStack>

          <Badge
            borderRadius={"8px 0 0 0"}
            colorScheme="green"
            size={"sm"}
            textAlign={"center"}
            position={"absolute"}
            bottom={0}
            right={0}
          >
            Best Employee
          </Badge>
        </HStack>

        {profilMenus.map((menu, i) => (
          <CContainer key={i} gap={3} flex={0} mb={3}>
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
