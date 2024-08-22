import {
  Button,
  Checkbox,
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
import DatePickerDrawer from "../../components/dependent/input/DatePickerDrawer";
import StringInput from "../../components/dependent/input/StringInput";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import RequiredForm from "../../components/form/RequiredForm";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import useDcs from "../../global/useAuth";
import useScrollToTop from "../../hooks/useScrollToTop";
import formatDate from "../../lib/formatDate";
import req from "../../lib/req";

export default function LengkapiDataUser3() {
  useScrollToTop();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setDcs } = useDcs();

  const [noLimitStr, setNoLimitStr] = useState<boolean>(false);
  const [noLimitSip, setNoLimitSip] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      str: "",
      masa_berlaku_str: undefined as any,
      sip: "",
      masa_berlaku_sip: undefined as any,
      bpjsKesehatan: "",
      bpjsKetenagakerjaan: "",
      npwp: "",
    },
    validationSchema: yup.object().shape({
      str: yup.string().required("Harus diisi"),
      masa_berlaku_str: noLimitStr
        ? yup.mixed()
        : yup.string().required("Harus diisi"),
      sip: yup.string().required("Harus diisi"),
      masa_berlaku_sip: noLimitSip
        ? yup.mixed()
        : yup.string().required("Harus diisi"),
      bpjsKesehatan: yup.string().required("Harus diisi"),
      bpjsKetenagakerjaan: yup.string(),
      npwp: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        no_str: values.str,
        masa_berlaku_str: formatDate(values.masa_berlaku_sip, "short2"),
        no_sip: values.sip,
        masa_berlaku_sip: formatDate(values.masa_berlaku_sip, "short2"),
        no_bpjsksh: values.bpjsKesehatan,
        no_bpjsktk: values.bpjsKetenagakerjaan,
        npwp: values.npwp,
      };

      req
        .post(`/api/input-berkas`, payload)
        .then((r) => {
          if (r.status === 200) {
            setDcs(4);
            navigate("/lengkapi-data-personal-4");
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
              <StringInput
                name="str"
                placeholder="231*****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("str", input);
                }}
                inputValue={formik.values.str}
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
                isDisabled={noLimitStr}
              />
              <Checkbox
                colorScheme="ap"
                onChange={(e) => {
                  setNoLimitStr(e.target.checked);
                  if (e.target.checked) {
                    formik.setFieldValue("masa_berlaku_str", undefined);
                  }
                }}
                mt={3}
                isChecked={noLimitStr}
              >
                <Text mt={"-2px"} opacity={noLimitStr ? 1 : 0.4}>
                  Masa berlaku seumur hidup
                </Text>
              </Checkbox>
              <FormErrorMessage>
                {formik.errors.masa_berlaku_str as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={formik.errors.sip ? true : false}>
              <FormLabel>
                No. SIP
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="sip"
                placeholder="231*****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("sip", input);
                }}
                inputValue={formik.values.sip}
              />
              <FormErrorMessage>{formik.errors.sip as string}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.masa_berlaku_sip}>
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
                isDisabled={noLimitSip}
              />
              <Checkbox
                colorScheme="ap"
                onChange={(e) => {
                  setNoLimitSip(e.target.checked);
                  if (e.target.checked) {
                    formik.setFieldValue("masa_berlaku_sip", undefined);
                  }
                }}
                mt={3}
                isChecked={noLimitSip}
              >
                <Text mt={"-2px"} opacity={noLimitSip ? 1 : 0.4}>
                  Masa berlaku seumur hidup
                </Text>
              </Checkbox>
              <FormErrorMessage>
                {formik.errors.masa_berlaku_sip as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.bpjsKesehatan ? true : false}
            >
              <FormLabel>
                No. BPJS Kesehatan
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="bpjsKesehatan"
                placeholder="231*****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("bpjsKesehatan", input);
                }}
                inputValue={formik.values.bpjsKesehatan}
              />
              <FormErrorMessage>{formik.errors.bpjsKesehatan}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={6}
              isInvalid={formik.errors.bpjsKetenagakerjaan ? true : false}
            >
              <FormLabel>No. BPJS Ketenagakerjaan</FormLabel>
              <StringInput
                name="bpjsKetenagakerjaan"
                placeholder="231*****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("bpjsKetenagakerjaan", input);
                }}
                inputValue={formik.values.bpjsKetenagakerjaan}
              />
              <FormErrorMessage>
                {formik.errors.bpjsKetenagakerjaan}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={formik.errors.npwp ? true : false}>
              <FormLabel>
                NPWP
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="npwp"
                placeholder="231*****"
                onChangeSetter={(input) => {
                  formik.setFieldValue("npwp", input);
                }}
                inputValue={formik.values.npwp}
              />
              <FormErrorMessage>{formik.errors.npwp}</FormErrorMessage>
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
