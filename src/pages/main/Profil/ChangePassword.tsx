import { useFormik } from "formik";
import Header from "../../../components/dependent/Header";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import * as yup from "yup";
import req from "../../../lib/req";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import RequiredForm from "../../../components/form/RequiredForm";
import PasswordInput from "../../../components/dependent/input/PasswordInput";
import { responsiveSpacing } from "../../../constant/sizes";

export default function ChangePassword() {
  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      password_lama: "",
      password_baru: "",
      konfirmasi_password_baru: "",
    },
    validationSchema: yup.object().shape({
      password_lama: yup.string().required("Harus diisi"),
      password_baru: yup.string().required("Harus diisi"),
      konfirmasi_password_baru: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        current_password: values.password_lama,
        password: values.password_baru,
        password_confirmation: values.konfirmasi_password_baru,
        _method: "post",
      };
      setLoading(true);
      req
        .post(`/api/password-reset`, payload)
        .then((r) => {
          if (r.status === 200) {
            toast({
              status: "success",
              title: r.data.message,
              isClosable: true,
              position: "top",
            });
            resetForm();
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
    <CContainer flex={1}>
      <Header
        title="Ubah Kata Sandi"
        left={"back"}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer flex={1} bg={contentBgColor} p={5} pb={8}>
        <CContainer bg={lightDarkColor} p={4} borderRadius={8}>
          <form id="ubahKataSandiForm" onSubmit={formik.handleSubmit}>
            <FormControl
              mb={4}
              isInvalid={formik.errors.password_lama ? true : false}
            >
              <FormLabel>
                Kata Sandi Lama
                <RequiredForm />
              </FormLabel>
              <PasswordInput
                name="password_lama"
                placeholder="******"
                onChangeSetter={(input) => {
                  formik.setFieldValue("password_lama", input);
                }}
                inputValue={formik.values.password_lama}
              />
              <FormErrorMessage>
                {formik.errors.password_lama as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.password_baru ? true : false}
            >
              <FormLabel>
                Kata Sandi Baru
                <RequiredForm />
              </FormLabel>
              <PasswordInput
                name="password_baru"
                placeholder="******"
                onChangeSetter={(input) => {
                  formik.setFieldValue("password_baru", input);
                }}
                inputValue={formik.values.password_baru}
              />
              <FormErrorMessage>
                {formik.errors.password_baru as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={responsiveSpacing}
              isInvalid={formik.errors.konfirmasi_password_baru ? true : false}
            >
              <FormLabel>
                Konfirmasi Kata Sandi Baru
                <RequiredForm />
              </FormLabel>
              <PasswordInput
                name="konfirmasi_password_baru"
                placeholder="******"
                onChangeSetter={(input) => {
                  formik.setFieldValue("konfirmasi_password_baru", input);
                }}
                inputValue={formik.values.konfirmasi_password_baru}
              />
              <FormErrorMessage>
                {formik.errors.konfirmasi_password_baru as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <Button
            mt={"auto"}
            ml={"auto"}
            w={"100%"}
            className="btn-ap clicky"
            colorScheme="ap"
            type="submit"
            form="ubahKataSandiForm"
            isLoading={loading}
          >
            Simpan
          </Button>
        </CContainer>
      </CContainer>
    </CContainer>
  );
}
