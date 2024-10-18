import { Avatar, Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import LoginForm from "../components/form/LoginForm";
import BantuanButton from "../components/independent/BantuanButton";
import CContainer from "../components/independent/wrapper/CContainer";
import Container from "../components/independent/wrapper/Container";
import useAuth from "../global/useAuth";
import useAutoNavigate from "../hooks/useAutoNavigate";
import getUserData from "../lib/getUserData";

export default function Login() {
  // SX

  const authToken = localStorage.getItem("__auth_token");
  const user = getUserData();
  const autoNavigate = useAutoNavigate();
  const { dcs, statusAktif } = useAuth();

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
          <BantuanButton ml={"0"} />
        </HStack>

        <CContainer h={"400px"} align={"center"} justify={"center"}>
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
                // as={Link}
                // to={"/beranda"}
                onClick={() => {
                  autoNavigate(authToken, dcs, statusAktif);
                }}
              >
                Klik untuk masuk
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
