import { Box, HStack, Image, Text } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";
import BantuanButton from "../components/independent/BantuanButton";
import CContainer from "../components/independent/wrapper/CContainer";
import Container from "../components/independent/wrapper/Container";

export default function Login() {
  // SX

  return (
    <Container px={5}>
      <CContainer>
        <HStack py={4}>
          <BantuanButton />
        </HStack>

        <CContainer align={"center"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"280px"} />
        </CContainer>

        <Box mt={"auto"}>
          <LoginForm />
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={4} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
