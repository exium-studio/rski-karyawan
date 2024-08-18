import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { iconSize } from "../../../../constant/sizes";
import backOnClose from "../../../../lib/backOnClose";
import RequiredForm from "../../../form/RequiredForm";
import BackOnCloseButton from "../../../independent/BackOnCloseButton";
import CustomDrawer from "../../../independent/wrapper/CustomDrawer";
import StringInput from "../StringInput";
import SelectHubunganKeluarga from "./SingleSelectHubunganKeluarga";
import SelectStatusHidup from "./SingleSelectStatusHidup";

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

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      hubungan_keluarga: undefined,
      nama: undefined,
      status_hidup: undefined,
      pekerjaan: undefined,
      telepon: undefined,
      email: undefined,
    },
    validationSchema: yup.object().shape({
      hubungan_keluarga: yup.object().required("Harus diisi"),
      nama: yup.string().required("Harus diisi"),
      status_hidup: yup.object().required("Harus diisi"),
      pekerjaan: yup.string().required("Harus diisi"),
      telepon: yup.string().required("Harus diisi"),
      email: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      onConfirm(values);
      formik.resetForm();
      backOnClose();
    },
  });

  // SX

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
              <Text fontSize={20} fontWeight={600}>
                {"Tambah Data Keluarga"}
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
      >
        <Box px={6}>
          <form id="tambahDataKeluargaForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.hubungan_keluarga}>
              <FormLabel>
                Hubungan Keluarga
                <RequiredForm />
              </FormLabel>
              <SelectHubunganKeluarga
                id="lengkapi-data-user-2-select-hubungan-keluarga"
                name="hubungan_keluarga"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("hubungan_keluarga", inputValue);
                }}
                inputValue={formik.values.hubungan_keluarga}
                placeholder="Pilih Hubungan Keluarga"
                isError={!!formik.errors.hubungan_keluarga}
              />
              <FormErrorMessage>
                {formik.errors.hubungan_keluarga as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.nama}>
              <FormLabel>
                Nama
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="nama"
                placeholder="Karlitos Kurniawan"
                onChangeSetter={(input) => {
                  formik.setFieldValue("nama", input);
                }}
                inputValue={formik.values.nama}
              />
              <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
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
              <FormErrorMessage>{formik.errors.pekerjaan}</FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.telepon}>
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
                  name="telepon"
                  placeholder="8***********"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("telepn", input);
                  }}
                  inputValue={formik.values.telepon}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.telepon}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.email}>
              <FormLabel>
                Email
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="email"
                placeholder="contoh@email.com"
                onChangeSetter={(input) => {
                  formik.setFieldValue("email", input);
                }}
                inputValue={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
