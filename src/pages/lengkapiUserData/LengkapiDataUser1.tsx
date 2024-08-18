import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HorizontalSliderIndicator from "../../components/dependent/HorizontalSliderIndicator";
import DatePickerDrawer from "../../components/dependent/input/DatePickerDrawer";
import SelectAgama from "../../components/dependent/input/dedicated/SingleSelectAgama";
import SelectGender from "../../components/dependent/input/dedicated/SingleSelectGender";
import SelectGoldar from "../../components/dependent/input/dedicated/SIngleSelectGoldar";
import StringInput from "../../components/dependent/input/StringInput";
import Textarea from "../../components/dependent/input/Textareaold";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import RequiredForm from "../../components/form/RequiredForm";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import useScrollToTop from "../../hooks/useScrollToTop";
import formatNumber from "../../lib/formatNumber";
import getUserDataCookie from "../../lib/getUserDataCookie";
import parseNumber from "../../lib/parseNumber";
import req from "../../lib/req";

export default function LengkapiDataUser1() {
  useScrollToTop();

  const navigate = useNavigate();

  const user = getUserDataCookie();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: undefined,
      tempat_lahir: undefined,
      tgl_lahir: undefined,
      telepon: undefined,
      jenis_kelamin: undefined,
      nik: undefined,
      nik_ktp: undefined,
      agama: undefined,
      golongan_darah: undefined,
      tinggi_badan: undefined,
      alamat: undefined,
      no_ijazah: undefined,
      tahun_lulus: undefined,
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      tempat_lahir: yup.string().required("Harus diisi"),
      tgl_lahir: yup.date().required("Harus diisi"),
      telepon: yup.string().required("Harus diisi"),
      jenis_kelamin: yup.object().required("Harus diisi"),
      nik: yup.string().required("Harus diisi"),
      nik_ktp: yup.string().required("Harus diisi"),
      agama: yup.object().required("Harus diisi"),
      golongan_darah: yup.object().required("Harus diisi"),
      tinggi_badan: yup.string().required("Harus diisi"),
      alamat: yup.string().required("Harus diisi"),
      no_ijazah: yup.string().required("Harus diisi"),
      tahun_lulus: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);

      const payload = {};

      req
        .post(`/api/input-personal`, payload)
        .then((r) => {
          if (r.status === 200) {
          }
        })
        .catch((e) => {
          console.log(e);
          toast({
            status: "error",
            title:
              e.response.data.message || "Maaf terjadi kesalahan pada sistem",
            position: "bottom-right",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });

      // navigate("/lengkapi-data-personal-2");
    },
  });

  // SX

  return (
    <Container px={5}>
      <CContainer>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={4}
            active={1}
            justify={"center"}
            activeW="16px"
            mb={6}
          />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={2} mr={"auto"}>
            Data Personal
          </Text>

          <Text mb={6} fontSize={14} opacity={0.4}>
            Sebelum menggunakan aplikasi anda wajib mengisi data di bawah ini
          </Text>

          <form id="LengkapiDataUser1Form" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.nama}>
              <FormLabel>
                Nama Lengkap
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nama"
                placeholder="Jolitos Kurniawan"
                onChange={formik.handleChange}
                defaultValue={user?.nama}
                isDisabled
              />
              <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tempat_lahir}>
              <FormLabel>
                Tempat Lahir
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="tempat_lahir"
                placeholder="Semarang"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.tempat_lahir}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tgl_lahir}>
              <FormLabel>
                Tanggal Lahir
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="lengkapi-data-user-1-select-tgl_lahir"
                name={"tgl_lahir"}
                onConfirm={(inputValue) => {
                  formik.setFieldValue("tgl_lahir", inputValue);
                }}
                inputValue={formik.values.tgl_lahir}
                isError={!!formik.errors.tgl_lahir}
              />
              <FormErrorMessage>
                {formik.errors.tgl_lahir as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.telepon}>
              <FormLabel>
                Nomor Telepon
                <RequiredForm />
              </FormLabel>

              <InputGroup>
                <InputLeftElement ml={2}>
                  <Text>+62</Text>
                </InputLeftElement>
                <Input
                  pl={12}
                  name="telepon"
                  placeholder="8***********"
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.telepon}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.jenis_kelamin}>
              <FormLabel>
                Jenis Kelamin
                <RequiredForm />
              </FormLabel>
              <SelectGender
                id="lengkapi-data-user-1-select-gender"
                name="kelamin"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("kelamin", inputValue);
                }}
                inputValue={formik.values.jenis_kelamin}
                isError={!!formik.errors.jenis_kelamin}
                placeholder="Pilih Jenis Kelamin"
              />
              <FormErrorMessage>
                {formik.errors.jenis_kelamin as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.nik}>
              <FormLabel>
                Nomor Induk Kependudukan
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nik"
                placeholder="3301************"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.nik}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.nik_ktp}>
              <FormLabel>
                Nomor Kartu Keluarga
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nik_ktp"
                placeholder="3301************"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.nik_ktp}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.agama}>
              <FormLabel>
                Agama
                <RequiredForm />
              </FormLabel>
              <SelectAgama
                id="lengkapi-data-user-1-select-agama"
                name="agama"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("agama", inputValue);
                }}
                inputValue={formik.values.agama}
                placeholder="Pilih Agama"
                isError={!!formik.errors.agama}
              />
              <FormErrorMessage>
                {formik.errors.agama as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.golongan_darah}>
              <FormLabel>
                Golongan Darah
                <RequiredForm />
              </FormLabel>
              <SelectGoldar
                id="lengkapi-data-user-1-select"
                name="goldar"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("goldar", inputValue);
                }}
                inputValue={formik.values.golongan_darah}
                placeholder="Pilih Golongan Darah"
                isError={!!formik.errors.golongan_darah}
              />
              <FormErrorMessage>
                {formik.errors.golongan_darah as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tinggi_badan}>
              <FormLabel>
                Tinggi Badan
                <RequiredForm />
              </FormLabel>
              <InputGroup>
                <InputRightElement mr={1}>
                  <Text>cm</Text>
                </InputRightElement>
                <Input
                  pr={12}
                  name="tinggi_badan"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "tinggi_badan",
                      parseNumber(e.target.value)
                    );
                  }}
                  value={
                    formik.values.tinggi_badan === 0
                      ? ""
                      : formatNumber(formik.values.tinggi_badan)
                  }
                  placeholder="179"
                />
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.tinggi_badan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.alamat}>
              <FormLabel>
                Alamat
                <RequiredForm />
              </FormLabel>
              <Textarea
                formik={formik}
                name="alamat"
                placeholder="Jalan Soekarno Hatta no.123"
              />
              <FormErrorMessage>{formik.errors.alamat}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_ijazah}>
              <FormLabel>
                Nomor Ijazah Terakhir
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="no_ijazah"
                placeholder="1101************"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.no_ijazah}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.tahun_lulus ? true : false}>
              <FormLabel>Tahun Lulus Ijazah Terakhir</FormLabel>
              <StringInput
                name="tahun_lulus"
                placeholder="2024"
                onChange={formik.handleChange}
                value={formik.values.tahun_lulus}
              />
              <FormErrorMessage>{formik.errors.tahun_lulus}</FormErrorMessage>
            </FormControl>
          </form>

          <VStack align={"stretch"} pt={6} mt={"auto"} w={"100%"}>
            <Button
              colorScheme="ap"
              type="submit"
              form="LengkapiDataUser1Form"
              className="btn-ap clicky"
              w={"100%"}
              h={"50px"}
            >
              Selanjutnya
            </Button>

            <Button
              w={"100%"}
              variant={"ghost"}
              colorScheme="ap"
              as={Link}
              to={"/lengkapi-data-personal-2"}
              color="p.500"
              fontWeight={500}
              mx={"auto"}
            >
              Next Step (Debug)
            </Button>
          </VStack>
        </VStack>
      </CContainer>
    </Container>
  );
}
