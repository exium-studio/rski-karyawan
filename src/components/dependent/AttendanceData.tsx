import { Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { RiHourglass2Fill, RiTimeLine } from "@remixicon/react";
import formatTime from "../../lib/formatTime";
import CountDownDurationShort from "./CountDownDurationShort";
import calculateDuration from "../../lib/calculateDuration";
import isClockIn from "../../lib/isClockIn";
import { Interface__AttendanceData } from "../../constant/interfaces";
import isClockOut from "../../lib/isClockOut";

interface Props {
  data?: Interface__AttendanceData;
}

export default function AttendanceData({ data }: Props) {
  return data ? (
    <SimpleGrid columns={3} w={"100%"}>
      <VStack gap={0}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} transform={"scaleX(-1)"} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          {formatTime(data.shift?.jam_from)}
        </Text>
        <Text fontSize={14}>Masuk</Text>
      </VStack>

      <VStack gap={0}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          {data.shift?.jam_to ? formatTime(data.shift?.jam_to) : "-"}
        </Text>
        <Text fontSize={14}>Keluar</Text>
      </VStack>

      <VStack gap={0}>
        <Icon as={RiHourglass2Fill} fontSize={32} mb={2} />
        {isClockIn(data.shift?.jam_from) && !isClockOut(data.shift?.jam_to) ? (
          <CountDownDurationShort
            seconds={calculateDuration(data.shift?.jam_to)}
            isFinishToZero={"stop"}
            fontWeight={500}
          />
        ) : (
          <Text mt={"auto"}>-</Text>
        )}
        <Text fontSize={14}>Jam Kerja</Text>
      </VStack>
    </SimpleGrid>
  ) : (
    <SimpleGrid columns={3} w={"100%"} gap={2}>
      <VStack gap={0} h={"85px"}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} transform={"scaleX(-1)"} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          -
        </Text>
        <Text fontSize={14}>Masuk</Text>
      </VStack>

      <VStack gap={0} h={"85px"}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          -
        </Text>
        <Text fontSize={14}>Keluar</Text>
      </VStack>

      <VStack gap={0} h={"85px"}>
        <Icon
          as={RiHourglass2Fill}
          fontSize={32}
          mb={2}
          transform={"scaleX(-1)"}
        />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          -
        </Text>
        <Text fontSize={14}>Jam Kerja</Text>
      </VStack>
    </SimpleGrid>
  );
}
