import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";

interface Props {
  data: any;
}

export default function AktivitasItem({ data }: Props) {
  const lightDarkColor = useLightDarkColor();

  return (
    <HStack gap={4} borderRadius={12} p={4} bg={lightDarkColor}>
      <Center
        p={2}
        borderRadius={"full"}
        bg={data.presensi === "Masuk" ? "var(--p500a5)" : "var(--reda)"}
      >
        <Icon
          as={data.presensi === "Masuk" ? RiLoginBoxLine : RiLogoutBoxRLine}
          fontSize={data.presensi === "Masuk" ? 20 : 20}
          color={data.presensi === "Masuk" ? "p.500" : "red.400"}
        />
      </Center>

      <Box>
        <Text fontWeight={600}>{data.presensi}</Text>
        <Text fontSize={14} opacity={0.4}>
          {formatDate(data.tanggal)}
        </Text>
      </Box>

      <Text ml={"auto"} fontWeight={600} className="num">
        {formatTime(data.jam)}
      </Text>
    </HStack>
  );
}
