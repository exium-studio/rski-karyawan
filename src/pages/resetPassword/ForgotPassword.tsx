import { Box, Image, Text } from "@chakra-ui/react";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import ForgotPasswordForm from "../../components/form/ForgotPasswordForm";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";

export default function ForgotPassword() {
  // SX

  return (
    <Container px={5}>
      <CContainer flex={1}>
        <LengkapiDataUserHeader />

        <CContainer h={"400px"} align={"center"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"260px"} />
        </CContainer>

        <Text
          fontSize={20}
          fontWeight={600}
          textAlign={"center"}
          mt={"auto"}
          mb={2}
        >
          Lupa Password? Tenang
        </Text>
        <Text textAlign={"center"} mb={4} opacity={0.6}>
          Masukkan email anda dan kami akan mengirimkan OTP ke email anda.
        </Text>
        <Text textAlign={"center"} mb={6} opacity={0.6}>
          Jika kamu tidak memiliki email, silakan hubungi bagian personalia
          untuk meminta bantuan dalam mereset kata sandi kamu.
        </Text>

        <Box>
          <ForgotPasswordForm />
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={8} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
