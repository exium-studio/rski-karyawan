import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDownload2Line,
} from "@remixicon/react";
import { useFormik } from "formik";
import { Dispatch, useEffect, useState } from "react";
import * as yup from "yup";
import DrawerHeader from "../../../components/dependent/DrawerHeader";
import Header from "../../../components/dependent/Header";
import PasswordInput from "../../../components/dependent/input/PasswordInput";
import PeriodPickerDrawer from "../../../components/dependent/input/PeriodPickerDrawer";
import Retry from "../../../components/dependent/Retry";
import RequiredForm from "../../../components/form/RequiredForm";
import FlexLine from "../../../components/independent/FlexLine";
import NoData from "../../../components/independent/NoData";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import CustomDrawer from "../../../components/independent/wrapper/CustomDrawer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";
import backOnClose from "../../../lib/backOnClose";
import formatNumber from "../../../lib/formatNumber";
import getRandomNum from "../../../lib/getRandomNum";
import getUserData from "../../../lib/getUserData";
import req from "../../../lib/req";
import download from "../../../lib/download";
import formatDate from "../../../lib/formatDate";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setPasswordValid: Dispatch<boolean>;
}

const PassWordVerification = ({
  isOpen,
  onOpen,
  onClose,
  setPasswordValid,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { password: "" },
    validationSchema: yup
      .object()
      .shape({ password: yup.string().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        password: values.password,
      };

      req
        .post(`/api/cek-password`, payload)
        .then((r) => {
          if (r.status === 200) {
            toast({
              status: "success",
              title: r?.data?.message,
              position: "top",
              isClosable: true,
            });
            setPasswordValid(true);
          }
        })
        .catch((e) => {
          console.log(e);
          toast({
            status: "error",
            title:
              (typeof e?.response?.data?.message === "string" &&
                (e?.response?.data?.message as string)) ||
              "Maaf terjadi kesalahan pada sistem",
            position: "top",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <CustomDrawer
      id="password-verification"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      header={<DrawerHeader title="Konfirmasi Pemilik Akun" />}
      footer={
        <>
          <Button
            type="submit"
            form="verifikasiPenggunaForm"
            className="btn-ap clicky"
            colorScheme="ap"
            isLoading={loading}
          >
            Verifikasi
          </Button>
        </>
      }
    >
      <CContainer px={6}>
        <form id="verifikasiPenggunaForm" onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={!!formik.errors.password}>
            <FormLabel>
              Password
              <RequiredForm />
            </FormLabel>
            <PasswordInput
              name="password"
              placeholder=""
              onChangeSetter={(inputValue) => {
                formik.setFieldValue("password", inputValue);
              }}
              inputValue={formik.values.password}
            />
            <FormErrorMessage>
              {formik.errors.password as string}
            </FormErrorMessage>
          </FormControl>
        </form>
      </CContainer>
    </CustomDrawer>
  );
};

export default function SlipGajiku() {
  useScrollToTop();

  const user = getUserData();

  const today = new Date();
  // const navigate = useNavigate();
  const [periode, setPeriode] = useState<Date>(today);
  const [bulan, setBulan] = useState<number>(today.getMonth());
  const [tahun, setTahun] = useState<number>(today.getFullYear());
  function nextMonth() {
    const currentMonth = periode.getMonth();
    const currentyear = periode.getFullYear();

    const nextMonth = new Date(
      bulan === 12 ? currentyear + 1 : tahun,
      bulan === 12 ? 0 : currentMonth + 1
    );
    setPeriode(nextMonth);
    setBulan(nextMonth.getMonth());
    setTahun(nextMonth.getFullYear());
  }
  function prevMonth() {
    const currentMonth = periode.getMonth();
    const currentyear = periode.getFullYear();

    const prevMonth = new Date(
      bulan === 1 ? currentyear - 1 : tahun,
      bulan === 1 ? 11 : currentMonth - 1
    );
    setPeriode(prevMonth);
    setBulan(prevMonth.getMonth());
    setTahun(prevMonth.getFullYear());
  }

  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(true);

  const { data, notFound, loading, error, retry } = useDataState<any>({
    initialData: undefined,
    url: "/api/get-detail-gaji",
    payload: {
      bulan: bulan + 1,
      tahun: tahun,
    },
    conditions: passwordValid,
    dependencies: [passwordValid, bulan, tahun],
  });

  console.log("password validdation popup", passwordValidation);
  console.log("password valid", passwordValid);

  useEffect(() => {
    if (passwordValid) {
      setPasswordValidation(false);
      backOnClose();
    }
  }, [passwordValid]);

  useEffect(() => {
    if (!passwordValidation) {
      if (!passwordValid) {
        backOnClose();
      }
    }
  }, [passwordValidation]);

  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  const totalPendapatan = () => {
    if (data && data.detail_gaji) {
      let total = 0;
      data.detail_gaji.forEach((item: any) => {
        if (
          item.kategori_gaji.label === "Penghasilan Dasar" ||
          item.kategori_gaji.label === "Penambah"
        ) {
          total += item.besaran;
        }
      });
      return total;
    }
    return 0;
  };

  const totalPotongan = () => {
    if (data && data.detail_gaji) {
      let total = 0;
      data.detail_gaji.forEach((item: any) => {
        if (item.kategori_gaji.label === "Pengurang") {
          total += item.besaran;
        }
      });
      return total;
    }
    return 0;
  };

  const toast = useToast();
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  function downloadSlipGaji() {
    setLoadingDownload(true);

    const url = `/api/export-slip-gaji`;
    req
      .get(url, {
        responseType: "blob", // Mengatur responseType menjadi blob untuk data biner
      })
      .then((r) => {
        if (r.status === 200) {
          download(
            r.data,
            `Slip Gaji ${formatDate(periode, "periode")}`,
            "pdf"
          );

          backOnClose();
          toast({
            status: "success",
            title: "Slip gaji berhasil diunduh",
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            (typeof e?.response?.data?.message === "string" &&
              (e?.response?.data?.message as string)) ||
            "Maaf terjadi kesalahan pada sistem",
          position: "top",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoadingDownload(false);
      });
  }

  return (
    <CContainer flex={1}>
      <PassWordVerification
        isOpen={passwordValidation}
        onOpen={() => {
          setPasswordValidation(true);
        }}
        onClose={() => {
          setPasswordValidation(false);
        }}
        setPasswordValid={setPasswordValid}
      />

      <Header
        left={"back"}
        title="Slip Gajiku"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer flex={1} bg={contentBgColor} p={5} pb={8}>
        <HStack
          borderRadius={12}
          bg={lightDarkColor}
          gap={4}
          overflow={"clip"}
          mb={4}
        >
          <CContainer justify={"center"}>
            <Badge
              borderRadius={"0 0 8px 0"}
              colorScheme="red"
              size={"sm"}
              textAlign={"center"}
              w={"fit-content"}
            >
              Rahasia
            </Badge>

            <CContainer p={4}>
              <Text fontSize={14} fontWeight={500} mb={"2px"}>
                {user.nama}
              </Text>
              <Text fontSize={12} opacity={0.4}>
                {user.unit_kerja?.[0]?.nama_unit}
              </Text>
            </CContainer>
          </CContainer>

          <CContainer p={4} flex={0}>
            <Avatar name={user.nama} src={user.foto_profil || ""} size={"lg"} />
          </CContainer>
        </HStack>

        <CContainer
          // flex={!loading && !error && data ? 0 : 1}
          flex={1}
          bg={lightDarkColor}
          borderRadius={12}
          py={5}
          pt={3}
          mb={4}
        >
          <HStack px={3} pb={3} borderBottom={"2px dashed var(--divider)"}>
            <Button
              aria-label="Previous Month"
              leftIcon={
                <Icon
                  className="iconButton"
                  as={RiArrowLeftSLine}
                  fontSize={20}
                />
              }
              pr={"16px"}
              className="btn-outline clicky"
              onClick={prevMonth}
              w={"100%"}
              maxW={"50px"}
            ></Button>

            <PeriodPickerDrawer
              id="input-slip-gaji-periode"
              name="periode"
              bulan={bulan}
              setBulan={setBulan}
              tahun={tahun}
              setTahun={setTahun}
              setPeriod={setPeriode}
              fontSize={14}
              className="btn-outline"
            />

            <Button
              aria-label="Next Month"
              rightIcon={<Icon as={RiArrowRightSLine} fontSize={20} />}
              pl={"16px"}
              className="btn-outline clicky"
              onClick={nextMonth}
              w={"100%"}
              maxW={"50px"}
            ></Button>
          </HStack>

          {error && (
            <>
              {notFound && <NoData label="Slip gaji belum ada" />}

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
                  <CContainer
                    flex={0}
                    py={5}
                    borderBottom={"2px dashed var(--divider)"}
                  >
                    <Text
                      w={"fit-content"}
                      mx={"auto"}
                      fontWeight={500}
                      textAlign={"center"}
                    >
                      Take Home Pay
                    </Text>

                    <Skeleton
                      borderRadius={8}
                      mt={2}
                      h={"31px"}
                      w={"180px"}
                      mx={"auto"}
                    />
                  </CContainer>

                  <CContainer
                    flex={0}
                    gap={3}
                    px={5}
                    py={3}
                    borderBottom={"2px dashed var(--divider)"}
                  >
                    <Text fontWeight={500}>Penghasilan</Text>
                    {Array.from({ length: 5 }).map((_: any, i: number) => (
                      <HStack key={i}>
                        <Skeleton
                          borderRadius={8}
                          h={"21px"}
                          w={getRandomNum(100, 140)}
                        />
                        <FlexLine opacity={0} />
                        <Skeleton
                          borderRadius={8}
                          h={"21px"}
                          w={getRandomNum(100, 140)}
                        />
                      </HStack>
                    ))}
                    <HStack>
                      <FlexLine mx={0} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                    </HStack>
                  </CContainer>

                  <CContainer
                    flex={0}
                    gap={3}
                    py={3}
                    px={5}
                    // borderBottom={"2px dashed var(--divider)"}
                  >
                    <Text fontWeight={500}>Potongan</Text>
                    {Array.from({ length: 5 }).map((_: any, i: number) => (
                      <HStack key={i}>
                        <Skeleton
                          borderRadius={8}
                          h={"21px"}
                          w={getRandomNum(100, 140)}
                        />
                        <FlexLine opacity={0} />
                        <Skeleton
                          borderRadius={8}
                          h={"21px"}
                          w={getRandomNum(100, 140)}
                        />
                      </HStack>
                    ))}
                    <HStack>
                      <FlexLine mx={0} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                    </HStack>
                  </CContainer>

                  {/* <CContainer flex={0} gap={3} pt={3} px={5}>
                    <Text fontWeight={500}>Ringkasan Kehadiran</Text>
                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"20px"} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"20px"} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"20px"} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"20px"} />
                    </HStack>

                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"20px"} />
                    </HStack>
                    <HStack>
                      <Skeleton
                        borderRadius={8}
                        h={"21px"}
                        w={getRandomNum(100, 140)}
                      />
                      <FlexLine opacity={0} />
                      <Skeleton borderRadius={8} h={"21px"} w={"40px"} />
                    </HStack>
                  </CContainer> */}
                </>
              )}

              {!loading && passwordValid && (
                <>
                  {!data && <NoData />}

                  {data && (
                    <>
                      <CContainer
                        flex={0}
                        py={5}
                        borderBottom={"2px dashed var(--divider)"}
                      >
                        <Text
                          w={"fit-content"}
                          mx={"auto"}
                          fontWeight={500}
                          textAlign={"center"}
                        >
                          Take Home Pay
                        </Text>

                        <Text
                          fontWeight={700}
                          textAlign={"center"}
                          fontSize={26}
                        >
                          {`Rp ${formatNumber(data.take_home_pay)}`}
                        </Text>
                      </CContainer>

                      <CContainer
                        flex={0}
                        gap={3}
                        px={5}
                        py={3}
                        borderBottom={"2px dashed var(--divider)"}
                      >
                        <Text fontWeight={500}>Penghasilan</Text>
                        {data.detail_gaji.map((gaji: any, i: number) => {
                          const ok =
                            gaji.kategori_gaji?.label === "Penambah" ||
                            gaji.kategori_gaji?.label === "Penghasilan Dasar";

                          return (
                            ok && (
                              <HStack key={i}>
                                <Text opacity={0.4}>{gaji.nama_detail}</Text>
                                <FlexLine opacity={0} />
                                <Text>{`Rp ${
                                  gaji?.besaran ? formatNumber(gaji.besaran) : 0
                                }`}</Text>
                              </HStack>
                            )
                          );
                        })}
                        <HStack>
                          <FlexLine mx={0} />
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Total Penghasilan</Text>
                          <FlexLine opacity={0} />
                          <Text
                            fontWeight={600}
                            color={"green.400"}
                          >{`Rp ${formatNumber(totalPendapatan())}`}</Text>
                        </HStack>
                      </CContainer>

                      <CContainer
                        flex={0}
                        gap={3}
                        pt={3}
                        px={5}
                        // borderBottom={"2px dashed var(--divider)"}
                      >
                        <Text fontWeight={500}>Potongan</Text>
                        {data.detail_gaji.map((gaji: any, i: number) => {
                          const ok = gaji.kategori_gaji?.label === "Pengurang";
                          return (
                            ok && (
                              <HStack key={i}>
                                <Text opacity={0.4}>{gaji.nama_detail}</Text>
                                <FlexLine opacity={0} />
                                <Text>{`Rp ${
                                  gaji?.besaran ? formatNumber(gaji.besaran) : 0
                                }`}</Text>
                              </HStack>
                            )
                          );
                        })}

                        <HStack>
                          <FlexLine mx={0} />
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Total Potongan</Text>
                          <FlexLine opacity={0} />
                          <Text
                            fontWeight={600}
                            color={"red.400"}
                          >{`Rp ${formatNumber(totalPotongan())}`}</Text>
                        </HStack>
                      </CContainer>

                      {/* <CContainer flex={0} gap={3} pt={3} px={5}>
                        <Text fontWeight={500}>Ringkasan Kehadiran</Text>
                        <HStack>
                          <Text opacity={0.4}>Hari Kerja</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.hari_kerja
                          )}`}</Text>
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Jadwal Hari Kerja</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.jadwal_hari_kerja
                          )}`}</Text>
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Libur</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.libur
                          )}`}</Text>
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Libur Nasional</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.libur_nasional
                          )}`}</Text>
                        </HStack>

                        <HStack>
                          <Text opacity={0.4}>Hari Libur Khusus</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.hari_libur_khusus
                          )}`}</Text>
                        </HStack>
                        <HStack>
                          <Text opacity={0.4}>Kehadiran</Text>
                          <FlexLine opacity={0} />
                          <Text>{`${formatNumber(
                            data.ringkasan_kehadiran.kehadiran
                          )} hari`}</Text>
                        </HStack>
                      </CContainer> */}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </CContainer>

        {!loading && !error && data && (
          <Button
            className="btn-ap clicky"
            colorScheme="ap"
            leftIcon={<Icon as={RiDownload2Line} fontSize={iconSize} />}
            mb={4}
            onClick={downloadSlipGaji}
            isLoading={loadingDownload}
          >
            Unduh Slip Gaji
          </Button>
        )}

        <Text opacity={0.4} mb={2}>
          *Ini adalah slip gaji yang berasal dari komputer dan tidak memerlukan
          tanda tangan basah.
        </Text>

        <Text opacity={0.4} textTransform={"uppercase"}>
          Isi kuesioner ini bersifat rahasia kecuali jika diperlukan untuk
          tujuan pajak, hukum, atau pemerintah. Pelanggaran terhadap kewajiban
          kerahasiaan ini akan dikenakan sanksi, termasuk tindakan disipliner.
        </Text>
      </CContainer>
    </CContainer>
  );
}
