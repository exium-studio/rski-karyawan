import { Wrap } from "@chakra-ui/react";
import { RiBarChartFill, RiLineChartFill } from "@remixicon/react";
import Skeleton from "../independent/Skeleton";
import StatistikCutiItem from "./StatistikCutiItem";

interface Props {
  loading: boolean;
  data: any | undefined;
}
export default function StatistikCuti({ loading, data }: Props) {
  // SX

  return (
    <>
      <Wrap spacing={3}>
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} minH={"100px"} flex={"1 1 150px"} />
            ))}
          </>
        )}

        {!loading &&
          data &&
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
      </Wrap>
    </>
  );
}
