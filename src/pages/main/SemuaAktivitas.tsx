import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../components/dependent/Header";
import FilterAktivitas from "../../components/independent/FilterAktivitas";
import ListAktivitas from "../../components/independent/ListAktivitas";
import CContainer from "../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../constant/colors";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

export default function SemuaAktivitas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`semua-aktivitas-modal`, isOpen, onOpen, onClose);

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <>
      <Text
        color={"p.500"}
        fontWeight={500}
        fontSize={"12px !important"}
        onClick={onOpen}
        cursor={"pointer"}
      >
        Semua Aktivitas
      </Text>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        size={"full"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent m={0} border={"none"}>
          <ModalHeader>
            <Header left={"back"} title={"Aktivitas"} />
          </ModalHeader>
          <ModalBody p={0}>
            <CContainer flex={1}>
              <Box
                position={"sticky"}
                top={"0"}
                bg={lightDarkColor}
                borderBottom={"1px solid var(--divider2) !important"}
                zIndex={2}
              >
                <FilterAktivitas />
              </Box>

              <CContainer flex={1} p={5} pb={8} bg={contentBgColor}>
                <ListAktivitas />
              </CContainer>
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
