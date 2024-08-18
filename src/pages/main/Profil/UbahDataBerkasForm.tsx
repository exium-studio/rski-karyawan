import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import FileInput from "../../../components/dependent/input/FileInput";
import RequestPatchDataButton from "../../../components/dependent/RequestPatchDataButton";
import RequiredForm from "../../../components/form/RequiredForm";

interface Props {
  data: any;
}

export default function UbahDataBerkasForm({ data }: Props) {
  const fileValidation = yup
    .mixed()
    .test("fileType", "Harus berupa file", (value) => value instanceof File);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      ktp: data?.ktp?.path || undefined,
      kk: data?.kk?.path || undefined,
      sip: data?.sip?.path || undefined,
      bpjsksh: data?.bpjsksh?.path || undefined,
      bpjsktk: data?.bpjsktk?.path || undefined,
      ijazah: data?.ijazah?.path || undefined,
      sertifikat_kompetensi: data?.sertifikat_kompetensi?.path || undefined,
    },
    validationSchema: yup.object().shape({
      ktp: fileValidation.required("Harus diisi"),
      kk: fileValidation.required("Harus diisi"),
      sip: fileValidation.required("Harus diisi"),
      bpjsksh: fileValidation.required("Harus diisi"),
      bpjsktk: fileValidation.required("Harus diisi"),
      ijazah: yup.string().required("Harus diisi"),
      sertifikat_kompetensi: fileValidation.required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // TODO hit api simpan data personal 4
    },
  });

  // SX

  return (
    <form id="ubahDataBerkasForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={!!formik.errors.ktp}>
        <FormLabel>
          KTP
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="ktp"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("ktp", inputValue);
            }}
            inputValue={formik.values.ktp}
            isError={!!formik.errors.ktp}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("ktp");
            }}
            column="ktp"
            payload={formik.values.ktp}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.ktp as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.kk}>
        <FormLabel>
          Kartu Keluarga
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="kk"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("kk", inputValue);
            }}
            inputValue={formik.values.kk}
            isError={!!formik.errors.kk}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("kk");
            }}
            column="kk"
            payload={formik.values.kk}
          />
        </HStack>

        <FormErrorMessage>{formik.errors.kk as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.sip}>
        <FormLabel>
          SIP
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="sip"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("sip", inputValue);
            }}
            inputValue={formik.values.sip}
            isError={!!formik.errors.sip}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("sip");
            }}
            column="sip"
            payload={formik.values.sip}
          />
        </HStack>

        <FormErrorMessage>{formik.errors.sip as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.bpjsksh}>
        <FormLabel>
          BPJS Kesehatan
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="bpjsksh"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("bpjsksh", inputValue);
            }}
            inputValue={formik.values.bpjsksh}
            isError={!!formik.errors.bpjsksh}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("bpjsksh");
            }}
            column="bpjsksh"
            payload={formik.values.bpjsksh}
          />
        </HStack>

        <FormErrorMessage>{formik.errors.bpjsksh as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.bpjsktk}>
        <FormLabel>
          BPJS Ketenagakerjaan
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="bpjsktk"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("bpjsktk", inputValue);
            }}
            inputValue={formik.values.bpjsktk}
            isError={!!formik.errors.bpjsktk}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("bpjsktk");
            }}
            column="bpjsktk"
            payload={formik.values.bpjsktk}
          />
        </HStack>

        <FormErrorMessage>{formik.errors.bpjsktk as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.ijazah ? true : false}>
        <FormLabel>
          Ijazah Terakhir
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="ijazah"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("ijazah", inputValue);
            }}
            inputValue={formik.values.ijazah}
            isError={!!formik.errors.ijazah}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("ijazah");
            }}
            column="ijazah"
            payload={formik.values.ijazah}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.ijazah as string}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formik.errors.sertifikat_kompetensi}>
        <FormLabel>
          Sertifikat Kompetensi
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <FileInput
            name="sertifikat_kompetensi"
            onChangeSetter={(inputValue) => {
              formik.setFieldValue("sertifikat_kompetensi", inputValue);
            }}
            inputValue={formik.values.sertifikat_kompetensi}
            isError={!!formik.errors.sertifikat_kompetensi}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("sertifikat_kompetensi");
            }}
            column="sertifikat_kompetensi"
            payload={formik.values.sertifikat_kompetensi}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.sertifikat_kompetensi as string}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}
