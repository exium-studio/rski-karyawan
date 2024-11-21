import { Button, Icon, VStack } from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useErrorAlphaColor } from "../../constant/colors";
import { Interface__AttendanceData } from "../../constant/interfaces";
import ripple from "../../lib/ripple";
import ConfirmMyLocation from "../../pages/main/Beranda/ConfirmMyLocation";

interface Props {
  data: Interface__AttendanceData;
}

export default function AttendanceButton({ data, ...props }: Props) {
  // SX
  const errorAlphaColor = useErrorAlphaColor();

  const attendanceButtonRef = useRef<HTMLDivElement>(null);
  const [confirmLocation, setConfrimLocation] = useState<boolean>(false);

  return (
    <>
      {/* Confirm location modal */}
      <ConfirmMyLocation
        isOpen={confirmLocation}
        onOpen={() => {
          setConfrimLocation(true);
        }}
        onClose={() => {
          setConfrimLocation(false);
        }}
        data={data}
        attendanceData={data}
      />

      <VStack
        zIndex={4}
        pointerEvents={"all"}
        ref={attendanceButtonRef}
        as={Button}
        position={"relative"}
        id="attendanceButton"
        bg={"white"}
        _hover={{ bg: "white" }}
        _active={{ bg: "white" }}
        py={4}
        px={8}
        borderRadius={24}
        my={"auto"}
        h={"120px"}
        w={"120px"}
        className="clicky"
        transition={"200ms"}
        onClick={() => {
          ripple(attendanceButtonRef);
          setTimeout(() => {
            setConfrimLocation(true);
          }, 200);
        }}
        cursor={data ? "pointer" : "default"}
        opacity={data ? 1 : 0.6}
        {...props}
        // pointerEvents={data ? "auto" : "none"}
        // isDisabled={locationPermission === null}
      >
        <VStack
          gap={1}
          w={"100px"}
          minH={"100px"}
          justify={"center"}
          bg={!data?.aktivitas ? "var(--p500a5)" : errorAlphaColor}
          borderRadius={"full"}
          p={4}
        >
          <Icon
            as={!data?.aktivitas ? RiArrowDownLine : RiArrowUpLine}
            fontSize={58}
            color={!data?.aktivitas ? "p.500" : "red.500"}
          />
          {/* <Text fontSize={11} fontWeight={600} color={"p.500"}>
            Masuk
          </Text> */}
        </VStack>
      </VStack>
    </>
  );
}
