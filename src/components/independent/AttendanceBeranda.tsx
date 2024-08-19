import { SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { AttendanceDataInterface } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import AlertLocationPermission from "../dependent/AlertLocationPermission";
import NoData from "./NoData";
import AttendanceButton from "../dependent/AttendanceButton";
import AttendanceData from "../dependent/AttendanceData";
import Retry from "../dependent/Retry";
import CurrentAddress from "./CurrentAddress";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function AttendanceBeranda() {
  const { error, notFound, loading, data, retry } =
    useDataState<AttendanceDataInterface>({
      initialData: undefined,
      url: "",
      dependencies: [],
    });

  // SX
  const skeletonBg = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");

  return (
    <>
      <AlertLocationPermission />

      {error && (
        <>
          {notFound && <></>}

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
              <Skeleton h={"120px"} w={"120px"} bg={skeletonBg} my={"auto"} />

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
