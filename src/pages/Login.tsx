import { Avatar, Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { getCookie } from "typescript-cookie";
import LoginForm from "../components/form/LoginForm";
import BantuanButton from "../components/independent/BantuanButton";
import CContainer from "../components/independent/wrapper/CContainer";
import Container from "../components/independent/wrapper/Container";
import getUserData from "../lib/getUserData";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export default function Login() {
  // SX

  const authToken = getCookie("__auth_token");
  const user = getUserData();

  return (
    <Container px={5}>
      <CContainer flex={1}>
        <HStack py={5}>
          <ColorModeSwitcher className="btn-solid" />
          <BantuanButton />
        </HStack>

        <CContainer flex={1} align={"center"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"280px"} />
        </CContainer>

        <Box mt={"auto"}>
          {!authToken && <LoginForm />}

          {authToken && (
            <CContainer>
              <Text fontWeight={600} fontSize={18} mb={2}>
                Selamat Datang Kembali!
              </Text>

              <CContainer bg={"var(--divider)"} p={4} borderRadius={8}>
                <HStack gap={4}>
                  <Avatar src={user?.foto_profil} name={user?.foto_profil} />
                  <CContainer>
                    <Text>{user?.nama}</Text>
                    <Text opacity={0.4}>
                      {user?.unit_kerja?.[0]?.nama_unit}
                    </Text>
                  </CContainer>
                </HStack>
              </CContainer>

              <Button
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
                size={"lg"}
                mt={4}
                as={Link}
                to={"/beranda"}
              >
                Klik untuk masuk
              </Button>
            </CContainer>
          )}
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={4} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
