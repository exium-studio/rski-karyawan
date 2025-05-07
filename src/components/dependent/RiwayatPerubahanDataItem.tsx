import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiFileLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useErrorAlphaColor, useLightDarkColor } from "../../constant/colors";
import dataLabels from "../../constant/dataLabels";
import { iconSize } from "../../constant/sizes";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import FlexLine from "../independent/FlexLine";
import NoData from "../independent/NoData";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import BooleanBadge from "./BooleanBadge";
import DisclosureHeader from "./DisclosureHeader";
import DrawerHeader from "./DrawerHeader";
import StatusApprovalBadge from "./StatusApprovalBadge";

const ListKeluargaDrawer = ({ data, index }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(data);

  return (
    <>
      <Button
        colorScheme="ap"
        variant={"ghost"}
        className="btn-clear clicky"
        onClick={onOpen}
      >
        Lihat
      </Button>

      <CustomDrawer
        id={`anggota-keluarga-modal-${index}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Data Keluarga" />}
        footer={
          <Button className="btn-solid clicky" onClick={backOnClose}>
            Mengerti
          </Button>
        }
      >
        <CContainer px={6} gap={3}>
          {data?.length > 0 && (
            <>
              {data?.map((anggota: any, i: number) => (
                <CContainer
                  key={i}
                  borderBottom={
                    i !== data?.length - 1 ? "1px solid var(--divider)" : ""
                  }
                  // pt={i !== 0 ? 4 : 0}
                  // pb={i !== data?.length - 1 ? 4 : 0}
                  p={4}
                  borderRadius={8}
                  gap={2}
                  bg={"var(--divider)"}
                >
                  <Text fontWeight={600}>{anggota?.nama_keluarga}</Text>
                  <HStack>
                    <Text opacity={0.4}>Hubungan Keluarga</Text>
                    <FlexLine />
                    <Text>{anggota?.hubungan}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Status Hidup</Text>
                    <FlexLine />
                    <Text>
                      {anggota?.status_hidup ? "Aktif" : "Tidak Aktif"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Jenis Kelamin</Text>
                    <FlexLine />
                    <Text>
                      {anggota?.jenis_kelamin ? "Laki-laki" : "Perempuan"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Tempat Lahir</Text>
                    <FlexLine />
                    <Text>{anggota?.tempat_lahir}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Tanggal Lahir</Text>
                    <FlexLine />
                    <Text>{formatDate(anggota?.tgl_lahir)}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Pendidikan Terakhir</Text>
                    <FlexLine />
                    <Text>{anggota?.pendidikan_terakhir?.label}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Agama</Text>
                    <FlexLine />
                    <Text>{anggota?.agama?.label}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Golongan Darah</Text>
                    <FlexLine />
                    <Text>{anggota?.kategori_darah?.label}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Pekerjaan</Text>
                    <FlexLine />
                    <Text>{anggota?.pekerjaan}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Nomor Telepon</Text>
                    <FlexLine />
                    <Text>{anggota?.no_hp}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Email</Text>
                    <FlexLine />
                    <Text>{anggota?.email}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>No. Rekam Medis</Text>
                    <FlexLine />
                    <Text>{anggota?.no_rm}</Text>
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Tanggungan BPJS</Text>
                    <FlexLine />
                    <BooleanBadge
                      data={anggota.is_bpjs}
                      trueValue="Ditanggung"
                      falseValue="Tidak Ditanggung"
                    />
                  </HStack>
                  <HStack>
                    <Text opacity={0.4}>Sudah Menikah</Text>
                    <FlexLine />
                    <BooleanBadge
                      data={anggota?.is_menikah}
                      trueValue="Menikah"
                      falseValue="Belum Menikah"
                    />
                  </HStack>
                </CContainer>
              ))}
            </>
          )}

          {(!data || data?.length === 0) && <NoData minH={"300px"} />}
        </CContainer>
      </CustomDrawer>
    </>
  );
};

interface Props {
  data: any;
}
interface DataRendererProps {
  kolom: string;
  type: string;
}

export default function RiwayatPerubahanDataItem({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(data);

  const PerubahanDataRenderer = ({ kolom, type }: DataRendererProps) => {
    switch (kolom) {
      default:
        return <Text>Invalid</Text>;
      case "pendidikan_terakhir":
        return <Text>{data[type]?.label || "-"}</Text>;
      case "data keluarga":
      case "Data Keluarga":
        return <ListKeluargaDrawer data={data[type]} />;
      case "foto_profil":
        return (
          <Image
            maxW={"32px"}
            src={data[type]}
            aspectRatio={1}
            objectFit={"cover"}
            borderRadius={"full"}
          />
        );
      case "tgl_lahir":
        return <Text whiteSpace={"nowrap"}>{formatDate(data[type])}</Text>;
      case "jenis_kelamin":
        return (
          <Text whiteSpace={"nowrap"}>
            {data[type] ? "Laki - laki" : "Perempuan"}
          </Text>
        );
      case "golongan_darah":
      case "agama":
        return <Text whiteSpace={"nowrap"}>{data[type].label}</Text>;
      case "tinggi_badan":
        return <Text whiteSpace={"nowrap"}>{formatNumber(data[type])} cm</Text>;
      case "berat_badan":
        return <Text whiteSpace={"nowrap"}>{formatNumber(data[type])} kg</Text>;
      case "alamat":
      case "tempat_lahir":
      case "no_hp":
      case "nik_ktp":
      case "no_kk":
      case "no_ijazah":
      case "tahun_lulus":
      case "gelar_depan":
      case "gelar_belakang":
      case "riwayat_penyakit":
      case "asal_sekolah":
        return <Text>{typeof data[type] === "string" ? data[type] : "-"}</Text>;
      case "ktp":
      case "bpjsksh":
      case "bpjsktk":
      case "ijazah":
      case "sertifikat_kompetensi":
        return (
          <Link to={data[type]}>
            <HStack p={4} borderRadius={8} align={"center"}>
              <Icon as={RiFileLine} fontSize={iconSize} />
              <Text fontSize={12} mt={2} noOfLines={1} opacity={0.4}>
                {data[type]}
              </Text>
            </HStack>
          </Link>
        );
    }
  };

  // SX
  const lightDarkColor = useLightDarkColor();
  const errorAlphaColor = useErrorAlphaColor();

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
              Kolom Data
            </Text>
            <Text fontWeight={500}>
              {/* @ts-ignore */}
              {dataLabels[data.kolom]}
            </Text>
          </CContainer>

          <StatusApprovalBadge data={data.status_perubahan_id} />
        </HStack>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal Pengajuan
          </Text>
          <Text fontWeight={500}>{formatDate(data.created_at)}</Text>
        </CContainer>

        {/* <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal Persetujuan
          </Text>
          <Text fontWeight={500}>{formatDate(data.tgl_disetujui)}</Text>
        </CContainer> */}
      </CContainer>

      <CustomDrawer
        id={`riwayat-perubahan-data-${data.id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Detail Perubahan Data" />}
        footer={
          <>
            <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button>
          </>
        }
      >
        <CContainer pb={0}>
          {data?.alasan && (
            <Alert
              status="error"
              bg={errorAlphaColor}
              alignItems={"start"}
              borderRadius={"0 !important"}
              px={"24px !important"}
            >
              <AlertIcon />
              <Box>
                <AlertTitle fontWeight={600}>Perubahan Data Ditolak</AlertTitle>
                <AlertDescription>{data?.alasan}</AlertDescription>
              </Box>
            </Alert>
          )}

          <CContainer
            gap={3}
            flex={0}
            px={6}
            py={5}
            borderTop={data?.alasan ? "" : "6px solid var(--divider)"}
          >
            <Text fontWeight={500}>Rincian Pengajuan</Text>

            <HStack>
              <Text opacity={0.4}>Kolom</Text>
              <FlexLine />
              <Text>
                {/* @ts-ignore */}
                {dataLabels[data.kolom] || "Invalid"}
              </Text>
            </HStack>

            <HStack>
              <Text opacity={0.4}>Tanggal Pengajuan</Text>
              <FlexLine />
              <Text>{formatDate(data.created_at)}</Text>
            </HStack>

            {/* <HStack>
              <Text opacity={0.4}>Tanggal Persetujuan</Text>
              <FlexLine />
              <Text>{formatDate(data.updated_at)}</Text>
            </HStack> */}

            <HStack>
              <Text opacity={0.4}>Status Pengajuan</Text>
              <FlexLine />
              <StatusApprovalBadge data={data.status_perubahan_id} />
            </HStack>
          </CContainer>
        </CContainer>

        <CContainer
          gap={1}
          flex={0}
          px={6}
          pt={5}
          borderTop={"6px solid var(--divider)"}
        >
          <Text fontWeight={500} mb={2}>
            Data Pengajuan
          </Text>

          <HStack>
            <Text flex={1} opacity={0.4}>
              Original
            </Text>

            <Icon opacity={0} as={RiArrowRightLine} mx={5} />

            <Text flex={1} opacity={0.4}>
              Pengajuan
            </Text>
          </HStack>

          <HStack>
            <Box flex={1}>
              <PerubahanDataRenderer
                kolom={data.kolom}
                type={"original_data"}
              />
            </Box>

            <Icon as={RiArrowRightLine} mx={5} />

            <Box flex={1}>
              <PerubahanDataRenderer kolom={data.kolom} type={"updated_data"} />
            </Box>
          </HStack>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
