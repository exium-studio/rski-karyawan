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
import { useNavigate } from "react-router-dom";
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
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import parseNumber from "../../lib/parseNumber";
import req from "../../lib/req";
import useDcs from "../../global/useAuth";

export default function LengkapiDataUser1() {
  useScrollToTop();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setDcs } = useDcs();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: undefined as any,
      tempat_lahir: "" as any,
      tgl_lahir: undefined as any,
      telepon: "" as any,
      jenis_kelamin: undefined as any,
      nik_ktp: "" as any,
      no_kk: "" as any,
      agama: undefined as any,
      golongan_darah: undefined as any,
      tinggi_badan: undefined as any,
      // berat_badan: undefined as any,
      alamat: undefined as any,
      no_ijazah: "" as any,
      tahun_lulus: "" as any,
    },
    validationSchema: yup.object().shape({
      tempat_lahir: yup.string().required("Harus diisi"),
      tgl_lahir: yup.date().required("Harus diisi"),
      telepon: yup.string().required("Harus diisi"),
      jenis_kelamin: yup.object().required("Harus diisi"),
      nik_ktp: yup.string().required("Harus diisi"),
      no_kk: yup.string().required("Harus diisi"),
      agama: yup.object().required("Harus diisi"),
      golongan_darah: yup.object().required("Harus diisi"),
      tinggi_badan: yup.string().required("Harus diisi"),
      alamat: yup.string().required("Harus diisi"),
      no_ijazah: yup.string().required("Harus diisi"),
      tahun_lulus: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        tempat_lahir: values.tempat_lahir,
        tanggal_lahir: formatDate(values.tgl_lahir as string, "short2"),
        no_hp: values.telepon,
        jenis_kelamin: values.jenis_kelamin.value,
        nik_ktp: values.nik_ktp,
        no_kk: values.no_kk,
        agama: values.agama?.value,
        golongan_darah: values.agama?.value,
        tinggi_badan: values.tinggi_badan,
        alamat: values.alamat,
        no_ijazah: values.no_ijazah,
        tahun_lulus: values.tahun_lulus,
      };

      req
        .post(`/api/input-personal`, payload)
        .then((r) => {
          if (r.status === 200) {
            setDcs(2);
            navigate("/lengkapi-data-personal-2");
            toast({
              status: "success",
              title: r.data.message,
              isClosable: true,
              position: "top",
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
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  // SX

  return (
    <Container px={5}>
      <CContainer>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={5}
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
                onChangeSetter={(input) => {
                  formik.setFieldValue("nama_disabled", input);
                }}
                inputValue={formik.values.nama}
                isDisabled
              />
              <FormErrorMessage>
                {formik.errors.nama as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tempat_lahir}>
              <FormLabel>
                Tempat Lahir
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="tempat_lahir"
                placeholder="Semarang"
                onChangeSetter={(input) => {
                  formik.setFieldValue("tempat_lahir", input);
                }}
                inputValue={formik.values.tempat_lahir}
              />
              <FormErrorMessage>
                {formik.errors.tempat_lahir as string}
              </FormErrorMessage>
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
              <FormErrorMessage>
                {formik.errors.telepon as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.jenis_kelamin}>
              <FormLabel>
                Jenis Kelamin
                <RequiredForm />
              </FormLabel>
              <SelectGender
                id="lengkapi-data-user-1-select-gender"
                name="jenis_kelamin"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_kelamin", inputValue);
                }}
                inputValue={formik.values.jenis_kelamin}
                isError={!!formik.errors.jenis_kelamin}
                placeholder="Pilih Jenis Kelamin"
              />
              <FormErrorMessage>
                {formik.errors.jenis_kelamin as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.nik_ktp}>
              <FormLabel>
                Nomor Induk Kependudukan
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nik_ktp"
                placeholder="3301************"
                onChangeSetter={(input) => {
                  formik.setFieldValue("nik_ktp", input);
                }}
                inputValue={formik.values.nik_ktp}
              />
              <FormErrorMessage>
                {formik.errors.nik_ktp as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_kk}>
              <FormLabel>
                Nomor Kartu Keluarga
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="no_kk"
                placeholder="3301************"
                onChangeSetter={(input) => {
                  formik.setFieldValue("no_kk", input);
                }}
                inputValue={formik.values.no_kk}
              />
              <FormErrorMessage>
                {formik.errors.no_kk as string}
              </FormErrorMessage>
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
                name="golongan_darah"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("golongan_darah", inputValue);
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
              <FormErrorMessage>
                {formik.errors.alamat as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_ijazah}>
              <FormLabel>
                Nomor Ijazah Terakhir
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="no_ijazah"
                placeholder="1101************"
                onChangeSetter={(input) => {
                  formik.setFieldValue("no_ijazah", input);
                }}
                inputValue={formik.values.no_ijazah}
              />
              <FormErrorMessage>
                {formik.errors.no_ijazah as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.tahun_lulus ? true : false}>
              <FormLabel>Tahun Lulus Ijazah Terakhir</FormLabel>
              <StringInput
                name="tahun_lulus"
                placeholder="2024"
                onChangeSetter={(input) => {
                  formik.setFieldValue("tahun_lulus", input);
                }}
                inputValue={formik.values.tahun_lulus}
              />
              <FormErrorMessage>
                {formik.errors.tahun_lulus as string}
              </FormErrorMessage>
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
              isLoading={loading}
            >
              Selanjutnya
            </Button>
          </VStack>
        </VStack>
      </CContainer>
    </Container>
  );
}
