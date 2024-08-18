import { Box, StackProps } from "@chakra-ui/react";
import { dummyMySchedules } from "../../constant/dummy";
import { Interface__Jadwal } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import useScrollToTop from "../../hooks/useScrollToTop";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import NoData from "../independent/NoData";
import JadwalItem from "./JadwalItem";
import Retry from "./Retry";
import useDetailJadwal from "../../global/useDetailJadwal";

interface Props extends StackProps {
  dateRange: { from: Date; to: Date };
}

export default function ListJadwalSaya({ dateRange, ...props }: Props) {
  useScrollToTop();

  const { error, loading, data, retry } = useDataState<Interface__Jadwal[]>({
    initialData: dummyMySchedules,
    url: "",
    dependencies: [dateRange],
  });

  const { setDetailJadwalIndex } = useDetailJadwal();

  return (
    <CContainer gap={3} {...props}>
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}

      {!error &&
        loading &&
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} h={"114px"} />
        ))}

      {!error && !loading && !data && <NoData label="Tidak ada jadwal" />}

      {!error &&
        !loading &&
        data &&
        data?.length > 0 &&
        data.map((jadwal, i) => (
          <Box
            key={i}
            onClick={() => {
              setDetailJadwalIndex(i);
            }}
          >
            <JadwalItem data={jadwal} h={"114px"} />
          </Box>
        ))}
    </CContainer>
  );
}
