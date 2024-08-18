import Container from "../../components/independent/wrapper/Container";
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CountDownDurationShort from "../../components/dependent/CountDownDurationShort";
import isClockOut from "../../lib/isClockOut";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import { Link } from "react-router-dom";

export default function EmailVerfication() {
  const params = new URLSearchParams(window.location.search);
  const userEmail = params.get("email");
  const [cooldown, setCooldown] = useState<number | null>(null);
  const forgotPassEmailVerifCd = localStorage.getItem("forgotPassEmailVerifCd");

  const kirimUlangEmailVerif = () => {
    const today = new Date();
    const timestamp = new Date(today.getTime() + 5 * 60000);
    localStorage.setItem("forgotPassEmailVerifCd", timestamp.toISOString());
    const timeDifference = (today.getTime() - timestamp.getTime()) / 1000;
    setCooldown(timeDifference * -1);
  };

  useEffect(() => {
    if (forgotPassEmailVerifCd) {
      const currentTime = new Date().getTime();
      const timestamp = new Date(forgotPassEmailVerifCd).getTime();
      const timeDifference = (currentTime - timestamp) / 1000; // Menghitung selisih waktu dalam detik
      setCooldown(timeDifference * -1);
    }
  }, [forgotPassEmailVerifCd]);

  // SX

  return (
    <Container p={4} pt={0}>
      <LengkapiDataUserHeader />

      <VStack gap={0} my={"auto"}>
        <Box maxW={"300px"} mx={"auto"} mb={8}>
          <Image src={`/vectors/emailSent.png`} w={"100%"} maxW={"280px"} />
        </Box>

        <Text textAlign={"center"} mb={4}>
          Kami telah mengirimkan email verifikasi ke <b>{userEmail}</b>
        </Text>

        <Text textAlign={"center"} mb={4}>
          Silakan periksa kotak masuk atau folder spam kamu dan klik tautan
          verifikasi yang terdapat di dalam email tersebut
        </Text>

        <Text textAlign={"center"} mb={2}>
          Belum menerima email?
        </Text>
        {cooldown &&
        forgotPassEmailVerifCd &&
        !isClockOut(forgotPassEmailVerifCd) ? (
          <HStack h={"40px"}>
            <CountDownDurationShort
              seconds={cooldown}
              isFinishToZero={() => {
                setCooldown(null);
                localStorage.removeItem("forgotPasswordEmailVerifCd");
              }}
              color={"p.500"}
              fontWeight={600}
            />
          </HStack>
        ) : (
          <Button
            className="btn-clear"
            fontWeight={600}
            color={"p.500"}
            onClick={kirimUlangEmailVerif}
          >
            Kirim Ulang
          </Button>
        )}
      </VStack>

      <Button className="btn-solid" as={Link} to={"/new-password"}>
        Input New Password (Debug aja)
      </Button>
    </Container>
  );
}
