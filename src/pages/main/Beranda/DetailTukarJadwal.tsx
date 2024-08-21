import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../../../components/dependent/Header";
import BackOnCloseButton from "../../../components/independent/BackOnCloseButton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import CustomDrawer from "../../../components/independent/wrapper/CustomDrawer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import {
  dummyPengajuanTukarJadwals,
  dummyPermintaanTukarJadwals,
} from "../../../constant/dummy";
import { Interface__TukarJadwal } from "../../../constant/interfaces";
import useScrollToTop from "../../../hooks/useScrollToTop";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import BooleanBadge from "../../../components/dependent/BooleanBadge";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "@remixicon/react";
import JadwalItem from "../../../components/dependent/JadwalItem";
import { iconSize } from "../../../constant/sizes";
import { useParams } from "react-router-dom";
import { getCookie } from "typescript-cookie";

interface PropsBatalkan {
  data: Interface__TukarJadwal;
}

const BatalkanTukarJadwal = ({ data }: PropsBatalkan) => {
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
        id="batalkan-tukar-jadwal-confirmation"
        name={data.id.toString()}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"} align={"start"}>
              <Text fontSize={16} fontWeight={600}>
                Batalkan Tukar Jadwal
              </Text>

              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
        footer={
          <>
            <Button
              className="btn-outline clicky"
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

export default function DetailTukarJadwal() {
  useScrollToTop();

  const { tukar_jadwal_id } = useParams();
  const user = JSON.parse(getCookie("userData") as string);

  const [data] = useState<any | undefined>(
    user.user.id === 1
      ? dummyPengajuanTukarJadwals[parseInt(tukar_jadwal_id as string) - 1]
      : dummyPermintaanTukarJadwals[parseInt(tukar_jadwal_id as string) - 1]
  );

  console.log(user);

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Box position={"sticky"} top={"0"} bg={lightDarkColor} zIndex={2}>
        <Header left={"back"} title="Detail Pengajuan" px={4} />
      </Box>

      {data && (
        <>
          <CContainer bg={contentBgColor} p={5} pb={0}>
            <CContainer
              bg={lightDarkColor}
              borderRadius={12}
              gap={3}
              p={5}
              mb={5}
              flex={0}
            >
              <Avatar
                name={data?.user_ditukar.nama}
                src={data?.user_ditukar.foto_profil || ""}
                mx={"auto"}
                size={"xl"}
                mb={4}
              />

              <CContainer gap={1} flex={0}>
                <Text opacity={0.4} fontSize={12}>
                  Jenis Penukaran
                </Text>
                <Text fontWeight={600}>{data.jenis_penukaran.label}</Text>
              </CContainer>

              <CContainer gap={1} flex={0}>
                <Text opacity={0.4} fontSize={12}>
                  Karyawan Ditukar
                </Text>
                <Text fontWeight={600}>{data.user_ditukar.nama}</Text>
              </CContainer>

              <CContainer gap={1} flex={0}>
                <Text opacity={0.4} fontSize={12}>
                  Tanggal Pengajuan
                </Text>
                <Text fontWeight={600}>{formatDate(data.created_at)}</Text>
              </CContainer>

              <SimpleGrid columns={2} gap={5}>
                <CContainer gap={1} flex={0}>
                  <Text opacity={0.4} fontSize={12}>
                    Status Penukaran
                  </Text>
                  <BooleanBadge
                    w={"fit-content"}
                    mb={1}
                    data={data.status_penukaran}
                    nullValue="Menunggu"
                    trueValue="Disetujui"
                    falseValue="Tidak DIsetujui"
                  />
                </CContainer>

                <CContainer gap={1} flex={0}>
                  <Text opacity={0.4} fontSize={12}>
                    Disetujui oleh
                  </Text>
                  <Text fontWeight={600}>-</Text>
                </CContainer>
              </SimpleGrid>
            </CContainer>

            <Text fontWeight={600} mb={2} px={1}>
              Jadwal yang Ditukar
            </Text>

            <CContainer gap={3}>
              <CContainer
                bg={lightDarkColor}
                borderRadius={12}
                gap={3}
                p={5}
                flex={0}
              >
                <CContainer gap={2} flex={0}>
                  <HStack
                    borderRadius={8}
                    border={"1px solid var(--divider3)"}
                    align={"stretch"}
                    overflow={"clip"}
                    minH={"110px"}
                    gap={0}
                  >
                    <VStack w={"80px"} bg={"var(--divider)"} justify={"center"}>
                      <VStack gap={0}>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Jadwal
                        </Text>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Ditukar
                        </Text>
                      </VStack>
                      <Icon
                        as={RiArrowDownLine}
                        fontSize={32}
                        color={"p.500"}
                      />
                    </VStack>

                    <JadwalItem
                      as={HStack}
                      data={data.jadwal_ditukar}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                      flex={1}
                    />
                  </HStack>

                  <HStack
                    borderRadius={8}
                    border={"1px solid var(--divider3)"}
                    align={"stretch"}
                    overflow={"clip"}
                    minH={"110px"}
                    gap={0}
                  >
                    <JadwalItem
                      as={HStack}
                      data={data.jadwal_pengajuan}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                      flex={1}
                    />

                    <VStack w={"80px"} bg={"var(--divider)"} justify={"center"}>
                      <Icon as={RiArrowUpLine} fontSize={32} color={"p.500"} />
                      <VStack gap={0}>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Jadwal
                        </Text>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Anda
                        </Text>
                      </VStack>
                    </VStack>
                  </HStack>
                </CContainer>
              </CContainer>

              <CContainer
                bg={lightDarkColor}
                borderRadius={12}
                gap={3}
                p={5}
                flex={0}
              >
                <CContainer gap={2} flex={0}>
                  <HStack
                    borderRadius={8}
                    border={"1px solid var(--divider3)"}
                    align={"stretch"}
                    overflow={"clip"}
                    minH={"110px"}
                    gap={0}
                  >
                    <VStack w={"80px"} bg={"var(--divider)"} justify={"center"}>
                      <VStack gap={0}>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Jadwal
                        </Text>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Ditukar
                        </Text>
                      </VStack>
                      <Icon
                        as={RiArrowDownLine}
                        fontSize={32}
                        color={"p.500"}
                      />
                    </VStack>

                    <JadwalItem
                      as={HStack}
                      data={data.jadwal_ditukar}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                      flex={1}
                    />
                  </HStack>

                  <HStack
                    borderRadius={8}
                    border={"1px solid var(--divider3)"}
                    align={"stretch"}
                    overflow={"clip"}
                    minH={"110px"}
                    gap={0}
                  >
                    <JadwalItem
                      as={HStack}
                      data={data.jadwal_pengajuan}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                      flex={1}
                    />

                    <VStack w={"80px"} bg={"var(--divider)"} justify={"center"}>
                      <Icon as={RiArrowUpLine} fontSize={32} color={"p.500"} />
                      <VStack gap={0}>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Jadwal
                        </Text>
                        <Text
                          fontWeight={600}
                          fontSize={12}
                          maxW={"80px"}
                          textAlign={"center"}
                        >
                          Anda
                        </Text>
                      </VStack>
                    </VStack>
                  </HStack>
                </CContainer>
              </CContainer>
            </CContainer>
          </CContainer>

          <CContainer
            bg={contentBgColor}
            p={5}
            pb={8}
            mt={"auto"}
            gap={2}
            flex={0}
          >
            {user.user.id === 1 && <BatalkanTukarJadwal data={data} />}

            {user.user.id !== 1 && (
              <>
                <Button
                  colorScheme="red"
                  className="clicky"
                  leftIcon={<Icon as={RiCloseCircleLine} fontSize={iconSize} />}
                >
                  Tolak
                </Button>
                <Button
                  colorScheme="green"
                  className="clicky"
                  leftIcon={
                    <Icon as={RiCheckboxCircleLine} fontSize={iconSize} />
                  }
                >
                  Terima
                </Button>
              </>
            )}
          </CContainer>
        </>
      )}
    </CContainer>
  );
}
