import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import useBackOnClose from "../../hooks/useBackOnClose";
import useMedicAlert from "../../hooks/useMedicAlert";
import backOnClose from "../../lib/backOnClose";
import { useEffect } from "react";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import monthDiff from "../../lib/monthDiff";
import CContainer from "../independent/wrapper/CContainer";

const SIPSTRAlert = () => {
  // Contexts
  const { isOpen, onOpen, onClose, data } = useMedicAlert();
  useBackOnClose(`alert-str-sip`, isOpen, onOpen, onClose);

  console.log(data);

  return (
    <Modal isOpen={isOpen} onClose={backOnClose} isCentered size={"sm"}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalBody pt={6}>
          <Image
            src="/vectors/alert.webp"
            boxSize={"250px"}
            objectFit={"contain"}
            mx={"auto"}
          />

          <Text
            textAlign={"center"}
            fontWeight={600}
            fontSize={[22, null, 24]}
            mb={5}
            lineHeight={8}
            maxW={"300px"}
            mx={"auto"}
          >
            Peringatan masa berlaku STR & SIP
          </Text>

          <CContainer gap={2}>
            {data?.masa_str && (
              <VStack gap={1}>
                <Text textAlign={"center"} opacity={0.4}>
                  Masa berakhir STR :
                </Text>
                <HStack justify={"center"}>
                  <Text textAlign={"center"}>{formatDate(data?.masa_str)}</Text>
                  <Text textAlign={"center"} color={"red.400"}>
                    ({formatNumber(monthDiff(new Date(), data?.masa_str))} bulan
                    lagi)
                  </Text>
                </HStack>
              </VStack>
            )}

            {data?.masa_sip && (
              <VStack gap={1}>
                <Text textAlign={"center"} opacity={0.4}>
                  Masa berakhir SIP :
                </Text>
                <HStack justify={"center"}>
                  <Text textAlign={"center"}>{formatDate(data?.masa_sip)}</Text>
                  <Text textAlign={"center"} color={"red.400"}>
                    ({formatNumber(monthDiff(new Date(), data?.masa_sip))} bulan
                    lagi)
                  </Text>
                </HStack>
              </VStack>
            )}
          </CContainer>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button
            // colorScheme="ap"
            className="btn-solid clicky"
            w={"100%"}
            onClick={backOnClose}
            // as={Link}
            // to={""}
          >
            Mengerti
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SIPSTRAlert;
