import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HorizontalSliderIndicator from "../../components/dependent/HorizontalSliderIndicator";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import Container from "../../components/independent/wrapper/Container";
import useScrollToTop from "../../hooks/useScrollToTop";
import CContainer from "../../components/independent/wrapper/CContainer";
import FileInput from "../../components/dependent/input/FileInput";

export default function LengkapiDataUser4() {
  useScrollToTop();

  const navigate = useNavigate();

  const fileValidation = yup
    .mixed()
    .test("fileType", "Harus berupa file", (value) => value instanceof File);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      ktp: undefined,
      kk: undefined,
      sip: undefined,
      bpjsksh: undefined,
      bpjsktk: undefined,
      ijazah: undefined,
      sertifikat_kompetensi: undefined,
    },
    validationSchema: yup.object().shape({
      ktp: fileValidation.required("Harus diisi"),
      kk: fileValidation.required("Harus diisi"),
      sip: fileValidation.required("Harus diisi"),
      bpjsksh: fileValidation.required("Harus diisi"),
      bpjsktk: fileValidation.required("Harus diisi"),
      ijazah: yup.string().required("Harus diisi"),
      sertifikat_kompetensi: fileValidation.required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // TODO hit api simpan data personal 4

      navigate("/lengkapi-data-personal-5");
    },
  });

  // SX

  return (
    <Container>
      <CContainer gap={0} align={"stretch"} flex={1} px={5}>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={4}
            active={4}
            justify={"center"}
            activeW="16px"
            mb={8}
          />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={4} mr={"auto"}>
            Unggah Berkas
          </Text>

          <form id="LengkapiDataUser4Form" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.ktp}>
              <FormLabel>KTP</FormLabel>
              <FileInput
                name="ktp"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("ktp", inputValue);
                }}
                inputValue={formik.values.ktp}
                isError={!!formik.errors.ktp}
              />
              <FormErrorMessage>{formik.errors.ktp}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.kk}>
              <FormLabel>Kartu Keluarga</FormLabel>
              <FileInput
                name="kk"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("kk", inputValue);
                }}
                inputValue={formik.values.kk}
                isError={!!formik.errors.kk}
              />

              <FormErrorMessage>{formik.errors.kk}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.sip}>
              <FormLabel>SIP</FormLabel>
              <FileInput
                name="sip"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("sip", inputValue);
                }}
                inputValue={formik.values.sip}
                isError={!!formik.errors.sip}
              />

              <FormErrorMessage>{formik.errors.sip}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.bpjsksh}>
              <FormLabel>BPJS Kesehatan</FormLabel>
              <FileInput
                name="bpjsksh"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("bpjsksh", inputValue);
                }}
                inputValue={formik.values.bpjsksh}
                isError={!!formik.errors.bpjsksh}
              />

              <FormErrorMessage>{formik.errors.bpjsksh}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.bpjsktk}>
              <FormLabel>BPJS Ketenagakerjaan</FormLabel>
              <FileInput
                name="bpjsktk"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("bpjsktk", inputValue);
                }}
                inputValue={formik.values.bpjsktk}
                isError={!!formik.errors.bpjsktk}
              />

              <FormErrorMessage>{formik.errors.bpjsktk}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={formik.errors.ijazah ? true : false}>
              <FormLabel>Ijazah Terakhir</FormLabel>
              <FileInput
                name="ijazah"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("ijazah", inputValue);
                }}
                inputValue={formik.values.ijazah}
                isError={!!formik.errors.ijazah}
              />
              <FormErrorMessage>{formik.errors.ijazah}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.sertifikat_kompetensi}>
              <FormLabel>Sertifikat Kompetensi</FormLabel>
              <FileInput
                name="sertifikat_kompetensi"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("sertifikat_kompetensi", inputValue);
                }}
                inputValue={formik.values.sertifikat_kompetensi}
                isError={!!formik.errors.sertifikat_kompetensi}
              />

              <FormErrorMessage>
                {formik.errors.sertifikat_kompetensi}
              </FormErrorMessage>
            </FormControl>
          </form>

          <VStack align={"stretch"} pt={6} mt={"auto"} w={"100%"}>
            <Button
              colorScheme="ap"
              type="submit"
              form="LengkapiDataUser4Form"
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
              to={"/beranda"}
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
