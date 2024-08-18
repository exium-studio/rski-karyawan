import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";
import AlertNewPasswordSuccess from "../dependent/AlertNewPasswordSuccess";
import PasswordInput from "../dependent/input/PasswordInput";

export default function NewPasswordForm() {
  const [loading] = useState<boolean>(false);
  const { isOpen, onOpen } = useDisclosure();

  function isSixChar(password: string) {
    return password.length >= 6;
  }

  function isContainNum(password: string) {
    const numRegex = /\d/;
    return numRegex.test(password);
  }

  function isContainSpecialChar(password: string) {
    const allowedSpecialChar = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "=",
      "_",
      "+",
      "[",
      "]",
      "{",
      "}",
      ";",
      ":",
      "/",
      ",",
      ".",
      "<",
      ">",
      "?",
    ];
    return allowedSpecialChar.some((char) => password.includes(char));
  }

  function isMatch(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  function isPasswordValid() {
    return (
      isSixChar(formik.values.password) &&
      isContainNum(formik.values.password) &&
      isContainSpecialChar(formik.values.password) &&
      isMatch(formik.values.password, formik.values.confirmPassword)
    );
  }

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: yup.object().shape({
      password: yup.string().required("Kata Sandi harus diisi"),
      confirmPassword: yup
        .string()
        .required("Konfirmasi Kata Sandi harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      onOpen();
      // TODO implement cek email for forgot password api

      // const payload = {
      //   password: values.password,
      //   confirmPassword: values.confirmPassword,
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

  // SX
  const redColor = useColorModeValue("red.500", "red.300");

  return (
    <form id="forgotPasswordForm" onSubmit={formik.handleSubmit}>
      <AlertNewPasswordSuccess isOpen={isOpen} onOpen={onOpen} />

      <FormControl mb={4} isInvalid={formik.errors.password ? true : false}>
        <FormLabel>Kata Sandi</FormLabel>
        <PasswordInput
          name={"password"}
          onChangeSetter={(inputValue) => {
            formik.setFieldValue("password", inputValue);
          }}
          inputValue={formik.values.password}
          placeholder={"Kata sandi baru"}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.password ? true : false}>
        <FormLabel>Konfirmasi Kata Sandi</FormLabel>
        <PasswordInput
          name={"confirmPassword"}
          onChangeSetter={(inputValue) => {
            formik.setFieldValue("confirmPassword", inputValue);
          }}
          inputValue={formik.values.confirmPassword}
          placeholder={"Konfirmasi kata sandi"}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <VStack
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
      </VStack>

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
          isDisabled={!isPasswordValid()}
        >
          Lanjut
        </Button>
      </VStack>
    </form>
  );
}
