import { Alert, Box, Icon, Text } from "@chakra-ui/react";
import { RiArrowUpCircleLine, RiHistoryLine } from "@remixicon/react";
import Retry from "../../../components/dependent/Retry";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import UbahDataKeluargaForm from "./UbahDataKeluargaForm";

const UbahDataForm = ({ data }: any) => {
  // SX

  return (
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
          untuk mengajukan perubahan data. Data di database tidak akan berubah
          jika tidak meneken tombol tersebut. Riwayat perubahan dapat dilihat di{" "}
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

      <CContainer flex={0} borderRadius={12}>
        <UbahDataKeluargaForm data={data} />
      </CContainer>
    </>
  );
};

export default function UbahDataKeluarga({ tabIndex }: any) {
  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: "/api/get-data-keluarga",
    conditions: tabIndex === 1,
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer
      flex={1}
      p={5}
      pb={8}
      bg={contentBgColor}
      minW={"100%"}
      scrollSnapAlign={"center"}
      // h={"calc(100vh - 56px - 40px)"}
      overflowY={"auto"}
      minH={"calc(100vh - 96px)"}
    >
      {error && (
        <>
          {!notFound && (
            <Box my={"auto"}>
              <Retry loading={loading} retry={retry} />
            </Box>
          )}

          {notFound && <UbahDataForm data={data} />}
        </>
      )}

      {!error && (
        <>
          {loading && (
            <>
              <Skeleton flexShrink={0} h={"137px"} mb={3} />

              <Skeleton flex={1} minH={"1200px"} mx={"auto"} />
            </>
          )}

          {!loading && <UbahDataForm data={data} />}
        </>
      )}
    </CContainer>
  );
}
