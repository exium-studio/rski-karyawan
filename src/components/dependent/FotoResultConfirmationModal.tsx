import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import CContainer from "../independent/wrapper/CContainer";

interface Props {
  imageSrc: string;
}

export default function FotoResultConfirmationModal({ imageSrc }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("foto_checkin_confirmation_modal", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={backOnClose}
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent ref={initialRef} border={"none"}>
        <ModalCloseButton />

        <ModalHeader>Konfirmasi Foto</ModalHeader>

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
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Konfirmasi
            </Button>
          </CContainer>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
