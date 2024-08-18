import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import backOnClose from "../../lib/backOnClose";
import BackOnCloseButton from "./BackOnCloseButton";
import CustomDrawer from "./wrapper/CustomDrawer";

export default function LogoutProfil() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        // variant={"outline"}
        // colorScheme="red"
        className="btn-clear clicky"
        bg={"var(--reda) !important"}
        _hover={{ bg: "var(--reda) !important" }}
        _active={{ bg: "var(--reda) !important" }}
        mt={"auto"}
        color={"red.400"}
        onClick={onOpen}
        size={"lg"}
      >
        Keluar
      </Button>

      <CustomDrawer
        id="log-out-confirmation"
        name="logout"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Box pt={"18px"} pr={5} pb={5} pl={6}>
          <HStack justify={"space-between"}>
            <Text fontSize={20} fontWeight={600}>
              Keluar
            </Text>
            <BackOnCloseButton aria-label="back on close button" />
          </HStack>
        </Box>

        <Box px={6} overflowY={"auto"} className="scrollY">
          <Text>
            Apakah anda yakin akan logout dan harus login kembali saat
            menggunakan aplikasi?
          </Text>
        </Box>

        <VStack p={6} pb={8}>
          <Button onClick={backOnClose} w={"100%"} className="btn-solid clicky">
            Tidak
          </Button>
          <Button
            w={"100%"}
            className="clicky"
            colorScheme="red"
            onClick={() => {
              backOnClose();
            }}
          >
            Yakin
          </Button>
        </VStack>
      </CustomDrawer>
    </>
  );
}
