import { Alert, Box, Icon, Text } from "@chakra-ui/react";
import Retry from "../../../components/dependent/Retry";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { dummyDetailKaryawan } from "../../../constant/dummy";
import useDataState from "../../../hooks/useDataState";
import UbahDataPersonalForm from "./UbahDataPersonalForm";
import { RiArrowUpCircleLine, RiHistoryLine } from "@remixicon/react";

export default function UbahDataPersonal() {
  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyDetailKaryawan,
    url: "",
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer
      p={5}
      pb={8}
      bg={contentBgColor}
      minW={"100%"}
      scrollSnapAlign={"center"}
      overflowY={"auto"}
    >
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}

      {!error && (
        <>
          {loading && (
            <>
              <Skeleton flexShrink={0} h={"137px"} mb={3} />

              <Skeleton flex={1} minH={"1200px"} mx={"auto"} />
            </>
          )}

          {!loading && (
            <>
              <Alert flexShrink={0} status="info" p={4} borderRadius={8} mb={3}>
                <Text fontSize={14}>
                  Tekan{" "}
                  <span>
                    <Icon
                      as={RiArrowUpCircleLine}
                      fontSize={20}
                      color={"p.500"}
                      mb={"-5px"}
                    />
                  </span>{" "}
                  untuk mengajukan perubahan data. Data di database tidak akan
                  berubah jika tidak meneken tombol tersebut. Riwayat perubahan
                  dapat dilihat di{" "}
                  <span>
                    <Icon
                      as={RiHistoryLine}
                      fontSize={19}
                      color={"p.500"}
                      mb={"-5px"}
                    />
                  </span>
                  . Setiap permintaan perubahan data pada kolom yang sama akan
                  menggantikan permintaan sebelumnya yang masih menunggu.
                </Text>
              </Alert>

              <CContainer bg={lightDarkColor} borderRadius={12} p={4}>
                <UbahDataPersonalForm data={data} />
              </CContainer>
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
