import { Center, HStack, Text } from "@chakra-ui/react";
import { dummyActivity } from "../../constant/dummy";
import useDataState from "../../hooks/useDataState";
import SemuaAktivitas from "../../pages/main/SemuaAktivitas";
import AktivitasItem from "../dependent/AktivitasItem";
import Retry from "../dependent/Retry";
import NoData from "./NoData";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

export default function AktivitasAndaBeranda() {
  const { error, notFound, loading, data, retry } = useDataState({
    initialData: dummyActivity,
    url: "",
  });

  // SX

  return (
    <CContainer px={5} flex={1}>
      <HStack mb={4} justify={"space-between"}>
        <Text fontWeight={600}>Aktivitas Anda</Text>

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
                    <AktivitasItem key={i} data={activity} />
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
