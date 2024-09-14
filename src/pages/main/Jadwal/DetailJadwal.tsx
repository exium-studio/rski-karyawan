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
import JadwalItem from "../../../components/dependent/JadwalItem";
import useScrollToTop from "../../../hooks/useScrollToTop";

import Header from "../../../components/dependent/Header";
import ListDetailJadwalSaya from "../../../components/dependent/ListDetailJadwalSaya";
import ListKaryawanByJadwal from "../../../components/dependent/ListKaryawanByJadwal";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import { Interface__Jadwal } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import getUserData from "../../../lib/getUserData";

interface Props extends StackProps {
  jadwal: Interface__Jadwal;
  listJadwal: Interface__Jadwal[];
  index: number;
}

export default function DetailJadwal({
  jadwal,
  listJadwal,
  index,
  ...props
}: Props) {
  useScrollToTop();
  const user = getUserData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-jadwal-${jadwal.id}`, isOpen, onOpen, onClose);

  const [activeJadwal, setActiveJadwal] = useState<Interface__Jadwal>(jadwal);
  useEffect(() => {
    if (isOpen) {
      if (jadwal) {
        setActiveJadwal(jadwal);
      }
    }
  }, [jadwal, index, isOpen]);

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <>
      <JadwalItem data={jadwal} h={"114px"} onClick={onOpen} />

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
            <Header
              left={"back"}
              title="Detail Jadwal"
              borderBottom={"1px solid var(--divider2)"}
            />
          </ModalHeader>
          <ModalBody px={0}>
            <CContainer flex={1} bg={contentBgColor} py={6}>
              <ListDetailJadwalSaya
                data={listJadwal}
                setActiveJadwal={setActiveJadwal}
                index={index}
              />

              <Text fontWeight={600} px={6} mt={6} mb={4}>
                Karyawan {user.unit_kerja?.[0]?.nama_unit || "Unit Kerja"}
              </Text>

              <ListKaryawanByJadwal jadwal_id={activeJadwal.id} px={5} />
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
