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
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function AlertOutsidePresenceRadius({
  isOpen,
  onOpen,
  onClose,
}: Props) {
  useBackOnClose("alert-outside-presence-radius", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={backOnClose}
      isCentered
      size={"sm"}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent ref={initialRef}>
        <ModalCloseButton />
        <ModalBody pt={6}>
          <Image
            src="/vectors/outsideRadius.png"
            boxSize={"250px"}
            objectFit={"contain"}
            mx={"auto"}
          />

          <Text
            textAlign={"center"}
            fontWeight={600}
            fontSize={[22, null, 24]}
            mb={2}
            lineHeight={8}
          >
            Anda berada di luar area kehadiran
          </Text>
          <Text textAlign={"center"} opacity={0.4} maxW={"300px"} mx={"auto"}>
            Maaf, sepertinya Anda berada di luar area absen. Untuk melanjutkan,
            silakan lakukan dengan izin.
          </Text>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            w={"100%"}
            as={Link}
            to={""}
          >
            Izin Sekarang
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
