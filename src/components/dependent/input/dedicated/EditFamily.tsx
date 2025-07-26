import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
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
import SelectAgama from "./SingleSelectAgama";
import SelectGender from "./SingleSelectGender";
import SelectGoldar from "./SIngleSelectGoldar";
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
      nama_keluarga: data?.nama_keluarga,
      hubungan: {
        value:
          typeof data?.hubungan === "string"
            ? data.hubungan
            : data?.hubungan?.label,
        label:
          typeof data?.hubungan === "string"
            ? data.hubungan
            : data?.hubungan?.label,
      },
      status_hidup: {
        value:
          typeof data?.status_hidup === "number"
            ? data.status_hidup
            : data?.status_hidup?.value,
        label:
          typeof data?.status_hidup === "number"
            ? data?.status_hidup
              ? "Aktif"
              : "Tidak Aktif"
            : data?.status_hidup?.label,
      },
      jenis_kelamin: {
        value:
          typeof data?.jenis_kelamin === "number"
            ? data.jenis_kelamin
            : data?.jenis_kelamin?.value,
        label:
          typeof data?.jenis_kelamin === "number"
            ? data?.jenis_kelamin
              ? "Laki - laki"
              : "Perempuan"
            : data?.jenis_kelamin?.label,
      },
      tempat_lahir: data?.tempat_lahir,
      tgl_lahir: new Date(data?.tgl_lahir),
      pendidikan_terakhir: data?.pendidikan_terakhir
        ? {
            value: data?.pendidikan_terakhir?.id,
            label: data?.pendidikan_terakhir?.label,
          }
        : (undefined as any),
      agama: data?.kategori_agama
        ? {
            value: data?.kategori_agama?.id,
            label: data?.kategori_agama?.label,
          }
        : (undefined as any),
      goldar: data?.kategori_darah
        ? {
            value: data?.kategori_darah?.id,
            label: data?.kategori_darah?.label,
          }
        : (undefined as any),
      pekerjaan: data?.pekerjaan || "",
      no_hp: data?.no_hp || "",
      email: data?.email || "",
      no_rm: data?.no_rm || "",
      is_bpjs: !!data?.is_bpjs,
      is_menikah: !!data?.is_menikah,
    },
    validationSchema: yup.object().shape({
      nama_keluarga: yup.string().required("Harus diisi"),
      hubungan: yup.object().required("Harus diisi"),
      status_hidup: yup.object().required("Harus diisi"),
      jenis_kelamin: yup.object().required("Harus diisi"),
      tempat_lahir: yup.string().required("Harus diisi"),
      tgl_lahir: yup.string().required("Harus diisi"),
      pendidikan_terakhir: yup.object(),
      agama: yup.object(),
      goldar: yup.object(),
      pekerjaan: yup.string(),
      no_hp: yup.string(),
      email: yup.string(),
      no_rm: yup.string(),
      is_bpjs: yup.boolean(),
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
          <form id="data-keluarga-form" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.nama_keluarga}>
              <FormLabel>
                Nama Keluarga
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nama_keluarga"
                placeholder="Yeli Kurniawan"
                onChangeSetter={(input) => {
                  formik.setFieldValue("nama_keluarga", input);
                }}
                inputValue={formik.values.nama_keluarga}
              />
              <FormErrorMessage>
                {formik.errors.nama_keluarga as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.hubungan}>
              <FormLabel>
                Hubungan
                <RequiredForm />
              </FormLabel>
              <SelectHubunganKeluarga
                id="hubungan"
                name="hubungan"
                onConfirm={(input) => {
                  formik.setFieldValue("hubungan", input);
                }}
                inputValue={formik.values.hubungan}
                isError={!!formik.errors.hubungan}
              />
              <FormErrorMessage>
                {formik.errors.hubungan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.status_hidup}>
              <FormLabel>
                Status Hidup
                <RequiredForm />
              </FormLabel>
              <SelectStatusHidup
                id="status_hidup"
                name="status_hidup"
                onConfirm={(input) => {
                  formik.setFieldValue("status_hidup", input);
                }}
                inputValue={formik.values.status_hidup}
                isError={!!formik.errors.status_hidup}
              />
              <FormErrorMessage>
                {formik.errors.status_hidup as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.jenis_kelamin}>
              <FormLabel>
                Jenis Kelamin
                <RequiredForm />
              </FormLabel>
              <SelectGender
                id="jenis_kelamin"
                name="jenis_kelamin"
                onConfirm={(input) => {
                  formik.setFieldValue("jenis_kelamin", input);
                }}
                inputValue={formik.values.jenis_kelamin}
                isError={!!formik.errors.jenis_kelamin}
              />
              <FormErrorMessage>
                {formik.errors.hubungan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tempat_lahir}>
              <FormLabel>
                Tempat Lahir
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="tempat_lahir"
                placeholder="Surakarta"
                onChangeSetter={(input) => {
                  formik.setFieldValue("tempat_lahir", input);
                }}
                inputValue={formik.values.tempat_lahir}
              />
              <FormErrorMessage>
                {formik.errors.nama_keluarga as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tgl_lahir}>
              <FormLabel>
                Tanggal Lahir
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id={`date-picker-tgl-lahir`}
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

            <FormControl mb={4} isInvalid={!!formik.errors.pendidikan_terakhir}>
              <FormLabel>
                Pendidikan Terakhir
                {/* <RequiredForm /> */}
              </FormLabel>
              <SingleSelectPendidikan
                id="pendidikan_terakhir"
                name="pendidikan_terakhir"
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

            <FormControl mb={4} isInvalid={!!formik.errors.agama}>
              <FormLabel>Agama</FormLabel>
              <SelectAgama
                id="agama"
                name="agama"
                onConfirm={(input) => {
                  formik.setFieldValue("agama", input);
                }}
                inputValue={formik.values.agama}
                isError={!!formik.errors.agama}
              />
              <FormErrorMessage>
                {formik.errors.hubungan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.goldar}>
              <FormLabel>Golongan Darah</FormLabel>
              <SelectGoldar
                id="goldar"
                name="goldar"
                onConfirm={(input) => {
                  formik.setFieldValue("goldar", input);
                }}
                inputValue={formik.values.goldar}
                isError={!!formik.errors.goldar}
              />
              <FormErrorMessage>
                {formik.errors.hubungan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.pekerjaan}>
              <FormLabel>Pekerjaan </FormLabel>
              <StringInput
                name="pekerjaan"
                onChangeSetter={(input) => {
                  formik.setFieldValue("pekerjaan", input);
                }}
                inputValue={formik.values.pekerjaan}
                placeholder="Dokter"
              />
              <FormErrorMessage>
                {formik.errors.pekerjaan as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_hp}>
              <FormLabel>No.Telp</FormLabel>
              <StringInput
                name="no_hp"
                onChangeSetter={(input) => {
                  formik.setFieldValue("no_hp", input);
                }}
                inputValue={formik.values.no_hp}
                placeholder="08**********"
              />
              <FormErrorMessage>
                {formik.errors.no_hp as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <StringInput
                name="email"
                onChangeSetter={(input) => {
                  formik.setFieldValue("email", input);
                }}
                inputValue={formik.values.email}
                placeholder="example@email.com"
              />
              <FormErrorMessage>
                {formik.errors.email as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.no_rm}>
              <FormLabel>No. Rekam Medis</FormLabel>
              <StringInput
                name="no_rm"
                placeholder="3301*******"
                onChangeSetter={(input) => {
                  formik.setFieldValue("no_rm", input);
                }}
                inputValue={formik.values.no_rm}
              />
              <FormErrorMessage>
                {formik.errors.nama_keluarga as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.is_menikah} mb={2}>
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
              >
                <Text mt={"-2.5px"}>Sudah Menikah</Text>
              </Checkbox>

              <FormErrorMessage>
                {formik.errors.is_menikah as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.is_bpjs}>
              <Checkbox
                colorScheme="ap"
                isChecked={formik.values.is_bpjs}
                onChange={(e) => {
                  formik.setFieldValue("is_bpjs", e.target.checked);
                }}
              >
                <Text mt={"-3px"}>Tanggungan BPJS</Text>
              </Checkbox>
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
              form="data-keluarga-form"
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
