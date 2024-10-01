import { Avatar, HStack, StackProps, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Interface__UnitKerja } from "../../constant/interfaces";
import CContainer from "../independent/wrapper/CContainer";
import BooleanBadge from "./BooleanBadge";

interface Props extends StackProps {
  detailKaryawanId?: string;
  data: {
    id: number;
    nama: string;
    fullName?: string;
    foto_profil: string | null;
    unit_kerja?: Interface__UnitKerja;
  };
  addition?: ReactNode;
}

export default function AvatarAndNameTableData({
  detailKaryawanId,
  data,
  addition,
  ...props
}: Props) {
  return (
    <HStack flex={1} {...props}>
      <Avatar
        cursor={"pointer"}
        src={data.foto_profil || ""}
        name={data.nama}
        size={data.unit_kerja ? "md" : "sm"}
      />

      <CContainer flex={1} gap={2} overflow={"hidden"}>
        <Text className="noofline-1">{data.fullName || data.nama}</Text>

        {(data.unit_kerja || addition) && (
          <HStack>
            {data.unit_kerja && (
              <BooleanBadge
                data={parseInt(
                  data.unit_kerja.jenis_karyawan as unknown as string
                )}
                colorScheme={
                  parseInt(data.unit_kerja.jenis_karyawan as unknown as string)
                    ? "cyan"
                    : "orange"
                }
                trueValue="Shift"
                falseValue="Non-Shift"
                w={"100px"}
              />
            )}

            {addition}
          </HStack>
        )}
      </CContainer>
    </HStack>
  );
}
