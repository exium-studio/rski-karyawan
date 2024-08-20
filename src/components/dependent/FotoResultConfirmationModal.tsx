import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import CContainer from "../independent/wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import req from "../../lib/req";

interface Props {
  attendanceData: any;
  imageSrc: string;
  takePhoto: any;
}

export default function FotoResultConfirmationModal({
  attendanceData,
  imageSrc,
  takePhoto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("foto_checkin_confirmation_modal", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  function presensi() {
    setLoading(true);

    const aktivitasPresensi = attendanceData.aktivitas;

    let url = ``;
    if (aktivitasPresensi) {
      url = `/api/check-in-presensi`;
    } else {
      url = "";
    }

    req
      .post(url)
      .then((r) => {
        if (r.status === 200) {
          backOnClose();
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            e.response.data.message || "Maaf terjadi kesalahan pada sistem",
          position: "bottom-right",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Center p={1} borderRadius={"full"} border={"1px solid white"}>
        <Center
          w={"50px"}
          h={"50px"}
          borderRadius={"full"}
          bg={"white"}
          cursor={"pointer"}
          className="clicky"
          onClick={takePhoto}
        ></Center>
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />

        <ModalContent ref={initialRef} border={"none"}>
          <ModalHeader>
            <DisclosureHeader title="Konfirmasi Foto" />
          </ModalHeader>

          <ModalBody p={0}>
            <Image src={imageSrc} borderRadius={"0 !important"} />
          </ModalBody>

          <ModalFooter>
            <CContainer w={"100%"} gap={2}>
              <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={backOnClose}
              >
                Ambil Ulang
              </Button>
              <Button
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
                onClick={presensi}
              >
                Konfirmasi
              </Button>
            </CContainer>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
