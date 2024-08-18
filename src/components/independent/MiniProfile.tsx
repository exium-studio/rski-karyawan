import { Avatar, Box, HStack, StackProps, Text } from "@chakra-ui/react";
import { Interface__User } from "../../constant/interfaces";

interface Props extends StackProps {
  data: Interface__User;
}

export default function MiniProfile({ data, ...props }: Props) {
  return (
    <HStack gap={3} {...props}>
      <Avatar name={data?.nama} src={data?.foto_profil || ""} />
      <Box>
        <Text fontWeight={600} noOfLines={1}>
          {data?.nama}
        </Text>
        <Text fontSize={14} opacity={0.4}>
          {data?.unit_kerja?.nama_unit}
        </Text>
      </Box>
    </HStack>
  );
}
