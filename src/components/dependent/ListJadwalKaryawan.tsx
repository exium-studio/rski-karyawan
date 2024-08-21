import { Center, StackProps } from "@chakra-ui/react";
import { Interface__Jadwal } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import JadwalKaryawanItem from "./JadwalKaryawanItem";
import Retry from "./Retry";

interface Props extends StackProps {
  user_id?: number;
}

export default function ListJadwalKaryawan({ user_id, ...props }: Props) {
  const { error, notFound, loading, data, retry } = useDataState<
    Interface__Jadwal[]
  >({
    initialData: undefined,
    url: `/api/${user_id}/get-jadwal-karyawan`,
    dependencies: [],
  });

  return (
    <CContainer flex={1} gap={3} {...props}>
      {loading && (
        <CContainer flex={1} gap={3}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} h={"106.5px"} />
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
                data.map((jadwal: any, i: number) => (
                  <JadwalKaryawanItem key={i} data={jadwal} />
                ))}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
