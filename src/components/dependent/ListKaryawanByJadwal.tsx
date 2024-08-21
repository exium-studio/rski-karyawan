import { Center, StackProps } from "@chakra-ui/react";
import useDataState from "../../hooks/useDataState";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import KaryawanItem from "./KaryawanItem";
import Retry from "./Retry";

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
              {data &&
                data.map((karyawan: any, i: number) => (
                  <KaryawanItem key={i} data={karyawan} noStatus />
                ))}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
