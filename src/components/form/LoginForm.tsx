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
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import * as yup from "yup";
import req from "../../lib/req";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";

export default function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

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
            toast({
              status: "success",
              title: r.data.message,
              description: `Selamat datang kembali ${userData?.nama}`,
              position: "top",
              isClosable: true,
            });

            setCookie("__auth_token", userData.arrtoken.token);
            localStorage.setItem("__user_data", JSON.stringify(userData));
            navigate("/beranda");
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

      const userData = {
        id: 1,
        nama: "Very Very Long Name Posible Inputted",
        foto_profil: "/images/diklat.jpg",
        unit_kerja: {
          nama_unit: "Poli Anak",
        },
        data_completion_step: 0,
      };

      setCookie("userData", JSON.stringify(userData));
    },
  });

  return (
    <form id="loginForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={formik.errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
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
          Lupa kata sandi?
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
