import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatDuration from "../../lib/formatDuration";
import formatTime from "../../lib/formatTime";
import formatTimeOld from "../../lib/formatTimeOld";
import FlexLine from "../independent/FlexLine";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";
import Img from "./Img";
import LokasiPresensi from "./LokasiPresensi";
import Retry from "./Retry";

interface Props {
  initialData: any;
}

export default function AktivitasItem({ initialData }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-detail-presensi`,
    payload: {
      id: initialData?.id,
    },
    conditions: isOpen,
    dependencies: [isOpen],
  });

  const isMasuk = initialData.presensi === "Masuk";

  return (
    <>
      <HStack
        gap={4}
        borderRadius={12}
        p={4}
        bg={lightDarkColor}
        className="clicky"
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Center
          p={2}
          borderRadius={"full"}
          bg={
            initialData?.presensi === "Masuk" ? "var(--p500a5)" : "var(--reda)"
          }
        >
          <Icon
            as={
              initialData?.presensi === "Masuk"
                ? RiLoginBoxLine
                : RiLogoutBoxRLine
            }
            fontSize={initialData?.presensi === "Masuk" ? 20 : 20}
            color={initialData?.presensi === "Masuk" ? "p.500" : "red.400"}
          />
        </Center>

        <Box>
          <Text fontWeight={600}>{initialData?.presensi}</Text>
          <Text fontSize={14} opacity={0.4}>
            {formatDate(initialData?.tanggal)}
          </Text>
        </Box>

        <Text ml={"auto"} fontWeight={600} className="num">
          {formatTime(initialData?.jam)}
        </Text>
      </HStack>

      <CustomDrawer
        id={`detail-aktivitas-${initialData?.id}-${initialData.presensi}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <DisclosureHeader
            title={`Detail Aktivitas ${initialData?.presensi}`}
          />
        }
        footer={
          <>
            <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button>
          </>
        }
      >
        <CContainer>
          {loading && (
            <CContainer gap={4}>
              <Skeleton w={"100%"} h={"auto"} aspectRatio={1} />

              <Skeleton w={"100%"} h={"auto"} aspectRatio={1} />

              <Skeleton minH={"483px"} />
            </CContainer>
          )}

          {!loading && (
            <>
              {error && (
                <>
                  <Retry retry={retry} />
                </>
              )}

              {!error && (
                <>
                  {data && (
                    <CContainer gap={4}>
                      <Box
                        p={5}
                        borderTop={
                          data?.alasan ? "" : "6px solid var(--divider)"
                        }
                      >
                        <Text fontSize={16} fontWeight={600} mb={4}>
                          Foto Presensi
                        </Text>
                        <Img
                          initialSrc={
                            isMasuk
                              ? data?.data_presensi?.foto_masuk?.path
                              : data?.data_presensi?.foto_keluar?.path
                          }
                          fallbackSrc="/images/defaultProfilePhoto.webp"
                          borderRadius={12}
                          aspectRatio={1}
                          objectFit={"cover"}
                        />
                      </Box>

                      <Box
                        p={5}
                        borderTop={
                          data?.alasan ? "" : "6px solid var(--divider)"
                        }
                      >
                        <Text fontSize={16} fontWeight={600} mb={4}>
                          Lokasi Presensi
                        </Text>

                        <LokasiPresensi
                          center={{
                            lat:
                              (isMasuk
                                ? data?.data_presensi?.lat_masuk
                                : data?.data_presensi?.lat_keluar) || 0,
                            lng:
                              (isMasuk
                                ? data?.data_presensi?.long_masuk
                                : data?.data_presensi?.long_keluar) || 0,
                          }}
                          officeCenter={{
                            lat: data?.data_presensi?.lokasi_kantor?.lat || 0,
                            lng: data?.data_presensi?.lokasi_kantor?.long || 0,
                          }}
                          presence_radius={
                            data?.data_presensi?.lokasi_kantor?.radius || 100
                          }
                        />
                      </Box>

                      <Box
                        p={5}
                        borderTop={
                          data?.alasan ? "" : "6px solid var(--divider)"
                        }
                      >
                        <Text fontSize={16} fontWeight={600} mb={4}>
                          Data Jadwal
                        </Text>

                        <CContainer gap={4}>
                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Nama (Label)</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {data?.unit_kerja?.jenis_karyawan === 1
                                ? data?.data_presensi?.jadwal_shift?.shift?.nama
                                : data?.data_presensi?.jadwal_non_shift?.nama}
                            </Text>
                          </HStack>

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Jadwal Tanggal Mulai</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {formatDate(
                                data?.unit_kerja?.jenis_karyawan === 1
                                  ? data?.data_presensi?.jadwal_shift?.tgl_mulai
                                  : data?.data_presensi?.created_at
                              )}
                            </Text>
                          </HStack>

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Jadwal Tanggal Selesai</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {formatDate(
                                data?.unit_kerja?.jenis_karyawan === 1
                                  ? data?.data_presensi?.jadwal_shift
                                      ?.tgl_selesai
                                  : data?.data_presensi?.updated_at
                              )}
                            </Text>
                          </HStack>

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Jadwal Jam Masuk</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {formatTime(
                                data?.unit_kerja?.jenis_karyawan === 1
                                  ? data?.data_presensi?.jadwal_shift?.shift
                                      ?.jam_from
                                  : data?.data_presensi?.jadwal_non_shift
                                      ?.jam_from
                              )}
                            </Text>
                          </HStack>

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Jadwal Jam Keluar</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {formatTime(
                                data?.unit_kerja?.jenis_karyawan === 1
                                  ? data?.data_presensi?.jadwal_shift?.shift
                                      ?.jam_to
                                  : data?.data_presensi?.jadwal_non_shift
                                      ?.jam_to
                              )}
                            </Text>
                          </HStack>
                        </CContainer>
                      </Box>

                      <Box
                        p={5}
                        borderTop={
                          data?.alasan ? "" : "6px solid var(--divider)"
                        }
                      >
                        <Text fontSize={16} fontWeight={600} mb={4}>
                          Data Presensi
                        </Text>

                        <CContainer gap={4}>
                          {isMasuk && (
                            <HStack justify={"space-between"}>
                              <Box opacity={0.6}>
                                <Text>Presensi Masuk</Text>
                              </Box>
                              <FlexLine />
                              <Text fontWeight={500} textAlign={"right"}>
                                {formatTimeOld(data?.data_presensi?.jam_masuk)}
                              </Text>
                            </HStack>
                          )}

                          {!isMasuk && (
                            <HStack justify={"space-between"}>
                              <Box opacity={0.6}>
                                <Text>Presensi Keluar</Text>
                              </Box>
                              <FlexLine />
                              <Text fontWeight={500} textAlign={"right"}>
                                {formatTimeOld(data?.data_presensi?.jam_keluar)}
                              </Text>
                            </HStack>
                          )}

                          {isMasuk && (
                            <HStack justify={"space-between"}>
                              <Box opacity={0.6}>
                                <Text>Tanggal Masuk</Text>
                              </Box>
                              <FlexLine />
                              <Text fontWeight={500} textAlign={"right"}>
                                {formatDate(data?.data_presensi?.jam_masuk)}
                              </Text>
                            </HStack>
                          )}

                          {!isMasuk && (
                            <HStack justify={"space-between"}>
                              <Box opacity={0.6}>
                                <Text>Tanggal Keluar</Text>
                              </Box>
                              <FlexLine />
                              <Text fontWeight={500} textAlign={"right"}>
                                {formatDate(data?.data_presensi?.jam_keluar)}
                              </Text>
                            </HStack>
                          )}

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Durasi</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {formatDuration(data?.data_presensi?.durasi)}
                            </Text>
                          </HStack>

                          <HStack justify={"space-between"}>
                            <Box opacity={0.6}>
                              <Text>Kategori Presensi</Text>
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {data?.data_presensi?.kategori_presensi?.label ||
                                "Invalid"}
                            </Text>
                          </HStack>

                          {isMasuk && (
                            <>
                              <HStack justify={"space-between"}>
                                <Box opacity={0.6}>
                                  <Text>Latitude Masuk</Text>
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data?.data_presensi?.lat_masuk}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Box opacity={0.6}>
                                  <Text>Longitude Masuk</Text>
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data?.data_presensi?.long_masuk}
                                </Text>
                              </HStack>
                            </>
                          )}

                          {!isMasuk && (
                            <>
                              <HStack justify={"space-between"}>
                                <Box opacity={0.6}>
                                  <Text>Latitude Keluar</Text>
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data?.data_presensi?.lat_keluar}
                                </Text>
                              </HStack>
                              <HStack justify={"space-between"}>
                                <Box opacity={0.6}>
                                  <Text>Longitude Keluar</Text>
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data?.data_presensi?.long_keluar}
                                </Text>
                              </HStack>
                            </>
                          )}
                        </CContainer>
                      </Box>
                    </CContainer>
                  )}
                </>
              )}
            </>
          )}
        </CContainer>
      </CustomDrawer>
    </>
  );
}
