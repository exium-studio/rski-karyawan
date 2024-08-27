import { Button, Center, StackProps, Text, VStack } from "@chakra-ui/react";
import { dummyActivity } from "../../constant/dummy";
import { Interface__Aktivitas } from "../../constant/interfaces";
import useFilterAktivitas from "../../global/useFilterAktivitas";
import useDataState from "../../hooks/useDataState";
import useScrollToTop from "../../hooks/useScrollToTop";
import AktivitasItem from "../dependent/AktivitasItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {}

export default function ListAktivitas({ ...props }: Props) {
  useScrollToTop();

  const { filterAktivitas } = useFilterAktivitas();

  const { error, notFound, loading, data, retry } = useDataState<
    Interface__Aktivitas[]
  >({
    initialData: dummyActivity,
    url: "/api/get-activity-presensi",
    dependencies: [filterAktivitas],
  });

  // SX

  return (
    <CContainer gap={3} flex={1} {...props}>
      {error && (
        <>
          {notFound && (
            <NoData minH={"132px"} label="Tidak ada aktivitas presensi" />
          )}

          {!notFound && (
            <Center my={"auto"} minH={"300px"}>
              <Retry loading={loading} retry={retry} />
            </Center>
          )}
        </>
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
