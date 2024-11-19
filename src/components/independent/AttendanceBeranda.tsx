import {
  Button,
  Icon,
  SimpleGrid,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiCloseLine } from "@remixicon/react";
import { useRef } from "react";
import { Interface__AttendanceData } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import ripple from "../../lib/ripple";
import AlertLocationPermission from "../dependent/AlertLocationPermission";
import AttendanceButton from "../dependent/AttendanceButton";
import AttendanceData from "../dependent/AttendanceData";
import Retry from "../dependent/Retry";
import CurrentAddress from "./CurrentAddress";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function AttendanceBeranda() {
  const { error, message, notFound, loading, data, retry } =
    useDataState<Interface__AttendanceData>({
      initialData: undefined,
      url: "/api/get-today-jadwal",
      dependencies: [],
    });

  const liburButtonRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // SX
  const skeletonBg = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");

  return (
    <>
      <AlertLocationPermission />

      {error && (
        <>
          {notFound && (
            <>
              {/* No Jadwal Button */}
              <VStack
                ref={liburButtonRef}
                as={Button}
                position={"relative"}
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
                  ripple(liburButtonRef);
                  toast({
                    status: "error",
                    title: message,
                    isClosable: true,
                    position: "top",
                  });
                }}
              >
                <VStack
                  gap={1}
                  w={"100px"}
                  minH={"100px"}
                  justify={"center"}
                  bg={"var(--divider)"}
                  borderRadius={"full"}
                  p={4}
                >
                  <Icon as={RiCloseLine} fontSize={58} color={"#303030df"} />
                </VStack>
              </VStack>

              <CurrentAddress />

              {/* Jam Masuk, Jam Keluar, Jam Kerja */}
              <AttendanceData data={data} />
            </>
          )}

          {!notFound && (
            <CContainer minH={"336px"} flex={0} justify={"center"}>
              <Retry
                loading={loading}
                retry={retry}
                my={"auto"}
                className="clicky"
                colorScheme="whiteAlpha"
                bg={"whiteAlpha.200"}
                _hover={{ bg: "whiteAlpha.300" }}
                _active={{ bg: "whiteAlpha.400" }}
                color={"white"}
              />
            </CContainer>
          )}
        </>
      )}

      {!error && (
        <>
          {loading && (
            <>
              <Skeleton
                h={"120px"}
                w={"120px"}
                bg={skeletonBg}
                my={"auto"}
                borderRadius={24}
              />

              <Skeleton bg={skeletonBg} h={"36px"} mb={8} maxW={"280px"} />

              <SimpleGrid columns={3} w={"100%"} gap={2}>
                <Skeleton h={"85px"} bg={skeletonBg} />
                <Skeleton h={"85px"} bg={skeletonBg} />
                <Skeleton h={"85px"} bg={skeletonBg} />
              </SimpleGrid>
            </>
          )}

          {!loading && (
            <>
              {!data && <NoData label="Tidak ada jadwal masuk" opacity={0.4} />}

              {data && (
                <>
                  <AttendanceButton data={data} />
                  <CurrentAddress />
                  <AttendanceData data={data} />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
