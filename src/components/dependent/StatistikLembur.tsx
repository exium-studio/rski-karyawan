import { Center, HStack, Icon, Text, Wrap } from "@chakra-ui/react";
import { RiLineChartFill } from "@remixicon/react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../constant/colors";
import useDataState from "../../hooks/useDataState";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import NoData from "../independent/NoData";
import Retry from "./Retry";

export default function StatistikLembur() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: "/api/get-statistik-lembur",
    dependencies: [],
  });

  return (
    <CContainer flex={0}>
      <Wrap spacing={3}>
        {loading && (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} h={"109px"} flex={"1 1 150px"} />
            ))}
          </>
        )}

        {!loading && (
          <>
            {error && (
              <>
                {notFound && (
                  <NoData minH={"132px"} label="Tidak ada statistik lembur" />
                )}

                {!notFound && (
                  <Center my={"auto"} minH={"300px"}>
                    <Retry loading={loading} retry={retry} />
                  </Center>
                )}
              </>
            )}

            {!error && (
              <>
                <CContainer
                  p={4}
                  borderRadius={12}
                  bg={lightDarkColor}
                  minH={"100px"}
                  justify={"center"}
                  flex={"1 1 150px"}
                >
                  <Icon
                    as={RiLineChartFill}
                    mb={2}
                    color={`${chartColors[0]}`}
                  />

                  <Text fontWeight={500} mb={2} noOfLines={1}>
                    Total Lembur
                  </Text>

                  <HStack align={"end"} gap={1}>
                    <Text
                      fontSize={24}
                      lineHeight={1}
                      fontWeight={600}
                      mt={"auto"}
                    >
                      {data?.total_lembur}
                    </Text>
                    <Text lineHeight={1.1} opacity={0.4} fontSize={12}>
                      kali
                    </Text>
                  </HStack>
                </CContainer>

                <CContainer
                  p={4}
                  borderRadius={12}
                  bg={lightDarkColor}
                  minH={"100px"}
                  justify={"center"}
                  flex={"1 1 150px"}
                >
                  <Icon
                    as={RiLineChartFill}
                    mb={2}
                    color={`${chartColors[1]}`}
                  />

                  <Text fontWeight={500} mb={2} noOfLines={1}>
                    Total Waktu
                  </Text>

                  <HStack align={"end"} gap={1}>
                    <Text
                      fontSize={24}
                      lineHeight={1}
                      fontWeight={600}
                      mt={"auto"}
                    >
                      {(data?.total_waktu || 0) / 60}
                    </Text>{" "}
                    <Text lineHeight={1.1} opacity={0.4} fontSize={12}>
                      menit
                    </Text>
                  </HStack>
                </CContainer>
              </>
            )}
          </>
        )}
      </Wrap>
    </CContainer>
  );
}
