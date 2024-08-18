import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HorizontalSliderIndicator from "../../components/dependent/HorizontalSliderIndicator";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import Container from "../../components/independent/wrapper/Container";
import CContainer from "../../components/independent/wrapper/CContainer";
import RequiredForm from "../../components/form/RequiredForm";
import DatePickerDrawer from "../../components/dependent/input/DatePickerDrawer";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function LengkapiDataUser3() {
  useScrollToTop();

  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      str: undefined,
      masa_berlaku_str: undefined,
      sip: undefined,
      masa_berlaku_sip: undefined,
      bpjsKesehatan: undefined,
      bpjsKetenagakerjaan: undefined,
    },
    validationSchema: yup.object().shape({
      str: yup.string().required("Harus diisi"),
      masa_berlaku_str: yup.string().required("Harus diisi"),
      sip: yup.string().required("Harus diisi"),
      masa_berlaku_sip: yup.string().required("Harus diisi"),
      bpjsKesehatan: yup.string().required("Harus diisi"),
      bpjsKetenagakerjaan: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // TODO hit api simpan data personal 3

      navigate("/lengkapi-data-personal-4");
    },
  });

  // SX

  return (
    <Container>
      <CContainer gap={0} align={"stretch"} flex={1} px={5}>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={4}
            active={3}
            justify={"center"}
            activeW="16px"
            mb={8}
          />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={4} mr={"auto"}>
            Berkas
          </Text>

          <form id="LengkapiDataUser3Form" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={formik.errors.str ? true : false}>
              <FormLabel>
                No. STR
                <RequiredForm />
              </FormLabel>
              <Input
                name="str"
                placeholder="231*****"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.str}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.masa_berlaku_str ? true : false}
            >
              <FormLabel>
                Masa Berlaku STR
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="lengkapi-data-user-3-select-masa-berlaku-str"
                name={"masa_berlaku_str"}
                onConfirm={(inputValue) => {
                  formik.setFieldValue("masa_berlaku_str", inputValue);
                }}
                inputValue={formik.values.masa_berlaku_str}
                isError={!!formik.errors.masa_berlaku_str}
              />
              <FormErrorMessage>
                {formik.errors.masa_berlaku_str}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={formik.errors.sip ? true : false}>
              <FormLabel>
                No. SIP
                <RequiredForm />
              </FormLabel>
              <Input
                name="sip"
                placeholder="231*****"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.sip}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.masa_berlaku_sip ? true : false}
            >
              <FormLabel>
                Masa Berlaku SIP
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="lengkapi-data-user-3-select-masa-berlaku-sip"
                name={"masa_berlaku_sip"}
                onConfirm={(inputValue) => {
                  formik.setFieldValue("masa_berlaku_sip", inputValue);
                }}
                inputValue={formik.values.masa_berlaku_sip}
                isError={!!formik.errors.masa_berlaku_sip}
              />
              <FormErrorMessage>
                {formik.errors.masa_berlaku_sip}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.bpjsKesehatan ? true : false}
            >
              <FormLabel>
                BPJS Kesehatan
                <RequiredForm />
              </FormLabel>
              <Input
                name="bpjsKesehatan"
                placeholder="231*****"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.bpjsKesehatan}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={6}
              isInvalid={formik.errors.bpjsKetenagakerjaan ? true : false}
            >
              <FormLabel>
                BPJS Ketenagakerjaan
                <RequiredForm />
              </FormLabel>
              <Input
                name="bpjsKetenagakerjaan"
                placeholder="231*****"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                {formik.errors.bpjsKetenagakerjaan}
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
            >
              Selanjutnya
            </Button>

            <Button
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
            </Button>
          </VStack>
        </VStack>
      </CContainer>
    </Container>
  );
}
