import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DisclosureHeader from "../../../components/dependent/DisclosureHeader";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import StatusApproval2Badge from "../../../components/dependent/StatusApproval2Badge";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import CustomDrawer from "../../../components/independent/wrapper/CustomDrawer";
import {
  useContentBgColor,
  useErrorAlphaColor,
  useLightDarkColor,
} from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import formatDate from "../../../lib/formatDate";
import formatTime from "../../../lib/formatTime";
import Img from "../../../components/dependent/Img";
import backOnClose from "../../../lib/backOnClose";
import timeSince from "../../../lib/timeSince";
import formatNumber from "../../../lib/formatNumber";
import { RiCalendarLine } from "@remixicon/react";

const DetailRiwayat = ({ data }: any) => {
  const errorAlphaColor = useErrorAlphaColor();
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // useBackOnClose(`detail-riwayat-diklat-${data.id}`, isOpen, onOpen, onClose);

  return (
    <>
      <CContainer
        cursor={"pointer"}
        className="clicky"
        flex={0}
        bg={lightDarkColor}
        p={4}
        gap={3}
        onClick={onOpen}
        borderRadius={12}
      >
        <HStack justify={"space-between"} align={"start"}>
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Nama Diklat
            </Text>
            <Text fontWeight={500}>{data.nama}</Text>
          </CContainer>

          <StatusApproval2Badge data={data.status} />
        </HStack>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal
          </Text>
          <Text fontWeight={500}>
            {`${formatDate(data.tgl_mulai, "short")} - ${formatDate(
              data.tgl_selesai,
              "short"
            )}`}
          </Text>
        </CContainer>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Waktu
          </Text>
          <Text fontWeight={500}>
            {`${formatTime(data.jam_mulai)} - ${formatTime(data.jam_selesai)}`}
          </Text>
        </CContainer>
      </CContainer>

      <CustomDrawer
        id={`detail-riwayat-diklat-${data.id}`}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        header={<DisclosureHeader title={"Detail Riwayat Diklat"} />}
        footer={
          <>
            <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button>
          </>
        }
      >
        {data?.alasan && (
          <Alert
            status="error"
            bg={errorAlphaColor}
            alignItems={"start"}
            borderRadius={"0 !important"}
            px={"24px !important"}
            mb={4}
          >
            <AlertIcon />
            <Box>
              <AlertTitle fontWeight={600}>Pengajuan Diklat Ditolak</AlertTitle>
              <AlertDescription>{data?.alasan}</AlertDescription>
            </Box>
          </Alert>
        )}
        {data.gambar && (
          <Img src={data.gambar} fallbackSrc={"/vectors/noImage.svg"} />
        )}

        <CContainer px={6} gap={2}>
          <HStack justify={"space-between"}>
            <Text fontSize={12} opacity={0.4}>
              {timeSince(data?.created_at)}
            </Text>

            {/* <Text fontSize={12} opacity={0.4}>
              Kuota : {data.kuota}
            </Text> */}

            <Text fontWeight={500} fontSize={12}>
              Peserta: {formatNumber(data?.total_peserta) || 0}/{data?.kuota}
            </Text>
          </HStack>

          <Text fontWeight={600} fontSize={16} noOfLines={2}>
            {data?.nama}
          </Text>

          <HStack opacity={0.4}>
            <Icon as={RiCalendarLine} />
            <Text fontSize={12}>{`${formatDate(
              data?.tgl_mulai,
              "short"
            )} - ${formatDate(data?.tgl_selesai, "short")}`}</Text>
          </HStack>

          <Badge
            w={"fit-content"}
            borderRadius={"full"}
            bg={"var(--divider3)"}
            opacity={0.6}
          >
            {data?.kategori?.label}
          </Badge>

          <Text opacity={0.6} mt={4}>
            {data?.deskripsi}
          </Text>
        </CContainer>
      </CustomDrawer>
    </>
  );
};

export default function RiwayatDiklat() {
  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-riwayat-diklat`,
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Riwayat Diklat"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5} gap={3} flex={1}>
        {error && (
          <>
            {notFound && <NotFound />}

            {!notFound && (
              <Box my={"auto"}>
                <Retry loading={loading} retry={retry} />
              </Box>
            )}
          </>
        )}

        {!error && (
          <>
            {loading && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} h={"185px"} />
                ))}
              </>
            )}

            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && (
                  <NoData label="Tidak ada riwayat" />
                )}

                {(data || (data && data.length > 0)) &&
                  data.map((riwayat: any, i: number) => {
                    return <DetailRiwayat key={i} data={riwayat.diklat} />;
                  })}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
