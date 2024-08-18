import { StackProps } from "@chakra-ui/react";
import JadwalKaryawanItem from "./JadwalKaryawanItem";
import { Interface__Jadwal } from "../../constant/interfaces";
import CContainer from "../independent/wrapper/CContainer";
import NoData from "../independent/NoData";

interface Props extends StackProps {
  userId?: number;
  data: Interface__Jadwal[] | undefined;
}

export default function ListJadwalKaryawan({ userId, data, ...props }: Props) {
  return (
    <CContainer align={"stretch"} w={"100%"} gap={3} {...props}>
      {!data && <NoData />}

      {data &&
        data.map((jadwal, i) => (
          <JadwalKaryawanItem
            key={i}
            userId={userId}
            data={jadwal}
            h={"114px"}
          />
        ))}
    </CContainer>
  );
}
