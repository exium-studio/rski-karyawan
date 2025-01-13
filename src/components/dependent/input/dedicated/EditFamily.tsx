import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiEditLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../../../constant/sizes";
import backOnClose from "../../../../lib/backOnClose";
import RequiredForm from "../../../form/RequiredForm";
import BackOnCloseButton from "../../../independent/BackOnCloseButton";
import CustomDrawer from "../../../independent/wrapper/CustomDrawer";
import DatePickerDrawer from "../DatePickerDrawer";
import StringInput from "../StringInput";
import SelectHubunganKeluarga from "./SingleSelectHubunganKeluarga";
import SingleSelectPendidikan from "./SingleSelectPendidikan";
import SelectStatusHidup from "./SingleSelectStatusHidup";

interface Props {
  data: any;
  id: string;
  name: string;
  onConfirm: (inputValue: any) => void;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function EditFamily({
  data,
  id,
  name,
  onConfirm,
  placement = "bottom",
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      hubungan: data.hubungan
        ? {
            value: data.hubungan.value || data.hubungan,
            label: data.hubungan.label || data.hubungan,
          }
        : undefined,
      nama_keluarga: data.nama_keluarga || "",
      status_hidup: {
        value: data.status_hidup ? true : false,
        label: data.status_hidup ? "Hidup" : "Meninggal",
      },
      pendidikan_terakhir: data.pendidikan_terakhir
        ? {
            value: data.pendidikan_terakhir?.id,
            label: data.pendidikan_terakhir?.label,
          }
        : undefined,
      pekerjaan: data.pekerjaan || "",
      no_hp: data.no_hp || "",
      email: data.email || "",
      is_bpjs: data.is_bpjs,
      tgl_lahir: data?.tgl_lahir,
      is_menikah: data?.is_menikah,
    },
    validationSchema: yup.object().shape({
      hubungan: yup.object().required("Harus diisi"),
      nama_keluarga: yup.string().required("Harus diisi"),
      status_hidup: yup.object().required("Harus diisi"),
      pendidikan_terakhir: yup.object().required("Harus diisi"),
      pekerjaan: yup.string().required("Harus diisi"),
      no_hp: yup.string().required("Harus diisi"),
      email: yup.string(),
      is_bpjs: yup.boolean(),
      tgl_lahir: yup.string().required(),
      is_menikah: yup.boolean(),
    }),
    onSubmit: (values, { resetForm }) => {
      onConfirm(values);
      backOnClose();
    },
  });

  const formikRef = useRef(formik);

  const statusHidup = formik.values?.status_hidup;

  useEffect(() => {
    if (!statusHidup?.value) {
      formikRef.current.setFieldValue("is_bpjs", false);
    }
  }, [statusHidup]);

  return (
    <>
      <IconButton
        aria-label="edit anggota keluarga"
        icon={<Icon as={RiEditLine} fontSize={iconSize} />}
        size={"sm"}
        className="clicky"
        colorScheme="ap"
        variant={"ghost"}
        onClick={onOpen}
      />

      <CustomDrawer
        id={id}
        name={name}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={16} fontWeight={600}>
                {"Edit Data Keluarga"}
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
      >
        <Box px={6}>
          <form id="tambahDataKeluargaForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.hubungan}>
              <FormLabel>
                Hubungan Keluarga
                <RequiredForm />
              </FormLabel>
              <SelectHubunganKeluarga
                id="lengkapi-data-user-2-select-hubungan-keluarga"
                name="hubungan"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("hubungan", inputValue);
                }}
                inputValue={formik.values.hubungan}
                placeholder="Pilih Hubungan Keluarga"
                isError={!!formik.errors.hubungan}
              />
              <FormErrorMessage>
                {formik.errors.hubungan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.nama_keluarga}>
              <FormLabel>
                Nama
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nama_keluarga"
                placeholder="Karlitos Kurniawan"
                onChangeSetter={(input) => {
                  formik.setFieldValue("nama_keluarga", input);
                }}
                inputValue={formik.values.nama_keluarga}
              />
              <FormErrorMessage>
                {formik.errors.nama_keluarga as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.status_hidup}>
              <FormLabel>
                Status Hidup
                <RequiredForm />
              </FormLabel>
              <SelectStatusHidup
                id="lengkapi-data-user-2-select-status-hidup"
                name="status_hidup"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status_hidup", inputValue);
                }}
                inputValue={formik.values.status_hidup}
                placeholder="Pilih Status Hidup"
                isError={!!formik.errors.status_hidup}
              />
              <FormErrorMessage>
                {formik.errors.status_hidup as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tgl_lahir}>
              <FormLabel>
                Tanggal Lahir
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id={`tgl_lahir-${id}`}
                name="tgl_lahir"
                onConfirm={(input) => {
                  formik.setFieldValue("tgl_lahir", input);
                }}
                inputValue={formik.values.tgl_lahir}
                isError={!!formik.errors.tgl_lahir}
              />
              <FormErrorMessage>
                {formik.errors.tgl_lahir as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={formik.errors.pendidikan_terakhir ? true : false}
            >
              <FormLabel>
                Pendidikan Terakhir
                <RequiredForm />
              </FormLabel>
              {/* <StringInput
                name="pendidikan_terakhir"
                placeholder="S1 Akuntansi"
                onChangeSetter={(input) => {
                  formik.setFieldValue("pendidikan_terakhir", input);
                }}
                inputValue={formik.values.pendidikan_terakhir}
              /> */}
              <SingleSelectPendidikan
                id={`edit-family-${formik.values.nama_keluarga}`}
                name="pendidikan_terakhir"
                placeholder="Sarjana 1"
                onConfirm={(input) => {
                  formik.setFieldValue("pendidikan_terakhir", input);
                }}
                inputValue={formik.values.pendidikan_terakhir}
                isError={!!formik.errors.pendidikan_terakhir}
              />
              <FormErrorMessage>
                {formik.errors.pendidikan_terakhir as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.pekerjaan}>
              <FormLabel>
                Pekerjaan
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="pekerjaan"
                placeholder="Dokter"
                onChangeSetter={(input) => {
                  formik.setFieldValue("pekerjaan", input);
                }}
                inputValue={formik.values.pekerjaan}
              />
              <FormErrorMessage>
                {formik.errors.pekerjaan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_hp}>
              <FormLabel>
                Nomor Telepon
                <RequiredForm />
              </FormLabel>
              <InputGroup>
                <InputLeftElement ml={2}>
                  <Text>+62</Text>
                </InputLeftElement>
                <StringInput
                  pl={12}
                  name="no_hp"
                  placeholder="8***********"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("no_hp", input);
                  }}
                  inputValue={formik.values.no_hp}
                />
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.no_hp as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.email}>
              <FormLabel>
                Email
                {/* <RequiredForm /> */}
              </FormLabel>
              <StringInput
                name="email"
                placeholder="contoh@email.com"
                onChangeSetter={(input) => {
                  formik.setFieldValue("email", input);
                }}
                inputValue={formik.values.email}
              />
              <FormErrorMessage>
                {formik.errors.email as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.is_menikah} mb={4}>
              {/* <FormLabel>
                Tanggungan BPJS
                 <RequiredForm />
              </FormLabel> */}

              <Checkbox
                colorScheme="ap"
                onChange={(e) => {
                  formik.setFieldValue("is_menikah", e.target.checked);
                }}
                isChecked={formik.values.is_menikah}
                isDisabled={!formik.values.status_hidup?.value}
              >
                <Text mt={"-2.5px"}>Sudah Menikah</Text>
              </Checkbox>
              <FormHelperText mt={2}>
                Jika anggota keluarga sudah menikah, harap centang.
              </FormHelperText>

              <FormErrorMessage>
                {formik.errors.is_menikah as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.is_bpjs}>
              {/* <FormLabel>
                Tanggungan BPJS
                <RequiredForm />
              </FormLabel> */}

              <Checkbox
                colorScheme="ap"
                onChange={(e) => {
                  formik.setFieldValue("is_bpjs", e.target.checked);
                }}
                isChecked={formik.values.is_bpjs}
                isDisabled={!formik.values.status_hidup.value}
              >
                <Text mt={"-2.5px"}>Tanggungan BPJS</Text>
              </Checkbox>
              <FormHelperText mt={2}>
                Jika anggota keluarga masih hidup dan tanggungan BPJS dicentang,
                BPJS anggota keluarga akan ditanggung oleh karyawan dan akan
                dikalkulasikan sebagai potongan dalam penggajian.
              </FormHelperText>

              <FormErrorMessage>
                {formik.errors.is_bpjs as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <VStack w={"100%"} pb={placement === "bottom" ? 8 : 6} mt={6}>
            <Button
              className="btn-solid clicky"
              w={"100%"}
              onClick={() => {
                formik.resetForm();
              }}
            >
              Clear
            </Button>

            <Button
              type="submit"
              form="tambahDataKeluargaForm"
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
            >
              Update
            </Button>
          </VStack>
        </Box>
      </CustomDrawer>
    </>
  );
}
