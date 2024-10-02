import {
  Button,
  Center,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { RiCheckLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import useRenderTrigger from "../../global/useRenderTrigger";

interface Props {
  isOpen: boolean;
}

export default function AlertPresensiSukses({ isOpen }: Props) {
  const { rt, setRt } = useRenderTrigger();

  return (
    <Modal isOpen={isOpen} onClose={() => null} isCentered size={"sm"}>
      <ModalOverlay />

      <ModalContent>
        <ModalBody pt={6}>
          <Center
            p={2}
            borderRadius={"full"}
            bg={"green.500"}
            w={"fit-content"}
            mx={"auto"}
            mb={8}
            mt={4}
          >
            <Icon as={RiCheckLine} fontSize={72} color={"white"} />
          </Center>

          <Text
            textAlign={"center"}
            fontWeight={600}
            fontSize={[22, null, 24]}
            mb={2}
            lineHeight={8}
          >
            Yeay! Kamu berhasil melakukan presensi.
          </Text>
          <Text textAlign={"center"} opacity={0.4} maxW={"300px"} mx={"auto"}>
            Untuk kamu, semangat bekerja yaa, semoga berkah
          </Text>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            w={"100%"}
            as={Link}
            to={"/beranda"}
            onClick={() => {
              setTimeout(() => {
                setRt(!rt);
              }, 100);
            }}
          >
            Beranda
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
