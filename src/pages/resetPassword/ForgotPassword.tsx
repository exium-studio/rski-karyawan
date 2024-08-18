import Container from "../../components/independent/wrapper/Container";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import ForgotPasswordForm from "../../components/form/ForgotPasswordForm";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import CContainer from "../../components/independent/wrapper/CContainer";

export default function ForgotPassword() {
  // SX

  return (
    <Container px={5}>
      <CContainer>
        <LengkapiDataUserHeader />

        <VStack h={"420px"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"280px"} />
        </VStack>

        <Text
          fontSize={[22, null, 24]}
          fontWeight={600}
          textAlign={"center"}
          mb={2}
        >
          Lupa Kata Sandi
        </Text>
        <Text textAlign={"center"}>
          Masukkan alamat email yang terkait dengan akunmu dan kami akan
          mengirimkan instruksi untuk mengatur ulang kata sandi
        </Text>

        <Box mt={"auto"}>
          <ForgotPasswordForm />
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={4} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
