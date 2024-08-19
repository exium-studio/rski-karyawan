import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  HStack,
  Icon,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowRightSLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { getWeekOfMonth } from "date-fns";
import { Link } from "react-router-dom";
import { useLightDarkColor } from "../../constant/colors";
import formatTime from "../../lib/formatTimeOld";
import { Interface__Jadwal } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";

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
  return (
    <HStack
      ref={forwardRef || null}
      gap={8}
      py={4}
      px={5}
      borderRadius={12}
      bg={useLightDarkColor()}
      transition={"200ms"}
      cursor={data.jam_to ? "pointer" : ""}
      as={Link}
      to={`/jadwal/detail`}
      _active={{ opacity: 0.6 }}
      className="clicky"
      {...props}
    >
      <Box>
        {data.nama && (
          <>
            <Text fontSize={12} opacity={0.4} mb={2}>{`${
              data.nama
            } - Minggu ${getWeekOfMonth(data.jam_from)}`}</Text>

            <Text fontWeight={600} opacity={data.jam_to ? 1 : 0.6}>
              {formatDate(data.jam_from)}
            </Text>
          </>
        )}

        {/* {data.keterangan && (
          <Text fontWeight={600} opacity={data.jam_to ? 1 : 0.6}>
            {data.keterangan}
          </Text>
        )} */}

        {data.jam_from && data.jam_to && (
          <HStack gap={3} mt={2}>
            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--p500a4)"}>
                <Icon as={RiLoginBoxLine} fontSize={10} color={"p.500"} />
              </Center>
              <Text fontSize={13}>{formatTime(data.jam_from)}</Text>
            </HStack>

            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--reda)"}>
                <Icon as={RiLogoutBoxLine} fontSize={10} color={"red.400"} />
              </Center>
              <Text fontSize={13}>{formatTime(data.jam_to)}</Text>
            </HStack>
          </HStack>
        )}
      </Box>

      <VStack ml={"auto"}>
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
      </VStack>
    </HStack>
  );
}
