import {
  Avatar,
  Center,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import Header from "../../../components/dependent/Header";
import JenisKaryawanBadge from "../../../components/dependent/JenisKaryawanBadge";
import Retry from "../../../components/dependent/Retry";
import LogoutProfil from "../../../components/independent/LogoutProfil";
import { ProfilColorModeSwitcher } from "../../../components/independent/ProfilColorModeSwitcher";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { Interface__User } from "../../../constant/interfaces";
import profilMenus from "../../../constant/profilMenus";
import { iconSize } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";
import formatDurationShort from "../../../lib/formatDurationShort";
import getUserData from "../../../lib/getUserData";

const ProfilStatus = () => {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-all-status-karyawan`,
    dependencies: [],
  });

  return (
    <CContainer gap={3}>
      {loading && (
        <>
          <Skeleton h={"86px"} mb={3} />
        </>
      )}
      {!loading && (
        <>
          {error && (
            <>
              <Center>
                <Retry loading={loading} retry={retry} />
              </Center>
            </>
          )}

          {!error && (
            <>
              <CContainer
                gap={3}
                mb={3}
                p={4}
                borderRadius={8}
                bg={lightDarkColor}
              >
                <HStack justify={"space-between"}>
                  <Text>Reward Presensi</Text>
                  <Popover>
                    <PopoverTrigger>
                      <HStack>
                        <Center>
                          {data.status_presensi ? (
                            <Icon
                              as={RiCheckboxCircleFill}
                              color={"green.400"}
                            />
                          ) : (
                            <Icon as={RiCloseCircleFill} color={"red.400"} />
                          )}
                        </Center>
                        <Text>Rp 300.000</Text>
                      </HStack>
                    </PopoverTrigger>
                    <PopoverContent mr={5}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        {data.status_presensi ? "" : "Tidak"} Mendapat Reward
                        Presensi
                      </PopoverHeader>
                      <PopoverBody opacity={0.4}>
                        Pertahankan status ini agar tetap hijau untuk mendapat
                        reward presensi. Reward presensi akan ditambahkan di
                        penggajian.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>
                <HStack justify={"space-between"}>
                  <Text>Masa Diklat</Text>
                  <HStack>
                    <Text>{formatDurationShort(data?.masa_diklat)}</Text>
                  </HStack>
                </HStack>
              </CContainer>
            </>
          )}
        </>
      )}
    </CContainer>
  );
};

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
          mb={3}
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

        <ProfilStatus />

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
