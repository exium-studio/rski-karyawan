import {
  Avatar,
  Badge,
  Box,
  HStack,
  Icon,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { RiArrowRightSLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__Karyawan } from "../../constant/interfaces";
import karyawanStatusColor from "../../lib/karyawanStatusColor";

interface Props extends StackProps {
  data: any;
  noArrowIcon?: boolean;
  noStatus?: boolean;
  forwardRef?: any;
}
export default function KaryawanItem({
  data,
  forwardRef,
  noArrowIcon,
  noStatus,
  ...props
}: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <HStack
      ref={forwardRef}
      p={4}
      borderRadius={12}
      bg={lightDarkColor}
      cursor={"pointer"}
      _active={{ opacity: 0.6 }}
      className="clicky"
      {...props}
    >
      <HStack gap={3} mr={4}>
        <Avatar name={data.user.nama} src={data.user.foto_profil || ""} />
        <Box>
          <Text fontSize={14} fontWeight={500} noOfLines={1}>
            {data.user.nama}
          </Text>
          <Text fontSize={12} opacity={0.4} noOfLines={1}>
            {data?.kompetensi?.nama_kompetensi}
          </Text>
        </Box>
      </HStack>

      <HStack ml={"auto"}>
        {!noStatus && data.status_kerja && (
          <Badge
            borderRadius={"full"}
            w={"50px"}
            textAlign={"center"}
            colorScheme={karyawanStatusColor(data?.status_kerja)}
          >
            {data?.status_kerja}
          </Badge>
        )}

        {!noArrowIcon && (
          <Icon as={RiArrowRightSLine} fontSize={24} opacity={0.4} />
        )}
      </HStack>
    </HStack>
  );
}
