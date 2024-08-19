import { Box, Center, HStack, Text } from "@chakra-ui/react";
import { dummyActivity } from "../../constant/dummy";
import useDataState from "../../hooks/useDataState";
import AktivitasItem from "../dependent/AktivitasItem";
import Retry from "../dependent/Retry";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";
import NoData from "./NoData";
import { Link } from "react-router-dom";

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

        <Text
          color={"p.500"}
          as={Link}
          to={"/beranda/aktivitas"}
          fontWeight={500}
          fontSize={"12px !important"}
        >
          Semua Aktivitas
        </Text>
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
