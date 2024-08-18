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
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import { setCookie } from "typescript-cookie";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";
import req from "../../lib/req";
// import clientRequest from "../../const/clientRequest";
// import reqWithHeader from "../../const/reqWithHeader";
// import { setCookie } from "typescript-cookie";

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
            localStorage.setItem("__user_data", JSON.stringify(userData));

            switch (userData.data_completion_step) {
              case 0:
                navigate("/beranda");
                return;
              case 1:
                navigate("/lengkapi-data-personal-1");
                return;
              case 2:
                navigate("/lengkapi-data-personal-2");
                return;
              case 3:
                navigate("/lengkapi-data-personal-3");
                return;
              case 4:
                navigate("/lengkapi-data-personal-4");
                return;
            }
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
          onChange={formik.handleChange}
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
