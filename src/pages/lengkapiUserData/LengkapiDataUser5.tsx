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
import PasswordInput from "../../components/dependent/input/PasswordInput";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import RequiredForm from "../../components/form/RequiredForm";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import useDcs from "../../global/useAuth";
import useScrollToTop from "../../hooks/useScrollToTop";
import req from "../../lib/req";
import { getCookie } from "typescript-cookie";

export default function LengkapiDataUser5() {
  useScrollToTop();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setDcs } = useDcs();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: yup.object().shape({
      new_password: yup
        .string()
        .min(8, "Minimal 8 karakter")
        .required("Harus diisi"),
      confirm_password: yup
        .string()
        .min(8, "Minimal 8 karakter")
        .required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        token: getCookie("__auth_token"),
        password: values.new_password,
        password_confirmation: values.confirm_password,
      };

      req
        .post(`/api/change-password-reset`, payload)
        .then((r) => {
          if (r.status === 200) {
            setDcs(0);
            navigate("/beranda");
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
              "Maaf terjadi kesalahan pada sistem",
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
            active={5}
            justify={"center"}
            activeW="16px"
            mb={8}
          />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={4} mr={"auto"}>
            Buat Password Baru
          </Text>

          <form id="LengkapiDataUser3Form" onSubmit={formik.handleSubmit}>
            <FormControl
              mb={4}
              isInvalid={formik.errors.new_password ? true : false}
            >
              <FormLabel>
                Password Baru
                <RequiredForm />
              </FormLabel>
              <PasswordInput
                name="new_passowrd"
                placeholder="pass****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("new_password", input);
                }}
                inputValue={formik.values.new_password}
              />
              <FormErrorMessage>{formik.errors.new_password}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.errors.confirm_password ? true : false}
            >
              <FormLabel>
                Konfirmasi Password Baru
                <RequiredForm />
              </FormLabel>
              <PasswordInput
                name="new_passowrd"
                placeholder="pass****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("confirm_password", input);
                }}
                inputValue={formik.values.confirm_password}
              />
              <FormErrorMessage>
                {formik.errors.confirm_password}
              </FormErrorMessage>
            </FormControl>
          </form>

          <VStack align={"stretch"} pt={6} mt={"auto"} w={"100%"}>
            <Button
              colorScheme="ap"
              type="submit"
              form="LengkapiDataUser3Form"
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
              to={"/lengkapi-data-personal-4"}
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
