import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiCalendarCloseLine,
  RiInformationLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { useErrorAlphaColor } from "../../constant/colors";
import { Interface__User } from "../../constant/interfaces";
import { responsiveSpacing } from "../../constant/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {
  data: Interface__User;
}

const InfoModal = () => {
  // SX
  // const errorColor = useErrorColor();
  const errorAlphaColor = useErrorAlphaColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`info-modal`, isOpen, onOpen, onClose);

  return (
    <>
      <IconButton
        aria-label="info"
        icon={<Icon as={RiInformationLine} fontSize={24} />}
        borderRadius={"full"}
        className="btn clicky"
        ml={"auto"}
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Info"} />
          </ModalHeader>
          <ModalBody>
            <CContainer gap={responsiveSpacing}>
              <HStack gap={4}>
                <Center
                  w={"fit-content"}
                  p={3}
                  borderRadius={"full"}
                  bg={"var(--p500a5)"}
                >
                  <Icon as={RiLoginBoxLine} fontSize={52} color={"p.500"} />
                </Center>
                <CContainer gap={2}>
                  <Text fontWeight={500}>Presensi Masuk</Text>
                  <Text opacity={0.4} fontSize={12}>
                    Tombol ini digunakan untuk presensi masuk dan hanya muncul
                    jika Anda belum melakukan presensi hari ini.
                  </Text>
                </CContainer>
              </HStack>

              <HStack gap={4}>
                <Center
                  w={"fit-content"}
                  p={3}
                  borderRadius={"full"}
                  bg={errorAlphaColor}
                >
                  <Icon as={RiLogoutBoxLine} fontSize={52} color={"red.500"} />
                </Center>
                <CContainer gap={2}>
                  <Text fontWeight={500}>Presensi Keluar</Text>
                  <Text opacity={0.4} fontSize={12}>
                    Tombol ini muncul untuk presensi keluar setelah Anda
                    melakukan presensi masuk.
                  </Text>
                </CContainer>
              </HStack>

              <HStack gap={4}>
                <Center
                  w={"fit-content"}
                  p={3}
                  borderRadius={"full"}
                  bg={"var(--divider2)"}
                >
                  <Icon as={RiCalendarCloseLine} fontSize={52} />
                </Center>
                <CContainer gap={2}>
                  <Text fontWeight={500}>Tidak Ada Jadwal</Text>
                  <Text opacity={0.4} fontSize={12}>
                    Tombol ini muncul jika Anda tidak memiliki jadwal untuk hari
                    ini.
                  </Text>
                </CContainer>
              </HStack>
            </CContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={backOnClose}
            >
              Mengerti
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function MiniProfile({ data, ...props }: Props) {
  return (
    <HStack gap={3} w={"100%"} {...props}>
      <Avatar name={data?.nama} src={data?.foto_profil || ""} />
      <Box>
        <Text fontWeight={600} noOfLines={1}>
          {data?.nama}
        </Text>
        <Text fontSize={14} opacity={0.4}>
          {data?.unit_kerja?.[0]?.nama_unit}
        </Text>
      </Box>

      <InfoModal />
    </HStack>
  );
}
