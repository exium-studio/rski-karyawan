import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import LoginForm from "../components/form/LoginForm";
import CContainer from "../components/independent/wrapper/CContainer";
import Container from "../components/independent/wrapper/Container";
import useRenderTrigger from "../global/useRenderTrigger";
import getAuthToken from "../lib/getAuthToken";
import getUserData from "../lib/getUserData";
import req from "../lib/req";

export default function Login() {
  // SX

  const authToken = getAuthToken();
  const user = getUserData();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  function handleRelogin() {
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
          localStorage.removeItem("__auth_token");
          localStorage.removeItem("__user_data");
          setRt(!rt);
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            e.response.data.message ||
            "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
          position: "top",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
        setRt(!rt);
      });
  }

  return (
    <Container px={5}>
      <CContainer flex={1}>
        <HStack py={5}>
          <ColorModeSwitcher
            colorScheme="ap"
            variant={"ghost"}
            color={"p.500"}
            mr={"auto"}
            ml={0}
          />
          {/* <BantuanButton ml={"0"} /> */}
        </HStack>

        <CContainer my={"auto"} align={"center"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"260px"} />
        </CContainer>

        <Box mt={"auto"}>
          {!authToken && <LoginForm />}

          {authToken && (
            <CContainer>
              <Text fontWeight={600} fontSize={18} mb={2} textAlign={"center"}>
                Selamat Datang Kembali!
              </Text>

              <CContainer bg={"var(--divider)"} p={4} borderRadius={8}>
                <HStack gap={4}>
                  <Avatar
                    src={user?.fotoprofil?.path || undefined}
                    name={user?.nama}
                  />

                  <CContainer>
                    <Text>{user?.nama}</Text>
                    <Text opacity={0.4}>
                      {user?.unit_kerja?.[0]?.nama_unit}
                    </Text>
                  </CContainer>
                </HStack>
              </CContainer>

              <Button
                as={Link}
                to={"/beranda"}
                colorScheme="ap"
                className="btn-ap clicky"
                size={"lg"}
                mt={4}
                // onClick={() => {
                //   autoNavigate(authToken, dcs, statusAktif);
                // }}
                isDisabled={loading}
              >
                Klik untuk masuk
              </Button>

              <Button
                w={"100%"}
                colorScheme="ap"
                variant={"ghost"}
                className="clicky"
                size={"lg"}
                mt={2}
                // as={Link}
                // to={"/beranda"}
                onClick={handleRelogin}
                isLoading={loading}
              >
                Masuk Ulang
              </Button>
            </CContainer>
          )}
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={8} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
