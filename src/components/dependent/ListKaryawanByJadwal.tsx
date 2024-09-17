import { Center, StackProps } from "@chakra-ui/react";
import useDataState from "../../hooks/useDataState";
import DetailKaryawan from "../../pages/main/Karyawan/DetailKaryawan";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import Retry from "./Retry";
import NoData from "../independent/NoData";

interface Props extends StackProps {
  jadwal_id: number;
}

export default function ListKaryawanByJadwal({ jadwal_id, ...props }: Props) {
  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/${jadwal_id}/get-karyawan-same-jadwal`,
    dependencies: [jadwal_id],
  });

  return (
    <CContainer flex={1} gap={3} {...props}>
      {loading && (
        <CContainer flex={1} gap={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} h={"80px"} />
          ))}
        </CContainer>
      )}

      {!loading && (
        <>
          {error && (
            <>
              {notFound && <NotFound />}

              {!notFound && (
                <Center>
                  <Retry loading={loading} retry={retry} />
                </Center>
              )}
            </>
          )}

          {!error && (
            <>
              {data.length === 0 && <NoData />}
              {data.length > 0 &&
                data.map((karyawan: any, i: number) => (
                  <DetailKaryawan
                    key={i}
                    karyawan={karyawan}
                    listKaryawan={data}
                    index={i}
                  />
                ))}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
