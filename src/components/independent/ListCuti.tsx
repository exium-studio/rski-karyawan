import { Button, HStack, SimpleGrid, StackProps, Text } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__Cuti } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";
import BooleanBadge from "../dependent/BooleanBadge";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {
  loading: boolean;
  data: Interface__Cuti[];
}

export default function ListCuti({ loading, data, ...props }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer gap={3} {...props}>
      {loading &&
        Array.from({ length: 10 }).map((cuti, i) => (
          <Skeleton key={i} h={"185px"} />
        ))}

      {!loading && data && (
        <>
          {data.map((cuti, i) => (
            <CContainer
              key={i}
              p={4}
              borderRadius={12}
              bg={lightDarkColor}
              gap={3}
            >
              <HStack justify={"space-between"} align={"start"}>
                <CContainer gap={1}>
                  <Text opacity={0.4} fontSize={12}>
                    Kategori Cuti
                  </Text>
                  <Text fontWeight={500}>{cuti.kategori.label}</Text>
                </CContainer>

                <BooleanBadge
                  data={cuti.status_cuti}
                  trueValue="Disetujui"
                  falseValue="Tidak DIsetujui"
                  borderRadius={"full"}
                />
              </HStack>

              <CContainer gap={1}>
                <Text opacity={0.4} fontSize={12}>
                  Tanggal Cuti
                </Text>
                <Text fontWeight={500}>{`${formatDate(
                  cuti.tanggal_from,
                  "basicShort"
                )} - ${formatDate(cuti.tanggal_to, "basicShort")}`}</Text>
              </CContainer>

              <SimpleGrid columns={2} gap={6}>
                <CContainer gap={1}>
                  <Text opacity={0.4} fontSize={12}>
                    Total Cuti
                  </Text>
                  <Text fontWeight={500}>{cuti.durasi} Hari</Text>
                </CContainer>

                <CContainer gap={1}>
                  <Text opacity={0.4} fontSize={12}>
                    Disetujui oleh
                  </Text>
                  <Text fontWeight={500}>{"-"}</Text>
                </CContainer>
              </SimpleGrid>
            </CContainer>
          ))}

          <Button
            flexShrink={0}
            colorScheme="ap"
            variant={"ghost"}
            className="clicky"
          >
            Tampilkan Lebih Banyak
          </Button>
        </>
      )}
    </CContainer>
  );
}
