import { Box, Image, Text } from "@chakra-ui/react";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import NewPasswordForm from "../../components/form/NewPasswordForm";
import Container from "../../components/independent/wrapper/Container";
import CContainer from "../../components/independent/wrapper/CContainer";

export default function NewPassword() {
  // SX

  return (
    <Container px={4} pt={0} pb={8}>
      <LengkapiDataUserHeader />

      <CContainer h={"440px"} align={"center"} justify={"center"}>
        <Image src={`/images/logo.webp`} w={"100%"} maxW={"260px"} />
      </CContainer>

      <Text
        fontSize={[22, null, 24]}
        fontWeight={600}
        textAlign={"center"}
        mb={2}
        mt={"auto"}
      >
        Password Baru
      </Text>
      <Text textAlign={"center"} mb={6}>
        Silahkan Masukan password baru dan kornfirmasi password baru anda
        dibawah ini
      </Text>

      <Box>
        <NewPasswordForm />
      </Box>

      <Text textAlign={"center"} opacity={0.4} mt={8} fontSize={14}>
        {"App ver 1.0"}
      </Text>
    </Container>
  );
}
