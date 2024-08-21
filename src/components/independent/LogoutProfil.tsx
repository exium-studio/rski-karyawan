import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useErrorAlphaColor } from "../../constant/colors";
import backOnClose from "../../lib/backOnClose";
import BackOnCloseButton from "./BackOnCloseButton";
import CustomDrawer from "./wrapper/CustomDrawer";
import logout from "../../lib/logout";
import req from "../../lib/req";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutProfil() {
  // SX
  const errorAlphaColor = useErrorAlphaColor();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    setLoading(true);

    req
      .post(`/api/logout`)
      .then((r) => {
        if (r.status === 200) {
          toast({
            status: "success",
            title: r.data.message,
            position: "top",
            isClosable: true,
          });
          logout();
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            e.response.data.message || "Maaf terjadi kesalahan pada sistem",
          position: "top",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button
        variant={"ghost"}
        colorScheme="red"
        className="clicky"
        bg={errorAlphaColor}
        mt={"auto"}
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
            <Text fontSize={16} fontWeight={600}>
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
          <Button
            onClick={backOnClose}
            w={"100%"}
            className="btn-solid clicky"
            isDisabled={loading}
          >
            Tidak
          </Button>

          <Button
            w={"100%"}
            className="clicky"
            colorScheme="red"
            onClick={handleLogout}
            isLoading={loading}
          >
            Ya
          </Button>
        </VStack>
      </CustomDrawer>
    </>
  );
}
