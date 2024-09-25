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
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { iconSize } from "../../../../constant/sizes";
import RequiredForm from "../../../form/RequiredForm";
import BackOnCloseButton from "../../../independent/BackOnCloseButton";
import CustomDrawer from "../../../independent/wrapper/CustomDrawer";
import StringInput from "../StringInput";
import SelectHubunganKeluarga from "./SingleSelectHubunganKeluarga";
import SelectStatusHidup from "./SingleSelectStatusHidup";
import SingleSelectPendidikan from "./SingleSelectPendidikan";
import { useEffect, useRef } from "react";

interface Props {
  id: string;
  name: string;
  onConfirm: (inputValue: any) => void;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function AddFamily({
  id,
  name,
  onConfirm,
  placement = "bottom",
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      hubungan: undefined as any,
      nama_keluarga: "" as any,
      status_hidup: undefined as any,
      pendidikan_terakhir: "" as any,
      pekerjaan: "" as any,
      no_hp: "" as any,
      email: "" as any,
      is_bpjs: true,
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
    }),
    onSubmit: (values, { resetForm }) => {
      onConfirm(values);
      toast({
        status: "success",
        title: `Data keluarga ${values.hubungan?.label} (${values.nama_keluarga}) ditambahkan`,
        isClosable: true,
        position: "top",
      });
      formik.resetForm();
      // backOnClose();
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
      <Button
        leftIcon={<Icon as={RiAddLine} fontSize={iconSize} />}
        pl={3}
        w={"100%"}
        colorScheme="ap"
        variant={"outline"}
        className="clicky"
        onClick={onOpen}
      >
        Tambah
      </Button>

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
                {"Tambah Data Keluarga"}
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
                isDisabled={!formik.values.status_hidup?.value}
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
              Tambahkan
            </Button>
          </VStack>
        </Box>
      </CustomDrawer>
    </>
  );
}
