import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiFileLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import dataLabels from "../../constant/dataLabels";
import formatDate from "../../lib/formatDate";
import FlexLine from "../independent/FlexLine";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import BooleanBadge from "./BooleanBadge";
import DrawerHeader from "./DrawerHeader";
import backOnClose from "../../lib/backOnClose";
import formatNumber from "../../lib/formatNumber";
import { Link } from "react-router-dom";

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
        return <Text>{data[type]}</Text>;
      case "foto_profil":
        return (
          <Image
            src={data[type]}
            aspectRatio={1}
            objectFit={"cover"}
            borderRadius={"full"}
          />
        );
      case "tgl_lahir":
        return <Text whiteSpace={"nowrap"}>{formatDate(data[type])}</Text>;
      case "golongan_darah":
      case "agama":
        return <Text whiteSpace={"nowrap"}>{data[type].label}</Text>;
      case "tinggi_badan":
        return <Text whiteSpace={"nowrap"}>{formatNumber(data[type])} cm</Text>;
      case "ktp":
      case "bpjsksh":
      case "bpjsktk":
      case "ijazah":
      case "sertifikat_kompetensi":
        return (
          <Link to={data[type]}>
            <CContainer
              p={4}
              borderRadius={8}
              align={"center"}
              // border={"1px solid var(--divider)"}
            >
              <Icon as={RiFileLine} fontSize={52} />
              <Text fontSize={12} mt={2} noOfLines={1} opacity={0.4}>
                {data[type]}
              </Text>
            </CContainer>
          </Link>
        );
    }
  };

  // SX
  const lightDarkColor = useLightDarkColor();

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

          <BooleanBadge
            data={data.status_perubahan}
            nullValue="Menunggu"
            trueValue="Disetujui"
            falseValue="Tidak Disetujui"
            borderRadius={"full"}
          />
        </HStack>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal Pengajuan
          </Text>
          <Text fontWeight={500}>{formatDate(data.created_at)}</Text>
        </CContainer>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal Persetujuan
          </Text>
          <Text fontWeight={500}>{formatDate(data.tgl_disetujui)}</Text>
        </CContainer>
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
        <CContainer
          gap={3}
          flex={0}
          px={6}
          py={5}
          borderTop={"6px solid var(--divider)"}
        >
          <Text fontWeight={500}>Rincian Pengajuan</Text>

          <HStack>
            <Text opacity={0.4}>Kolom</Text>
            <FlexLine />
            <Text>
              {/* @ts-ignore */}
              {dataLabels[data.kolom]}
            </Text>
          </HStack>

          <HStack>
            <Text opacity={0.4}>Tanggal Pengajuan</Text>
            <FlexLine />
            <Text>{formatDate(data.created_at)}</Text>
          </HStack>

          <HStack>
            <Text opacity={0.4}>Tanggal Persetujuan</Text>
            <FlexLine />
            <Text>{formatDate(data.tgl_disetujui)}</Text>
          </HStack>

          <HStack>
            <Text opacity={0.4}>Status Pengajuan</Text>
            <FlexLine />
            <BooleanBadge
              data={data.status_perubahan}
              nullValue="Menunggu"
              trueValue="Disetujui"
              falseValue="Tidak Disetujui"
              borderRadius={"full"}
            />
          </HStack>
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
