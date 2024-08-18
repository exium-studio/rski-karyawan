import { Box, Button, StackProps, Text, VStack } from "@chakra-ui/react";
import { dummyActivity } from "../../constant/dummy";
import { Interface__Aktivitas } from "../../constant/interfaces";
import useFilterAktivitas from "../../global/useFilterAktivitas";
import useDataState from "../../hooks/useDataState";
import useScrollToTop from "../../hooks/useScrollToTop";
import AktivitasItem from "../dependent/AktivitasItem";
import NoData from "./NoData";
import Retry from "../dependent/Retry";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {}

export default function ListAktivitas({ ...props }: Props) {
  useScrollToTop();

  const { filterAktivitas } = useFilterAktivitas();

  const { error, loading, data, retry } = useDataState<Interface__Aktivitas[]>({
    initialData: dummyActivity,
    url: "",
    dependencies: [filterAktivitas],
  });

  // SX

  return (
    <CContainer gap={3} {...props}>
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}

      {!error &&
        loading &&
        Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} h={"74px"} />
        ))}

      {!error && !loading && !data && <NoData />}

      {!error && !loading && data && (
        <>
          {data.map((activity, i) => (
            <AktivitasItem key={i} data={activity} />
          ))}
          <Button
            flexShrink={0}
            colorScheme="ap"
            variant={"ghost"}
            className="clicky"
          >
            Tampilkan Lebih Banyak
          </Button>
        </>
      )}

      {!error && !loading && data && data.length === 0 && (
        <VStack minH={"100px"} justify={"center"}>
          <Text textAlign={"center"} opacity={0.4}>
            Aktivitas tidak ditemukan
          </Text>
        </VStack>
      )}
    </CContainer>
  );
}
