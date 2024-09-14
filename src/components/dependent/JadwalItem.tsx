import {
  Avatar,
  AvatarGroup,
  Center,
  HStack,
  Icon,
  StackProps,
  Text,
} from "@chakra-ui/react";
import {
  RiArrowRightSLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { getWeekOfMonth } from "date-fns";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__Jadwal } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";
import CContainer from "../independent/wrapper/CContainer";

interface Props extends StackProps {
  data: Interface__Jadwal;
  forwardRef?: any;
  noAvatars?: boolean;
  noArrow?: boolean;
}

export default function JadwalItem({
  data,
  noAvatars,
  noArrow,
  forwardRef,
  ...props
}: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <HStack
      ref={forwardRef || null}
      gap={8}
      py={4}
      px={5}
      borderRadius={12}
      bg={lightDarkColor}
      transition={"200ms"}
      cursor={data.tgl_mulai ? "pointer" : ""}
      _active={{ opacity: 0.6 }}
      className="clicky"
      {...props}
    >
      <CContainer gap={2}>
        <Text fontSize={12} opacity={0.4}>{`${
          data.shift?.nama || "Libur"
        } - Minggu ${getWeekOfMonth(data.tgl_mulai)}`}</Text>

        <Text
          fontWeight={600}
          opacity={data.shift?.jam_from ? 1 : 0.6}
          whiteSpace={"nowrap"}
        >
          {formatDate(data.tgl_mulai, "long")}
        </Text>

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
      </CContainer>

      <CContainer gap={2} ml={"auto"}>
        {!noArrow && (
          <Icon
            as={RiArrowRightSLine}
            ml={"auto"}
            fontSize={24}
            opacity={0.4}
          />
        )}

        {data.assignees && !noAvatars && (
          <AvatarGroup
            size="sm"
            max={2}
            ml={"auto"}
            mt={"auto"}
            pt={6}
            spacing={"-8px"}
          >
            {data.assignees.map((assignee, i) => (
              <Avatar
                key={i}
                name={assignee.user.nama}
                src={assignee.user.foto_profil || ""}
              />
            ))}
          </AvatarGroup>
        )}
      </CContainer>
    </HStack>
  );
}
