import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
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
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import RequiredForm from "../form/RequiredForm";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import { fileValidation } from "../../lib/validationSchemas";
import Textarea from "../dependent/input/Textarea";
import StringInput from "../dependent/input/StringInput";
import TimePickerDrawer from "../dependent/input/TimePickerDrawer";
import FileInput from "../dependent/input/FileInput";
import formatDate from "../../lib/formatDate";

export default function AjukanDiklatEksternal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: "" as any,
      deskripsi: "" as any,
      date_range: undefined as any,
      jam_mulai: "" as any,
      jam_selesai: "" as any,
      lokasi: "" as any,
      skp: "" as any,
      dokumen: undefined as any,
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      deskripsi: yup.string().required("Harus diisi"),
      date_range: yup.object().required("Harus diisi"),
      jam_mulai: yup.string().required("Harus diisi"),
      jam_selesai: yup.string().required("Harus diisi"),
      lokasi: yup.string().required("Harus diisi"),
      skp: yup.string().required("Harus diisi"),
      dokumen: fileValidation().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = new FormData();

      payload.append("nama", values.nama);
      payload.append("deskripsi", values.deskripsi);
      payload.append(
        "tgl_mulai",
        formatDate(values?.date_range?.from, "short2")
      );
      payload.append(
        "tgl_selesai",
        formatDate(values?.date_range?.to, "short2")
      );
      payload.append("jam_mulai", values.jam_mulai);
      payload.append("jam_selesai", values.jam_selesai);
      payload.append("lokasi", values.lokasi);
      payload.append("skp", values.skp);
      payload.append("dokumen", values.dokumen);

      // console.log(payload);

      req
        .post(`/api/store-diklat`, payload)
        .then((r) => {
          if (r.status === 200) {
            setRt(!rt);
            backOnClose();
            toast({
              status: "success",
              title: r.data?.message,
              position: "top",
              isClosable: true,
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
                Ajukan Diklat Eksternal
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
      >
        <CContainer px={6} pb={8}>
          <form id="ajukanDiklatEskternalForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.nama}>
              <FormLabel>
                Nama Diklat
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nama"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("nama", inputValue);
                }}
                inputValue={formik.values.nama}
                placeholder="Diklat Kesehatan"
              />
              <FormErrorMessage>
                {formik.errors.nama as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Kategori Diklat
                <RequiredForm />
              </FormLabel>
              <Input defaultValue={"Eksternal"} readOnly />
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.deskripsi}>
              <FormLabel>
                Deskripsi
                <RequiredForm />
              </FormLabel>
              <Textarea
                name="deskripsi"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("deskripsi", inputValue);
                }}
                inputValue={formik.values.deskripsi}
              />
              <FormErrorMessage>
                {formik.errors.deskripsi as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.date_range}>
              <FormLabel>
                Rentang Tanggal
                <RequiredForm />
              </FormLabel>
              <DateRangePickerDrawer
                id="ajukan-diklat"
                name="date_range"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("date_range", inputValue);
                }}
                inputValue={formik.values.date_range}
                isError={!!formik.errors.date_range}
              />
              <FormErrorMessage>
                {formik.errors.jam_mulai as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.lokasi}>
              <FormLabel>
                Lokasi
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="lokasi"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("lokasi", inputValue);
                }}
                inputValue={formik.values.lokasi}
                placeholder="Surakarta"
                isError={!!formik.errors.lokasi}
              />
              <FormErrorMessage>
                {formik.errors.lokasi as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.jam_mulai}>
              <FormLabel>
                Jam Mulai
                <RequiredForm />
              </FormLabel>
              <TimePickerDrawer
                id="ajukan-diklat"
                name="jam_mulai"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jam_mulai", inputValue);
                }}
                inputValue={formik.values.jam_mulai}
                isError={!!formik.errors.jam_mulai}
              />
              <FormErrorMessage>
                {formik.errors.jam_mulai as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.jam_selesai}>
              <FormLabel>
                Jam Selesai
                <RequiredForm />
              </FormLabel>
              <TimePickerDrawer
                id="ajukan-diklat"
                name="jam_selesai"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jam_selesai", inputValue);
                }}
                inputValue={formik.values.jam_selesai}
                isError={!!formik.errors.jam_selesai}
              />
              <FormErrorMessage>
                {formik.errors.jam_selesai as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!formik.errors.dokumen}>
              <FormLabel>
                Sertifikat
                <RequiredForm />
              </FormLabel>
              <FileInput
                id="ajukan-diklat"
                name="dokumen"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("dokumen", inputValue);
                }}
                inputValue={formik.values.dokumen}
                accept={".jpg, .JPG, .png, .PNG, .pdf, .PDF"}
                isError={!!formik.errors.dokumen}
              />
              <FormErrorMessage>
                {formik.errors.dokumen as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!formik.errors.skp}>
              <FormLabel>
                SKP
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="skp"
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("skp", inputValue);
                }}
                inputValue={formik.values.skp}
                placeholder="SKP"
                isError={!!formik.errors.skp}
              />
              <FormErrorMessage>{formik.errors.skp as string}</FormErrorMessage>
            </FormControl>
          </form>

          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            type="submit"
            form="ajukanDiklatEskternalForm"
            isLoading={loading}
          >
            Ajukan Diklat Eksternal
          </Button>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
