import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [loading] = useState<boolean>(false);
  // const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // TODO implement cek email for forgot password api

      navigate(`/forgot-password-email-verif?email=${formik.values.email}`);
      // const payload = {
      //   email: values.email,
      //   password: values.password,
      // };

      // const url = ``;
      // clientRequest.then(() => {
      //   reqWithHeader
      //     .post(url, payload)
      //     .then((r) => {
      //       if (r.status === 200) {
      //         // TODO isi userData (opsioanl)
      //         const userData = {};
      //         setCookie("userData", JSON.stringify(userData));
      //         navigate("/beranda");
      //         toast({
      //           status: "success",
      //           title: "Berhasil Masuk",
      //           description: "Selamat datang",
      //           isClosable: true,
      //         });
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       toast({
      //         status: "error",
      //         title: "Gagal Masuk",
      //         description:
      //           e?.error?.response?.message || "Maaf terjadi kesalahan",
      //         isClosable: true,
      //       });
      //     })
      //     .finally(() => {
      //       setLoading(false);
      //     });
      // });
    },
  });

  return (
    <form id="forgotPasswordForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={formik.errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          onChange={formik.handleChange}
          placeholder="email@gmail.com"
        ></Input>
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <VStack>
        <Button
          mt={4}
          type="submit"
          form="forgotPasswordForm"
          colorScheme="ap"
          className="btn-ap clicky"
          w={"100%"}
          isLoading={loading}
          h={"50px"}
        >
          Lanjut
        </Button>
      </VStack>
    </form>
  );
}
