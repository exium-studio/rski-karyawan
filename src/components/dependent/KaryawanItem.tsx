import { Avatar, HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import CContainer from "../independent/wrapper/CContainer";
import StatusKaryawanBadge from "./StatusKaryawanBadge";

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
      w={"100%"}
      {...props}
    >
      <HStack flex={1}>
        <Avatar name={data.user.nama} src={data.user.foto_profil || ""} />

        <CContainer flex={1}>
          <Text
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={"140px"}
          >
            {data.user.nama}
          </Text>
          <Text fontSize={12} opacity={0.4} noOfLines={1}>
            {data?.kompetensi?.nama_kompetensi || "Tidak Ada Kompetensi "}
          </Text>
        </CContainer>
      </HStack>

      <HStack ml={"auto"} flexShrink={0}>
        {!noStatus && <StatusKaryawanBadge data={{ id: 1, label: "Tetap" }} />}

        {!noArrowIcon && (
          <Icon as={RiArrowRightSLine} fontSize={24} opacity={0.4} mr={-1} />
        )}
      </HStack>
    </HStack>
  );
}
