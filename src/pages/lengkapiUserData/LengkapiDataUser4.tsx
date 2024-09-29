import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import HorizontalSliderIndicator from "../../components/dependent/HorizontalSliderIndicator";
import FileInput from "../../components/dependent/input/FileInput";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import useDcs from "../../global/useAuth";
import useScrollToTop from "../../hooks/useScrollToTop";
import req from "../../lib/req";
import { fileValidation } from "../../lib/validationSchemas";

export default function LengkapiDataUser4() {
  useScrollToTop();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setDcs } = useDcs();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      ktp: undefined as any,
      kk: undefined as any,
      sip: undefined as any,
      bpjsksh: undefined as any,
      bpjsktk: undefined as any,
      ijazah: undefined as any,
      sertifikat_kompetensi: undefined as any,
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
      setLoading(true);

      const payload = new FormData();
      payload.append("ktp", values.ktp);
      payload.append("kk", values.kk);
      payload.append("sip", values.sip);
      payload.append("bpjs_kesehatan", values.bpjsksh);
      payload.append("bpjs_ketenagakerjaan", values.bpjsktk);
      payload.append("ijazah", values.ijazah);
      payload.append("sertifikat", values.sertifikat_kompetensi);

      req
        .post(`/api/input-personal-file`, payload)
        .then((r) => {
          if (r.status === 200) {
            setDcs(5);
            navigate("/lengkapi-data-personal-5");
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
              "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
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
    <Container>
      <CContainer gap={0} align={"stretch"} flex={1} px={5}>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={5}
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
              <FormErrorMessage>{formik.errors.ktp as string}</FormErrorMessage>
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

              <FormErrorMessage>{formik.errors.kk as string}</FormErrorMessage>
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

              <FormErrorMessage>{formik.errors.sip as string}</FormErrorMessage>
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

              <FormErrorMessage>
                {formik.errors.bpjsksh as string}
              </FormErrorMessage>
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

              <FormErrorMessage>
                {formik.errors.bpjsktk as string}
              </FormErrorMessage>
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
              <FormErrorMessage>
                {formik.errors.ijazah as string}
              </FormErrorMessage>
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
                {formik.errors.sertifikat_kompetensi as string}
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
              isLoading={loading}
            >
              Selanjutnya
            </Button>

            {/* <Button
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
            </Button> */}
          </VStack>
        </VStack>
      </CContainer>
    </Container>
  );
}
