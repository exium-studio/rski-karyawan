import { Box, Center, HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxLine } from "@remixicon/react";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";

interface Props extends StackProps {
  data: any;
  forwardRef?: any;
  noAvatars?: boolean;
  noArrow?: boolean;
}

export default function JadwalDitukarItem({
  data,
  noAvatars,
  noArrow,
  forwardRef,
  ...props
}: Props) {
  return (
    <HStack ref={forwardRef} gap={8} borderRadius={12} {...props}>
      <Box>
        <Text lineHeight={1.3} fontSize={12} opacity={0.4} mb={2} pr={6}>{`${
          data.shift?.nama
            ? data.shift?.nama
            : data.ex_libur
            ? "Ex Libur"
            : "Libur"
        }`}</Text>

        <Text fontWeight={600} mb={2}>
          {formatDate(data.tgl_mulai)}
        </Text>

        {/* {data.keterangan && (
          <Text fontWeight={600} opacity={data.jam_to ? 1 : 0.6}>
            {data.keterangan}
          </Text>
        )} */}

        {data?.shift?.jam_from && data?.shift?.jam_to && (
          <HStack gap={3}>
            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--p500a4)"}>
                <Icon as={RiLoginBoxLine} fontSize={10} color={"p.500"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_from)}</Text>
            </HStack>

            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--reda)"}>
                <Icon as={RiLogoutBoxLine} fontSize={10} color={"red.400"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_to)}</Text>
            </HStack>
          </HStack>
        )}

        {!(data?.shift?.jam_from && data?.shift?.jam_to) && "-"}
      </Box>
    </HStack>
  );
}
