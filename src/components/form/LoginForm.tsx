import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useToast,
  // useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import useAuth from "../../global/useAuth";
import useAutoNavigate from "../../hooks/useAutoNavigate";
import req from "../../lib/req";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";
import useMedicAlert from "../../hooks/useMedicAlert";

export default function LoginForm() {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { setDcs, setStatusAktif, setJenisKaryawan } = useAuth();
  const autoNavigate = useAutoNavigate();
  const { onOpen, setData } = useMedicAlert();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email harus diisi"),
      password: yup.string().required("Password harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        email: values.email,
        password: values.password,
      };

      req
        .post(`/api/login`, payload)
        .then((r) => {
          if (r.status === 200) {
            const userData = r.data.data;

            // console.log("data", r.data.data);

            setDcs(userData.data_completion_step);
            setStatusAktif(userData.status_aktif);
            setJenisKaryawan(userData?.unit_kerja?.[0]?.jenis_karyawan);

            // setCookie("__auth_token", userData.arrtoken.token);
            localStorage.setItem(
              "__auth_token",
              JSON.stringify(userData.arrtoken.token)
            );
            localStorage.setItem("__user_data", JSON.stringify(userData));

            autoNavigate(
              userData.arrtoken.token,
              userData.data_completion_step,
              userData.status_aktif
            );

            toast({
              status: "success",
              title: r.data.message,
              description: `Selamat datang ${userData?.nama}`,
              position: "top",
              isClosable: true,
            });

            // Handle alert sip str
            const masaBerlakuStr = r.data.data.masa_berlaku_str;
            const masaBerlakuSip = r.data.data.masa_berlaku_sip;

            if (masaBerlakuStr || masaBerlakuSip) {
              onOpen();
              setData({
                masa_str: masaBerlakuStr,
                masa_sip: masaBerlakuSip,
              });
            }
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
    <form id="loginForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={formik.errors.email ? true : false}>
        <FormLabel>Username/NIK/Email</FormLabel>
        <StringInput
          name="email"
          onChangeSetter={(input) => {
            formik.setFieldValue("email", input);
          }}
          inputValue={formik.values.email}
          placeholder="email@gmail.com"
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.password ? true : false}>
        <FormLabel>Password</FormLabel>
        <PasswordInput
          name={"password"}
          onChangeSetter={(inputValue) => {
            formik.setFieldValue("password", inputValue);
          }}
          inputValue={formik.values.password}
          placeholder="Masukkan kata sandi"
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <VStack>
        <Text
          ml={"auto"}
          fontWeight={600}
          color={"p.500"}
          as={Link}
          to={"/forgot-password"}
        >
          Lupa password?
        </Text>

        <Button
          mt={4}
          type="submit"
          form="loginForm"
          colorScheme="ap"
          className="btn-ap clicky"
          w={"100%"}
          isLoading={loading}
          h={"50px"}
        >
          Masuk
        </Button>
      </VStack>
    </form>
  );
}
