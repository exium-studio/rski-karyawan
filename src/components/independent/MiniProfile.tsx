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
  RiInformationLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { useErrorAlphaColor } from "../../constant/colors";
import { Interface__User } from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";

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
            <HStack>
              <Center
                w={"fit-content"}
                p={1}
                borderRadius={"full"}
                bg={"var(--p500a5)"}
              >
                <Icon as={RiLoginBoxLine} fontSize={iconSize} color={"p.500"} />
              </Center>
              <Text>Presensi Masuk</Text>
            </HStack>

            <HStack>
              <Center
                w={"fit-content"}
                p={1}
                borderRadius={"full"}
                bg={errorAlphaColor}
              >
                <Icon
                  as={RiLogoutBoxLine}
                  fontSize={iconSize}
                  color={"red.500"}
                />
              </Center>
              <Text>Presensi Keluar</Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} className="btn-solid clicky">
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
