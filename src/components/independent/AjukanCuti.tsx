import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as yup from "yup";
import countDateRange from "../../lib/countDateRange";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import SingleSelectJenisCuti from "../dependent/input/dedicated/SingleSelectJenisCuti";
import RequiredForm from "../form/RequiredForm";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import req from "../../lib/req";
import { useState } from "react";
import useRenderTrigger from "../../global/useRenderTrigger";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";

export default function AjukanCuti() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      date_range: undefined as any,
      jenis_cuti: undefined as any,
    },
    validationSchema: yup.object().shape({
      date_range: yup.object().required("Harus diisi"),
      jenis_cuti: yup.object().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        date_range: values.date_range,
        tgl_mulai: formatDate(values?.date_range?.from, "short"),
        tgl_selesai: formatDate(values?.date_range?.to, "short"),
        jenis_cuti: values.jenis_cuti.value,
        //@ts-ignore
        durasi: countDateRange(values.date_range.from, values.date_range.to),
      };

      // console.log(payload);

      req
        .post(`/api/store-cuti`, payload)
        .then((r) => {
          if (r.status === 200) {
            setRt(!rt);
            backOnClose();
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
            position: "top",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      <IconButton
        aria-label="ajukan cuti button"
        className="btn-ap clicky"
        colorScheme="ap"
        icon={<Icon as={RiAddLine} fontSize={28} />}
        position={"fixed"}
        right={5}
        bottom={8}
        size={"lg"}
        borderRadius={12}
        onClick={onOpen}
      />

      <CustomDrawer
        id="ajukan-cuti-drawer"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={16} fontWeight={600}>
                Ajukan Cuti
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
      >
        <CContainer px={6} pb={8}>
          <form id="ajukanCutiForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.jenis_cuti}>
              <FormLabel>
                Tipe Cuti
                <RequiredForm />
              </FormLabel>
              <SingleSelectJenisCuti
                id="ajukan-cuti-select-jenis-cuti"
                name="jenis_cuti"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_cuti", inputValue);
                }}
                inputValue={formik.values.jenis_cuti}
                placeholder="Pilih Tipe Cuti"
              />
              <FormErrorMessage>
                {formik.errors.jenis_cuti as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!formik.errors.date_range}>
              <FormLabel>
                Rentang Tanggal
                <RequiredForm />
              </FormLabel>
              <DateRangePickerDrawer
                id="ajukan-cuti-date-range-picker-drawer"
                name="date_range"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("date_range", inputValue);
                }}
                inputValue={formik.values.date_range}
              />
              <FormErrorMessage>
                {formik.errors.date_range as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            type="submit"
            form="ajukanCutiForm"
            isLoading={loading}
          >
            Ajukan Cuti
          </Button>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
