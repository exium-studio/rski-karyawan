import {
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "./DisclosureHeader";
import useBackOnClose from "../../hooks/useBackOnClose";
import CContainer from "../independent/wrapper/CContainer";
import { RiBook2Fill } from "@remixicon/react";
import formatDate from "../../lib/formatDate";

interface Props {
  data: any;
}

export default function MateriItem({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-materi-modal-${data.id}`, isOpen, onOpen, onClose);

  return (
    <>
      <CContainer
        flex={0}
        bg={"var(--divider)"}
        borderRadius={8}
        cursor={"pointer"}
        position={"relative"}
        overflow={"clip"}
        onClick={onOpen}
      >
        <HStack py={3} px={4}>
          <Text>{data?.judul}</Text>
        </HStack>

        <Center p={4} flexDir={"column"}>
          <Icon as={RiBook2Fill} fontSize={72} mb={2} />
          <Text textAlign={"center"} opacity={0.4}>
            Klik untuk lihat materi
          </Text>
        </Center>

        <HStack opacity={0.4} justify={"space-between"} py={3} px={4}>
          <Tooltip
            label={`Diunggah pada ${formatDate(data.created_at)}`}
            openDelay={500}
          >
            <Text fontSize={11}>{formatDate(data.created_at, "short")}</Text>
          </Tooltip>

          <Tooltip
            label={`Diperbarui pada ${formatDate(data.updated_at)}`}
            openDelay={500}
          >
            <Text fontSize={11} opacity={0.4}>
              {formatDate(data.updated_at, "short")}
            </Text>
          </Tooltip>
        </HStack>
      </CContainer>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Detail Materi"} />
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
