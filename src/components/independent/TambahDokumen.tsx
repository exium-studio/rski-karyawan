import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
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
import DisclosureHeader from "../dependent/DisclosureHeader";
import FileInputLarge from "../dependent/input/FileInputLarge";
import StringInput from "../dependent/input/StringInput";
import RequiredForm from "../form/RequiredForm";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

export default function TambahDokumen() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      label: "",
      file: undefined as any,
    },
    validationSchema: yup.object().shape({
      label: yup.string().required("Harus diisi"),
      file: yup.mixed().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = new FormData();
      payload.append("label", values.label);
      payload.append("file", values.file);

      req
        .post(`/api/store-berkas-karyawan`, payload)
        .then((r) => {
          if (r.status === 200) {
            setRt(!rt);
            backOnClose();
            toast({
              status: "success",
              title: r?.data?.message,
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
        aria-label="tambah dokumen button"
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
        id="tambah-dokumen-drawer"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Tambah Dokumen" />}
      >
        <CContainer px={6} pb={8}>
          <form id="tambahDokumenForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.label}>
              <FormLabel>
                Nama
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="label"
                onChangeSetter={(input) => {
                  formik.setFieldValue("label", input);
                }}
                inputValue={formik.values.label}
                placeholder="Dokumen Penting"
              />
              <FormErrorMessage>
                {formik.errors.file as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!formik.errors.file}>
              <FormLabel>
                Dokumen
                <RequiredForm />
              </FormLabel>
              <FileInputLarge
                name="file"
                onChangeSetter={(input) => {
                  formik.setFieldValue("file", input);
                }}
                inputValue={formik.values.file}
              />
              <FormErrorMessage>
                {formik.errors.file as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <Button
            colorScheme="ap"
            className="btn-ap clicky"
            type="submit"
            form="tambahDokumenForm"
            isLoading={loading}
          >
            Tambahkan
          </Button>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
