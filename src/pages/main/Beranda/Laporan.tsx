import {
  Alert,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../../../components/dependent/Header";
import DatePickerDrawer from "../../../components/dependent/input/DatePickerDrawer";
import StringInput from "../../../components/dependent/input/StringInput";
import Textarea from "../../../components/dependent/input/Textarea";
import TimePickerDrawer from "../../../components/dependent/input/TimePickerDrawer";
import RequiredForm from "../../../components/form/RequiredForm";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";

export default function Laporan() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      pelaku: undefined,
      tanggal_kejadian: undefined,
      lokasi: undefined,
      waktu: undefined,
      kronologi: undefined,
      upload_foto: undefined,
    },
    validationSchema: yup.object().shape({
      pelaku: yup.string().required("Harus diisi"),
      tanggal_kejadian: yup.date().required("Harus diisi"),
      lokasi: yup.string().required("Harus diisi"),
      waktu: yup.string().required("Harus diisi"),
      kronologi: yup.string().required("Harus diisi"),
      upload_foto: yup.array().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header
        left={"back"}
        title="Laporan"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer
        p={5}
        bg={contentBgColor}
        gap={3}
        position={"relative"}
        overflow={"clip"}
      >
        <Alert status="info" p={4} borderRadius={8}>
          <Text fontSize={14}>
            Harap gunakan fitur lapor ini dengan bijak. Segala bentuk
            pelanggaran akan diproses sesuai dengan peraturan instansi.
          </Text>
        </Alert>

        <CContainer
          flex={0}
          borderRadius={12}
          bg={lightDarkColor}
          p={4}
          zIndex={4}
        >
          <HStack mb={4}>
            <Text fontSize={20} fontWeight={600}>
              Buat Laporan
            </Text>
          </HStack>

          <form id="laporanForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.pelaku}>
              <FormLabel>
                Pelaku/Subjek
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="pelaku"
                placeholder="Jolitos Kurniawan"
                onChangeSetter={(input) => {
                  formik.setFieldValue("pelaku", input);
                }}
                inputValue={formik.values.pelaku}
              />
              <FormErrorMessage>
                {formik.errors.pelaku as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.tanggal_kejadian}>
              <FormLabel>
                Tanggal Kejadian
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="laporan-date-picker"
                name="tanggal_kejadian"
                placeholder=""
                onConfirm={(inputValue) => {
                  formik.setFieldValue("tanggal_kejadian", inputValue);
                }}
                inputValue={formik.values.tanggal_kejadian}
                isError={!!formik.errors.tanggal_kejadian}
              />
              <FormErrorMessage>
                {formik.errors.tanggal_kejadian as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.lokasi}>
              <FormLabel>
                Lokasi Kejadian
                <RequiredForm />
              </FormLabel>
              <StringInput
                name="lokasi"
                placeholder="Dekat tangga gudang obat lt. 2"
                onChangeSetter={(input) => {
                  formik.setFieldValue("lokasi", input);
                }}
                inputValue={formik.values.lokasi}
              />
              <FormErrorMessage>
                {formik.errors.lokasi as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.waktu}>
              <FormLabel>
                Waktu Kejadian
                <RequiredForm />
              </FormLabel>
              <TimePickerDrawer
                id="laporan-time-picker"
                name="waktu"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("waktu", inputValue);
                }}
                inputValue={formik.values.waktu}
                isError={!!formik.errors.waktu}
              />
              <FormErrorMessage>
                {formik.errors.waktu as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.kronologi}>
              <FormLabel>
                Kronologi
                <RequiredForm />
              </FormLabel>
              <Textarea
                name="kronologi"
                placeholder="Waktu itu saat saya sedang..."
                onChangeSetter={(inputValue) => {
                  formik.setFieldValue("kronologi", inputValue);
                }}
                inputValue={formik.values.kronologi}
              />
              <FormErrorMessage>
                {formik.errors.kronologi as string}
              </FormErrorMessage>
            </FormControl>
          </form>
        </CContainer>

        <Button
          type="submit"
          form="laporanForm"
          className="btn-ap clicky"
          colorScheme="ap"
          mt={"auto"}
          size={"lg"}
        >
          Kirim
        </Button>
      </CContainer>
    </CContainer>
  );
}
