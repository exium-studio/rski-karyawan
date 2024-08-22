import { Center, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { dummyActivity } from "../../constant/dummy";
import useDataState from "../../hooks/useDataState";
import AktivitasItem from "../dependent/AktivitasItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";
import SemuaAktivitas from "../../pages/main/SemuaAktivitas";

export default function AktivitasAndaBeranda() {
  const { error, notFound, loading, data, retry } = useDataState({
    initialData: dummyActivity,
    url: "/get-activity-presensi",
  });

  // SX

  return (
    <CContainer px={5} flex={1}>
      <HStack mb={4} justify={"space-between"}>
        <Text fontWeight={600}>Aktivitas Anda</Text>

        <SemuaAktivitas />
      </HStack>

      <CContainer align={"stretch"} gap={3} flex={1}>
        {error && (
          <>
            {notFound && (
              <NoData m={"auto"} label="Tidak ada aktivitas presensi" />
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

        {!loading && !error && !data && (
          <NoData label="Tidak ada aktivitas presensi" />
        )}

        {!error &&
          !loading &&
          data &&
          data.map((activity, i) => <AktivitasItem key={i} data={activity} />)}
      </CContainer>
    </CContainer>
  );
}
