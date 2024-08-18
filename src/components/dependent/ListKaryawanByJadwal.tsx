import { Box, StackProps } from "@chakra-ui/react";
import KaryawanItem from "./KaryawanItem";
import CContainer from "../independent/wrapper/CContainer";
import { Interface__Karyawan } from "../../constant/interfaces";
import NoData from "../independent/NoData";
import useDetailKaryawan from "../../global/useDetailKaryawan";

interface Props extends StackProps {
  data: Interface__Karyawan[] | undefined;
}

export default function ListKaryawanByJadwal({ data, ...props }: Props) {
  const { setDetailKaryawanId } = useDetailKaryawan();

  return (
    <CContainer gap={3} {...props}>
      {!data && <NoData label="Tidak ada karyawan" />}

      {data &&
        data.map((karyawan, i) => (
          <Box
            key={i}
            onClick={() => {
              setDetailKaryawanId(karyawan.id);
            }}
          >
            <KaryawanItem key={i} data={karyawan} noStatus />
          </Box>
        ))}
    </CContainer>
  );
}
