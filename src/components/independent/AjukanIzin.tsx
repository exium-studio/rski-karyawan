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
import { useState } from "react";
import * as yup from "yup";
import useRenderTrigger from "../../global/useRenderTrigger";
import backOnClose from "../../lib/backOnClose";
import req from "../../lib/req";
import DatePickerDrawer from "../dependent/input/DatePickerDrawer";
import RequiredForm from "../form/RequiredForm";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import Textarea from "../dependent/input/Textarea";
import TimePickerDrawer from "../dependent/input/TimePickerDrawer";
import timeToSeconds from "../../lib/timeToSeconds";
import formatDate from "../../lib/formatDate";

export default function AjukanIzin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tgl_izin: undefined as any,
      waktu_izin: undefined as any,
      durasi: undefined as any,
      keterangan: undefined as any,
    },
    validationSchema: yup.object().shape({
      tgl_izin: yup.string().required("Harus diisi"),
      waktu_izin: yup.string().required("Harus diisi"),
      durasi: yup.string().required("Harus diisi"),
      keterangan: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      // setLoading(true);

      const payload = {
        tgl_izin: formatDate(values.tgl_izin, "short2"),
        waktu_izin: values.waktu_izin,
        durasi: timeToSeconds(values.durasi),
        keterangan: values.keterangan,
      };

      console.log(payload);

      req
        .post(`/api/store-izin`, payload)
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
              "Maaf terjadi kesalahan pada sistem",
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
        id="ajukan-izin-drawer"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={16} fontWeight={600}>
                Ajukan Izin
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
      >
        <CContainer px={6} pb={8}>
          <form id="ajukanIzinForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.tgl_izin}>
              <FormLabel>
                Tanggal Izin
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="ajukan-izin-date-picker-drawer"
                name="tgl_izin"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("tgl_izin", inputValue);
                }}
                inputValue={formik.values.tgl_izin}
              />
              <FormErrorMessage>
                {formik.errors.tgl_izin as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.waktu_izin}>
              <FormLabel>
                Waktu Izin
                <RequiredForm />
              </FormLabel>
              <TimePickerDrawer
                id="ajukan-izin-time-picker-drawer"
                name="waktu_izin"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("waktu_izin", inputValue);
                }}
                inputValue={formik.values.waktu_izin}
              />
              <FormErrorMessage>
                {formik.errors.waktu_izin as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.durasi}>
              <FormLabel>
                Durasi Izin
                <RequiredForm />
              </FormLabel>
              <TimePickerDrawer
                id="ajukan-izin-duration-picker-drawer"
                name="durasi"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("durasi", inputValue);
                }}
                inputValue={formik.values.durasi}
                placeholder="Tetapkan Durasi"
              />
              <FormErrorMessage>
                {formik.errors.durasi as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.keterangan}>
              <FormLabel>
                Keterangan
                <RequiredForm />
              </FormLabel>
              <Textarea
                name="keterangan"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("keterangan", inputValue);
                }}
                inputValue={formik.values.keterangan}
                placeholder={"Keterangan izin"}
              />
              <FormErrorMessage>
                {formik.errors.keterangan as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            type="submit"
            form="ajukanIzinForm"
            isLoading={loading}
          >
            Ajukan Izin
          </Button>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
