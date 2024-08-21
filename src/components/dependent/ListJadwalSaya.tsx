import { Center, StackProps } from "@chakra-ui/react";
import { Interface__Jadwal } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import useScrollToTop from "../../hooks/useScrollToTop";
import formatDate from "../../lib/formatDate";
import DetailJadwal from "../../pages/main/Jadwal/DetailJadwal";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import Retry from "./Retry";

interface Props extends StackProps {
  dateRange: { from: Date; to: Date };
}

export default function ListJadwalSaya({ dateRange, ...props }: Props) {
  useScrollToTop();

  const { error, notFound, loading, data, retry } = useDataState<
    Interface__Jadwal[]
  >({
    initialData: undefined,
    url: "/api/get-jadwal",
    payload: {
      tgl_mulai: formatDate(dateRange?.from, "short2"),
      tgl_selesai: formatDate(dateRange?.to, "short2"),
    },
    dependencies: [dateRange],
  });

  return (
    <CContainer flex={1} gap={3} {...props}>
      {error && (
        <>
          {notFound && <NoData minH={"132px"} label="Tidak ada jadwal" />}

          {!notFound && (
            <Center my={"auto"} minH={"300px"}>
              <Retry loading={loading} retry={retry} />
            </Center>
          )}
        </>
      )}

      {!error &&
        loading &&
        Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} h={"114px"} />
        ))}

      {!error && !loading && !data && <NoData label="Tidak ada jadwal" />}

      {!error &&
        !loading &&
        data &&
        data?.length > 0 &&
        data.map((jadwal, i) => (
          <DetailJadwal key={i} jadwal={jadwal} listJadwal={data} index={i} />
          // <Box
          //   key={i}
          //   onClick={() => {
          //     setDetailJadwalIndex(i);
          //   }}
          // >
          //   <JadwalItem data={jadwal} h={"114px"} />
          // </Box>
        ))}
    </CContainer>
  );
}
