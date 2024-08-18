import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import formatDate from "../../lib/formatDate";
import formatTime from "../../constant/formatTime";

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
        bg={data.type === "Masuk" ? "var(--p500a5)" : "var(--reda)"}
      >
        <Icon
          as={data.type === "Masuk" ? RiLoginBoxLine : RiLogoutBoxRLine}
          fontSize={data.type === "Masuk" ? 20 : 20}
          color={data.type === "Masuk" ? "p.500" : "red.400"}
        />
      </Center>

      <Box>
        <Text fontWeight={600}>{data.type}</Text>
        <Text fontSize={14} opacity={0.4}>
          {formatDate(data.timestamp)}
        </Text>
      </Box>

      <Text ml={"auto"} fontWeight={600} className="num">
        {formatTime(data.timestamp)}
      </Text>
    </HStack>
  );
}
