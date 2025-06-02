import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  StackProps,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCloseLine,
  RiInformationLine,
} from "@remixicon/react";
import { useErrorAlphaColor } from "../../constant/colors";
import { Interface__User } from "../../constant/interfaces";
import { responsiveSpacing } from "../../constant/sizes";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

interface Props extends StackProps {
  data: Interface__User;
}

const InfoPresensi = () => {
  // SX
  // const errorColor = useErrorColor();
  const errorAlphaColor = useErrorAlphaColor();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="info"
        icon={<Icon as={RiInformationLine} fontSize={24} />}
        borderRadius={"full"}
        className="clicky"
        colorScheme="whiteAlpha"
        _hover={{ bg: useColorModeValue("whiteAlpha.200", "whiteAlpha.100") }}
        variant={"ghost"}
        ml={"auto"}
        mb={"auto"}
        color={"white"}
        onClick={onOpen}
      />

      <CustomDrawer
        id="info-modal"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Info Aktivitas Presensi" />}
        footer={
          <Button w={"100%"} className="btn-solid clicky" onClick={backOnClose}>
            Mengerti
          </Button>
        }
      >
        <CContainer px={6} gap={responsiveSpacing}>
          <HStack gap={4}>
            <Center
              bg={"white"}
              borderRadius={16}
              p={2}
              border={"1px solid var(--divider3)"}
              // boxShadow={"md"}
            >
              <Center
                w={"fit-content"}
                p={3}
                borderRadius={"full"}
                bg={"var(--p500a5)"}
              >
                <Icon as={RiArrowUpLine} fontSize={52} color={"p.500"} />
              </Center>
            </Center>
            <CContainer gap={2}>
              <Text fontWeight={500}>Presensi Masuk</Text>
              <Text opacity={0.4} fontSize={12}>
                Tombol ini digunakan untuk presensi masuk, muncul jika Anda
                belum melakukan presensi hari ini.
              </Text>
            </CContainer>
          </HStack>

          <HStack gap={4}>
            <Center
              bg={"white"}
              borderRadius={16}
              p={2}
              border={"1px solid var(--divider3)"}
              // boxShadow={"md"}
            >
              <Center
                w={"fit-content"}
                p={3}
                borderRadius={"full"}
                bg={errorAlphaColor}
              >
                <Icon as={RiArrowDownLine} fontSize={52} color={"red.500"} />
              </Center>
            </Center>
            <CContainer gap={2}>
              <Text fontWeight={500}>Presensi Keluar</Text>
              <Text opacity={0.4} fontSize={12}>
                Tombol ini digunakan untuk presensi keluar, muncul jika Anda
                sudah melakukan presensi masuk.
              </Text>
            </CContainer>
          </HStack>

          <HStack gap={4}>
            <Center
              bg={"white"}
              borderRadius={16}
              p={2}
              border={"1px solid var(--divider3)"}
              // boxShadow={"md"}
            >
              <Center
                w={"fit-content"}
                p={3}
                borderRadius={"full"}
                bg={"var(--divider)"}
              >
                <Icon as={RiCloseLine} fontSize={52} color={"dark"} />
              </Center>
            </Center>
            <CContainer gap={2}>
              <Text fontWeight={500}>Tidak Boleh Presensi</Text>
              <Text opacity={0.4} fontSize={12}>
                Tombol ini akan muncul jika Anda tidak memiliki jadwal hari ini
                atau belum memasuki waktu presensi.
              </Text>
            </CContainer>
          </HStack>
        </CContainer>
      </CustomDrawer>
    </>
  );
};

export default function MiniProfile({ data, ...props }: Props) {
  return (
    <HStack gap={3} w={"100%"} {...props}>
      <Avatar name={data?.nama} src={data?.fotoprofil?.path || ""} />
      <Box>
        <Text fontWeight={600} noOfLines={1}>
          {data?.nama}
        </Text>
        <Text fontSize={14} opacity={0.6} noOfLines={1}>
          {data?.unit_kerja?.[0]?.nama_unit}
        </Text>
      </Box>

      <InfoPresensi />
    </HStack>
  );
}
