import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import req from "../../lib/req";
import AlertNewPasswordSuccess from "../dependent/AlertNewPasswordSuccess";
import PasswordInput from "../dependent/input/PasswordInput";

export default function NewPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const { email, otp } = useParams();

  const { isOpen, onOpen } = useDisclosure();

  // function isSixChar(password: string) {
  //   return password.length >= 6;
  // }

  // function isContainNum(password: string) {
  //   const numRegex = /\d/;
  //   return numRegex.test(password);
  // }

  // function isContainSpecialChar(password: string) {
  //   const allowedSpecialChar = [
  //     "!",
  //     "@",
  //     "#",
  //     "$",
  //     "%",
  //     "^",
  //     "&",
  //     "*",
  //     "(",
  //     ")",
  //     "-",
  //     "=",
  //     "_",
  //     "+",
  //     "[",
  //     "]",
  //     "{",
  //     "}",
  //     ";",
  //     ":",
  //     "/",
  //     ",",
  //     ".",
  //     "<",
  //     ">",
  //     "?",
  //   ];
  //   return allowedSpecialChar.some((char) => password.includes(char));
  // }

  // function isMatch(password: string, confirmPassword: string) {
  //   return password === confirmPassword;
  // }

  // function isPasswordValid() {
  //   return (
  //     isSixChar(formik.values.password) &&
  //     isContainNum(formik.values.password) &&
  //     isContainSpecialChar(formik.values.password) &&
  //     isMatch(formik.values.password, formik.values.confirmPassword)
  //   );
  // }

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { new_password: "", confirm_password: "" },
    validationSchema: yup.object().shape({
      new_password: yup
        .string()
        .min(8, "Minimal 8 karakter")
        .required("Harus diisi"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("new_password")], "Password tidak cocok")
        .required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        email: email,
        kode_otp: otp,
        password: values.new_password,
        password_confirmation: values.confirm_password,
      };

      req
        .post(`/api/reset-password`, payload)
        .then((r) => {
          if (r.status === 200) {
            onOpen();
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
    <form id="forgotPasswordForm" onSubmit={formik.handleSubmit}>
      <AlertNewPasswordSuccess isOpen={isOpen} onOpen={onOpen} />

      <FormControl mb={4} isInvalid={formik.errors.new_password ? true : false}>
        <FormLabel>Password</FormLabel>
        <PasswordInput
          name={"password"}
          onChangeSetter={(inputValue) => {
            formik.setFieldValue("new_password", inputValue);
          }}
          inputValue={formik.values.new_password}
          placeholder={"Kata sandi baru"}
        />
        <FormErrorMessage>{formik.errors.new_password}</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}
        isInvalid={formik.errors.confirm_password ? true : false}
      >
        <FormLabel>Konfirmasi Password</FormLabel>
        <PasswordInput
          name={"confirm_password"}
          onChangeSetter={(inputValue) => {
            formik.setFieldValue("confirm_password", inputValue);
          }}
          inputValue={formik.values.confirm_password}
          placeholder={"Konfirmasi kata sandi"}
        />
        <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>
      </FormControl>

      {/* <VStack
        align={"stretch"}
        opacity={formik.values.password ? 1 : 0}
        transition={"200ms"}
      >
        <HStack>
          <Center
            p={"2px"}
            bg={isSixChar(formik.values.password) ? "green.500" : redColor}
            borderRadius={"full"}
          >
            <Icon
              as={isSixChar(formik.values.password) ? RiCheckLine : RiCloseLine}
              color={"white"}
            />
          </Center>
          <Text
            color={isSixChar(formik.values.password) ? "green.500" : redColor}
          >
            Minimal 6 karakter
          </Text>
        </HStack>

        <HStack>
          <Center
            p={"2px"}
            bg={isContainNum(formik.values.password) ? "green.500" : redColor}
            borderRadius={"full"}
          >
            <Icon
              as={
                isContainNum(formik.values.password) ? RiCheckLine : RiCloseLine
              }
              color={"white"}
            />
          </Center>
          <Text
            color={
              isContainNum(formik.values.password) ? "green.500" : redColor
            }
          >
            Mengandung angka
          </Text>
        </HStack>

        <HStack>
          <Center
            p={"2px"}
            bg={
              isContainSpecialChar(formik.values.password)
                ? "green.500"
                : redColor
            }
            borderRadius={"full"}
          >
            <Icon
              as={
                isContainSpecialChar(formik.values.password)
                  ? RiCheckLine
                  : RiCloseLine
              }
              color={"white"}
            />
          </Center>
          <Text
            color={
              isContainSpecialChar(formik.values.password)
                ? "green.500"
                : redColor
            }
          >
            Mengandung karakter khusus yang dibolehkan
          </Text>
        </HStack>

        <HStack>
          <Center
            p={"2px"}
            bg={
              isMatch(formik.values.password, formik.values.confirmPassword)
                ? "green.500"
                : redColor
            }
            borderRadius={"full"}
          >
            <Icon
              as={
                isMatch(formik.values.password, formik.values.confirmPassword)
                  ? RiCheckLine
                  : RiCloseLine
              }
              color={"white"}
            />
          </Center>
          <Text
            color={
              isMatch(formik.values.password, formik.values.confirmPassword)
                ? "green.500"
                : redColor
            }
          >
            Kata Sandi Cocok
          </Text>
        </HStack>
      </VStack> */}

      <VStack mt={6}>
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
          Lanjutkan
        </Button>
      </VStack>
    </form>
  );
}
