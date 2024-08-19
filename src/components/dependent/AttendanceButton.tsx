import { Button, Icon, VStack } from "@chakra-ui/react";
import { RiLoginBoxLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { Interface__AttendanceData } from "../../constant/interfaces";
import ConfirmMyLocation from "../../pages/main/Beranda/ConfirmMyLocation";
import ripple from "../../lib/ripple";

interface Props {
  data: Interface__AttendanceData;
}

export default function AttendanceButton({ data }: Props) {
  const attendanceButtonRef = useRef<HTMLDivElement>(null);
  const [confirmLocation, setConfrimLocation] = useState<boolean>(false);

  return (
    <>
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
        pointerEvents={data ? "auto" : "none"}
        // isDisabled={locationPermission === null}
      >
        <VStack
          gap={1}
          w={"100px"}
          minH={"100px"}
          justify={"center"}
          bg={"var(--p500a5)"}
          borderRadius={"full"}
          p={4}
        >
          <Icon as={RiLoginBoxLine} fontSize={58} color={"p.500"} />
          {/* <Text fontSize={11} fontWeight={600} color={"p.500"}>
            Masuk
          </Text> */}
        </VStack>
      </VStack>
    </>
  );
}
