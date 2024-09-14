import { Center, Wrap } from "@chakra-ui/react";
import { RiBarChartFill, RiLineChartFill } from "@remixicon/react";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import Retry from "./Retry";
import StatistikCutiItem from "./StatistikCutiItem";

export default function StatistikCuti() {
  // SX

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: "/api/get-statistik-cuti",
    dependencies: [],
  });

  return (
    <>
      <Wrap spacing={3}>
        {loading && (
          <>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} minH={"100px"} flex={"1 1 150px"} />
            ))}
          </>
        )}

        {!loading && (
          <>
            {error && (
              <>
                {notFound && <NoData minH={"132px"} label="Tidak ada jadwal" />}

                {!notFound && (
                  <Center m={"auto"} minH={"300px"}>
                    <Retry loading={loading} retry={retry} />
                  </Center>
                )}
              </>
            )}

            {!error && (
              <>
                {data &&
                  data.map((tipeCuti: any, i: number) => {
                    return (
                      <StatistikCutiItem
                        key={i}
                        index={i}
                        data={tipeCuti}
                        icon={tipeCuti.kuota ? RiBarChartFill : RiLineChartFill}
                        flex={"1 1 150px"}
                      />
                    );
                  })}
              </>
            )}
          </>
        )}
      </Wrap>
    </>
  );
}
