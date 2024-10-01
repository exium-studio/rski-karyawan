import { Avatar, HStack, StackProps, Text, Tooltip } from "@chakra-ui/react";
import { Interface__UnitKerja } from "../../constant/interfaces";
import BooleanBadge from "./BooleanBadge";
import { ReactNode } from "react";
import CContainer from "../independent/wrapper/CContainer";

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
    <HStack w={"100%"} gap={3} {...props}>
      <Avatar
        cursor={"pointer"}
        src={data.foto_profil || ""}
        name={data.nama}
        size={data.unit_kerja ? "md" : "sm"}
      />

      <CContainer
        w={"100%"}
        gap={2}
        overflow={"hidden"}
        // border={"1px solid yellow"}
      >
        <Tooltip
          w={"100%"}
          label={data.nama}
          placement="right"
          openDelay={500}
          // border={"1px solid green"}
        >
          <Text
            w={"100%"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            // border={"1px solid blue"}
          >
            {data.fullName || data.nama}
          </Text>
        </Tooltip>

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
