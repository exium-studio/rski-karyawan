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
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";
import req from "../../lib/req";

export default function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [dcs, setDcs] = useState<number | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    const authToken = getCookie("__auth_token");
    if (authToken) {
      req
        .get("/api/getuserinfo")
        .then((r) => {
          if (r.status === 200) {
            setDcs(r.data.data.data_completion_step);
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
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dcs) {
      switch (dcs) {
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
  }, [dcs]);

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
            setCookie("__auth_token", userData.arrtoken.token);
            localStorage.setItem("__user_data", JSON.stringify(userData));

            setDcs(r.data.data.data_completion_step);
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
            position: "bottom-right",
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
