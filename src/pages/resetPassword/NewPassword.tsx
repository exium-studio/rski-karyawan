import Container from "../../components/independent/wrapper/Container";
import { Box, Text } from "@chakra-ui/react";
import BantuanButton from "../../components/independent/BantuanButton";
import NewPasswordForm from "../../components/form/NewPasswordForm";

export default function NewPassword() {
  // SX

  return (
    <Container p={4}>
      <BantuanButton />

      <Text
        fontSize={[22, null, 24]}
        fontWeight={600}
        textAlign={"center"}
        mb={2}
        mt={"auto"}
      >
        Kata Sandi Baru
      </Text>
      <Text textAlign={"center"} mb={6}>
        Silahkan Masukan kata sandi baru dan kornfirmasi kata sandi baru anda
        dibawah ini
      </Text>

      <Box>
        <NewPasswordForm />
      </Box>

      <Text textAlign={"center"} opacity={0.4} mt={4} fontSize={14}>
        {"App ver 1.0"}
      </Text>
    </Container>
  );
}
