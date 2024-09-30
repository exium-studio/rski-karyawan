import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import StringInput from "../dependent/input/StringInput";
import req from "../../lib/req";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email harus diisi"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        email: values.email,
      };

      req
        .post(`/api/forgot-password-sendOtp`, payload)
        .then((r) => {
          if (r.status === 200) {
            navigate(`/forgot-password/${values.email}`);
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
    <form id="forgotPasswordForm" onSubmit={formik.handleSubmit}>
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
