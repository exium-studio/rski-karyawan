import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiArrowUpDownLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiUserLine,
} from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__TukarJadwal } from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import BackOnCloseButton from "../independent/BackOnCloseButton";
import FlexLine from "../independent/FlexLine";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import BooleanBadge from "./BooleanBadge";
import DrawerHeader from "./DrawerHeader";
import JadwalDitukarItem from "./JadwalDitukarItem";

interface Props {
  data: Interface__TukarJadwal;
}

const BatalkanTukarJadwal = ({ data }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function batalkan() {
    //TODO api batalkan penukaran jadawal
  }

  return (
    <>
      <Button
        colorScheme="red"
        variant={"outline"}
        className="clicky"
        w={"100%"}
        onClick={onOpen}
        isDisabled={data.status_penukaran !== null ? true : false}
      >
        Batalkan
      </Button>

      <CustomDrawer
        id={`batalkan-tukar-jadwal-confirmation-${data.id}`}
        name={`${data.id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"} align={"start"}>
              <Text fontSize={20} fontWeight={500}>
                Batalkan Tukar Jadwal
              </Text>

              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
        footer={
          <>
            <Button
              className="btn-solid clicky"
              w={"100%"}
              onClick={backOnClose}
            >
              Tidak
            </Button>

            <Button
              colorScheme="red"
              className="clicky"
              w={"100%"}
              onClick={batalkan}
            >
              Ya
            </Button>
          </>
        }
      >
        <CContainer px={6}>
          <Text>Apakah anda yakin akan membatalkan penukaran jadwal ini?</Text>
        </CContainer>
      </CustomDrawer>
    </>
  );
};

export default function TukarJadwalItem({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CContainer
        p={4}
        borderRadius={12}
        bg={lightDarkColor}
        className="clicky"
        cursor={"pointer"}
        gap={3}
        onClick={onOpen}
      >
        <HStack justify={"space-between"} align={"start"}>
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Jenis Penukaran
            </Text>
            <Text fontWeight={500}>{data?.kategori_pengajuan?.label}</Text>
          </CContainer>

          <BooleanBadge
            data={data.status_penukaran}
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
          <Text fontWeight={500}>
            {formatDate(data.created_at, "basicShort")}
          </Text>
        </CContainer>

        <SimpleGrid columns={2} gap={6}>
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Karyawan Ditukar
            </Text>
            <Text fontWeight={500}>{data.user_ditukar.nama}</Text>
          </CContainer>

          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Disetujui oleh
            </Text>
            <Text fontWeight={500}>{"-"}</Text>
          </CContainer>
        </SimpleGrid>
      </CContainer>

      <CustomDrawer
        id="detail-data-tukar-jadwal"
        name={data.id.toString()}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Detail Tukar Jadwal" />}
      >
        <CContainer>
          <CContainer pb={0}>
            {/* Profil User Ditukar */}
            <CContainer
              bg={lightDarkColor}
              gap={3}
              flex={0}
              px={6}
              py={5}
              borderTop={"6px solid var(--divider)"}
            >
              <Text fontWeight={500} mb={4}>
                Karyawan Ditukar
              </Text>

              <Avatar
                name={data?.user_ditukar.nama}
                src={data?.user_ditukar.foto_profil || ""}
                size={"xl"}
                mx={"auto"}
                w={"150px"}
                h={"150px"}
                mb={4}
              />

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Jenis Penukaran</Text>
                <FlexLine />
                <Text fontWeight={500}>{data?.kategori_pengajuan?.label}</Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Nama</Text>
                <FlexLine />
                <Text fontWeight={500}>{data.user_ditukar.nama}</Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Tanggal Pengajuan</Text>
                <FlexLine />
                <Text fontWeight={500}>{formatDate(data.created_at)}</Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Status Penukaran</Text>
                <FlexLine />
                <BooleanBadge
                  w={"fit-content"}
                  mb={1}
                  data={data.status_penukaran}
                  nullValue="Menunggu"
                  trueValue="Disetujui"
                  falseValue="Tidak Disetujui"
                  borderRadius={"full"}
                />
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Disetujui oleh</Text>
                <FlexLine />
                <Text fontWeight={500}>-</Text>
              </HStack>
            </CContainer>

            {/* Jadwal yang Ditukar */}
            <CContainer pt={5} borderTop={"6px solid var(--divider)"}>
              <Text px={6} fontWeight={500} mb={4}>
                Penukaran Jadwal{" "}
                <span style={{ opacity: 0.3, fontSize: 12, fontWeight: 400 }}>
                  ( jadwal anda di kanan )
                </span>
              </Text>

              <CContainer>
                <HStack px={6}>
                  <JadwalDitukarItem
                    data={data.jadwal_ditukar}
                    noArrow
                    className=""
                    _active={{ opacity: 1 }}
                    cursor={"auto"}
                    flex={1}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  />
                  <Icon
                    as={RiArrowUpDownLine}
                    transform={"rotate(90deg)"}
                    mx={5}
                  />
                  <CContainer
                    position={"relative"}
                    flex={1}
                    borderRadius={12}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  >
                    <Icon
                      as={RiUserLine}
                      color={"p.500"}
                      position={"absolute"}
                      top={0}
                      right={0}
                    />
                    <JadwalDitukarItem
                      data={data.jadwal_pengajuan}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                    />
                  </CContainer>
                </HStack>

                <Box h={"1px"} w={"100%"} bg={"var(--divider)"} my={4} />

                <HStack px={6}>
                  <JadwalDitukarItem
                    data={data.jadwal_ditukar}
                    noArrow
                    className=""
                    _active={{ opacity: 1 }}
                    cursor={"auto"}
                    flex={1}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  />
                  <Icon
                    as={RiArrowUpDownLine}
                    transform={"rotate(90deg)"}
                    mx={5}
                  />
                  <CContainer
                    position={"relative"}
                    flex={1}
                    borderRadius={12}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  >
                    <Icon
                      as={RiUserLine}
                      color={"p.500"}
                      position={"absolute"}
                      top={0}
                      right={0}
                    />
                    <JadwalDitukarItem
                      data={data.jadwal_pengajuan}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                    />
                  </CContainer>
                </HStack>
              </CContainer>
            </CContainer>
          </CContainer>

          <CContainer
            pb={8}
            gap={2}
            px={6}
            flex={0}
            pt={6}
            // borderTop={"6px solid var(--divider)"}
          >
            {data.user_ditukar.id !== 1 && <BatalkanTukarJadwal data={data} />}

            {data.user_ditukar.id === 1 && (
              <>
                <Button
                  w={"100%"}
                  colorScheme="red"
                  variant={"outline"}
                  className="clicky"
                  isDisabled={data.status_penukaran !== null}
                  // border={"1px solid var(--divider3)"}
                  leftIcon={<Icon as={RiCloseCircleLine} fontSize={iconSize} />}
                >
                  Tolak
                </Button>
                <Button
                  w={"100%"}
                  colorScheme="green"
                  variant={"outline"}
                  className="clicky"
                  isDisabled={data.status_penukaran !== null}
                  // border={"1px solid var(--divider3)"}
                  leftIcon={
                    <Icon as={RiCheckboxCircleLine} fontSize={iconSize} />
                  }
                >
                  Terima
                </Button>
              </>
            )}
          </CContainer>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
