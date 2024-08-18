import { Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { RiHourglass2Fill, RiTimeLine } from "@remixicon/react";
import formatTime from "../../constant/formatTime";
import CountDownDurationShort from "./CountDownDurationShort";
import calculateDuration from "../../lib/calculateDuration";
import isClockIn from "../../lib/isClockIn";
import { AttendanceDataInterface } from "../../constant/interfaces";
import isClockOut from "../../lib/isClockOut";

interface Props {
  data: AttendanceDataInterface | null;
}

export default function AttendanceData({ data }: Props) {
  return (
    <SimpleGrid columns={3} w={"100%"}>
      <VStack gap={0}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} transform={"scaleX(-1)"} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          {data && data.masuk ? formatTime(data.masuk) : "-"}
        </Text>
        <Text fontSize={14}>Masuk</Text>
      </VStack>

      <VStack gap={0}>
        <Icon as={RiTimeLine} fontSize={32} mb={2} />
        <Text fontSize={[16, null, 18]} className="num" fontWeight={500}>
          {data && data.keluar ? formatTime(data.keluar) : "-"}
        </Text>
        <Text fontSize={14}>Keluar</Text>
      </VStack>

      <VStack gap={0}>
        <Icon as={RiHourglass2Fill} fontSize={32} mb={2} />
        {data &&
        data.jam_kerja &&
        isClockIn(data.masuk) &&
        !isClockOut(data.keluar) ? (
          <CountDownDurationShort
            seconds={calculateDuration(data.keluar)}
            isFinishToZero={"stop"}
            fontWeight={500}
          />
        ) : (
          <Text mt={"auto"}>-</Text>
        )}
        <Text fontSize={14}>Jam Kerja</Text>
      </VStack>
    </SimpleGrid>
  );
}
