import {
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { RiBook2Fill } from "@remixicon/react";
import { useContentBgColor } from "../../constant/colors";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import CContainer from "../independent/wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import DokumenFileItem from "./DokumenFileItem";

interface Props {
  data: any;
}

export default function MateriItem({ data }: Props) {
  // SX
  const contentBgColor = useContentBgColor();

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
          <Text fontSize={12}>{data?.judul}</Text>
        </HStack>

        <Center p={4} flexDir={"column"}>
          <Icon as={RiBook2Fill} fontSize={52} mb={2} />
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
        </HStack>
      </CContainer>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader>
            <DisclosureHeader title={"Detail Materi"} />
          </ModalHeader>
          <ModalBody
            bg={contentBgColor}
            py={6}
            borderTop={"1px solid var(--divider2)"}
          >
            <SimpleGrid columns={1} gap={3}>
              {data?.dokumen_materi_1 && (
                <DokumenFileItem
                  title="Materi 1"
                  noOptions
                  data={data?.dokumen_materi_1}
                />
              )}
              {data?.dokumen_materi_2 && (
                <DokumenFileItem
                  title="Materi 2"
                  noOptions
                  data={data?.dokumen_materi_2}
                />
              )}
              {data?.dokumen_materi_3 && (
                <DokumenFileItem
                  title="Materi 3"
                  noOptions
                  data={data?.dokumen_materi_3}
                />
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
