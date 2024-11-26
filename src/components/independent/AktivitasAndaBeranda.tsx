import { Center, HStack, Text } from "@chakra-ui/react";
import { dummyActivity } from "../../constant/dummy";
import useDataState from "../../hooks/useDataState";
import SemuaAktivitas from "../../pages/main/SemuaAktivitas";
import AktivitasItem from "../dependent/AktivitasItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";
import useFilterAktivitas from "../../global/useFilterAktivitas";
import formatDate from "../../lib/formatDate";

export default function AktivitasAndaBeranda() {
  const { filterAktivitas } = useFilterAktivitas();

  const { error, notFound, loading, data, retry } = useDataState({
    initialData: dummyActivity,
    url: "/api/get-activity-presensi",
    payload: {
      tgl_mulai: filterAktivitas?.date_range?.from
        ? formatDate(filterAktivitas?.date_range?.from, "short2")
        : "",
      tgl_selesai: filterAktivitas?.date_range?.to
        ? formatDate(filterAktivitas?.date_range?.to, "short2")
        : "",
      limit: 10,
    },
  });

  // SX

  return (
    <CContainer px={5} pb={5} flex={1}>
      <HStack mb={4} justify={"space-between"}>
        <Text fontWeight={600}>Presensi Minggu Ini</Text>

        <SemuaAktivitas />
      </HStack>

      <CContainer align={"stretch"} gap={3} flex={1}>
        {loading && (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} h={"74px"} />
            ))}
          </>
        )}

        {!loading && (
          <>
            {error && (
              <>
                {notFound && (
                  <NoData
                    m={"auto"}
                    label="Tidak ada aktivitas presensi"
                    minH={"300px"}
                  />
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
                {data &&
                  data.length > 0 &&
                  data.map((activity, i) => (
                    <AktivitasItem key={i} initialData={activity} />
                  ))}

                {data && data.length === 0 && (
                  <NoData label="Tidak ada aktivitas presensi" minH={"300px"} />
                )}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
