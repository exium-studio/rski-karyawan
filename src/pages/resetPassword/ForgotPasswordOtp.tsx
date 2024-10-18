import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import backOnClose from "../../lib/backOnClose";
import req from "../../lib/req";

export default function ForgotPasswordOtp() {
  // SX

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { email } = useParams();

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      otp: "",
    },

    validationSchema: yup.object().shape({
      otp: yup.string().required("Harus diisi"),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        email: email,
        kode_otp: values.otp,
      };

      req
        .post(`/api/forgot-password-verifyOtp`, payload)
        .then((r) => {
          if (r.status === 200) {
            navigate(`/new-password/${email}/${values.otp}`);
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

  return (
    <Container px={5}>
      <CContainer flex={1}>
        <LengkapiDataUserHeader />

        <CContainer my={"auto"} align={"center"} justify={"center"}>
          <Image src={`/images/logo.webp`} w={"100%"} maxW={"260px"} />
        </CContainer>

        <Text
          fontSize={20}
          fontWeight={600}
          textAlign={"center"}
          mt={"auto"}
          mb={2}
        >
          Verifikasi Email
        </Text>
        <Text textAlign={"center"} mb={6} opacity={0.6}>
          Masukan kode OTP 6 digit yang kami kirimkan ke email <b>{email}</b>.
        </Text>

        <Box>
          <form id="verifOTPform" onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.errors.otp ? true : false} mb={4}>
              <HStack>
                <PinInput
                  size={"lg"}
                  isInvalid={!!formik.errors.otp}
                  onChange={(input) => {
                    formik.setFieldValue("otp", input);
                  }}
                >
                  <PinInputField flex={1} h={"60px"} />
                  <PinInputField flex={1} h={"60px"} />
                  <PinInputField flex={1} h={"60px"} />
                  <PinInputField flex={1} h={"60px"} />
                  <PinInputField flex={1} h={"60px"} />
                  <PinInputField flex={1} h={"60px"} />
                </PinInput>
              </HStack>

              <FormErrorMessage>{formik.errors.otp}</FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              type="submit"
              form="verifOTPform"
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isLoading={loading}
            >
              Verifikasi OTP
            </Button>

            <CContainer align={"center"} gap={1}>
              <Text mt={6} opacity={0.4} textAlign={"center"}>
                Bermasalah dengan kode OTP?
              </Text>
              <Text
                textAlign={"center"}
                color={"p.500"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={backOnClose}
              >
                Kirim Ulang
              </Text>
            </CContainer>
          </form>
        </Box>

        <Text textAlign={"center"} opacity={0.4} mt={8} fontSize={14}>
          {"App ver 1.0"}
        </Text>
      </CContainer>
    </Container>
  );
}
