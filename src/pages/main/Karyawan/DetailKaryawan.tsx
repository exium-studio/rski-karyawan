import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../../components/dependent/Header";
import KaryawanItem from "../../../components/dependent/KaryawanItem";
import ListDetailKaryawan from "../../../components/dependent/ListDetailKaryawan";
import ListJadwalKaryawan from "../../../components/dependent/ListJadwalKaryawan";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import { Interface__Karyawan } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useScrollToTop from "../../../hooks/useScrollToTop";
import backOnClose from "../../../lib/backOnClose";
import getUserData from "../../../lib/getUserData";

interface Props extends StackProps {
  karyawan: Interface__Karyawan;
  listKaryawan?: Interface__Karyawan[];
  index: number;
}

export default function DetailKaryawan({
  karyawan,
  listKaryawan,
  index,
}: Props) {
  useScrollToTop();
  const user = getUserData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    `detail-karyawan-${karyawan.user.id}`,
    isOpen,
    onOpen,
    onClose
  );

  const [activeKaryawan, setActiveKaryawan] =
    useState<Interface__Karyawan>(karyawan);
  useEffect(() => {
    if (isOpen) {
      if (karyawan) {
        setActiveKaryawan(karyawan);
      }
    }
  }, [karyawan, index, isOpen]);

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <>
      <KaryawanItem data={karyawan} onClick={onOpen} />

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        scrollBehavior="inside"
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent m={0} border={"none"}>
          <ModalHeader>
            <ModalHeader>
              <Header
                left={"back"}
                title={`Jadwal Karyawan ${user?.unit_kerja?.[0]?.nama_unit}`}
                borderBottom={"1px solid var(--divider2)"}
              />
            </ModalHeader>
          </ModalHeader>
          <ModalBody px={0}>
            <CContainer flex={1} bg={contentBgColor} py={6}>
              <ListDetailKaryawan
                data={listKaryawan}
                setActiveKaryawan={setActiveKaryawan}
                index={index}
              />

              <Text fontWeight={600} px={6} mt={6} mb={4}>
                Jadwal Minggu Ini
              </Text>

              <ListJadwalKaryawan user_id={activeKaryawan.user.id} px={5} />
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
