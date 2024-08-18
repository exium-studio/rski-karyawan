import { Box, Button, SimpleGrid, StackProps, Text } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__Lembur } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";
import formatDuration from "../../lib/formatDuration";
import Skeleton from "./Skeleton";
import CContainer from "./wrapper/CContainer";
import isDatePassed from "../../lib/isDatePassed";

interface Props extends StackProps {
  loading: boolean;
  data: Interface__Lembur[] | undefined;
}

export default function ListLembur({ loading, data, ...props }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer gap={3} {...props}>
      {loading && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} h={"130px"} flex={"1 1 150px"} />
          ))}
        </>
      )}
      {!loading &&
        data &&
        data.map((lembur, i) => (
          <CContainer
            key={i}
            p={4}
            borderRadius={12}
            bg={lightDarkColor}
            flex={0}
            gap={3}
            position={"relative"}
          >
            {!isDatePassed(lembur.tgl_pengajuan) && (
              <Box
                w={"6px"}
                h={"6px"}
                borderRadius={"full"}
                bg={"red.400"}
                position={"absolute"}
                top={4}
                right={4}
              />
            )}
            <SimpleGrid columns={2} gap={6}>
              <CContainer gap={1}>
                <Text opacity={0.4} fontSize={12}>
                  Tanggal Lembur
                </Text>
                <Text fontWeight={500}>{`${formatDate(
                  lembur.tgl_pengajuan,
                  "basicShort"
                )}`}</Text>
              </CContainer>

              <CContainer gap={1}>
                <Text opacity={0.4} fontSize={12}>
                  Shift
                </Text>
                <Text fontWeight={500}>{lembur.shift_id}</Text>
              </CContainer>
            </SimpleGrid>

            <SimpleGrid columns={2} gap={6}>
              <CContainer gap={1}>
                <Text opacity={0.4} fontSize={12}>
                  Durasi
                </Text>
                <Text fontWeight={500}>{formatDuration(lembur.durasi)}</Text>
              </CContainer>

              <CContainer gap={1}>
                <Text opacity={0.4} fontSize={12}>
                  Diajukan oleh
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
    </CContainer>
  );
}
