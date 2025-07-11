import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

export default function AlertLocationPermission() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("alert_location_permission", isOpen, onOpen, onClose);

  const initialRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={backOnClose}
      isCentered
      size={"xs"}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent ref={initialRef}>
        <ModalCloseButton />
        <ModalBody pt={6}>
          <Image
            src="/vectors/location.png"
            boxSize={"250px"}
            objectFit={"contain"}
            mx={"auto"}
          />

          <Text textAlign={"center"} fontWeight={600}>
            Aktifkan Lokasi untuk Kehadiran Tanpa Hambatan
          </Text>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button
            onClick={backOnClose}
            colorScheme="ap"
            className="btn-ap clicky"
            w={"100%"}
          >
            Mengerti
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
