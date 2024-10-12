import { Image, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";

export default function Materi() {
  // const [loading, setLoading] = useState<boolean>(false);
  // const toast = useToast();

  // const formik = useFormik({
  //   validateOnChange: false,
  //   initialValues: {
  //     pelaku: "",
  //     tgl_kejadian: undefined as any,
  //     lokasi: "",
  //     waktu: undefined as any,
  //     kronologi: "",
  //     foto: undefined as any,
  //   },
  //   validationSchema: yup.object().shape({
  //     pelaku: yup.string().required("Harus diisi"),
  //     tgl_kejadian: yup.date().required("Harus diisi"),
  //     lokasi: yup.string().required("Harus diisi"),
  //     waktu: yup.string().required("Harus diisi"),
  //     kronologi: yup.string().required("Harus diisi"),
  //     foto: yup.mixed().required("Harus diisi"),
  //   }),
  //   onSubmit: (values, { resetForm }) => {
  //     setLoading(true);

  //     const payload = new FormData();
  //     payload.append("pelaku", values.pelaku);
  //     payload.append("tgl_kejadian", formatDate(values.tgl_kejadian, "short2"));
  //     payload.append("lokasi", values.lokasi);
  //     payload.append("waktu", values.waktu);
  //     payload.append("kronologi", values.kronologi);
  //     payload.append("foto", values.foto);

  //     req
  //       .post(`/api/store-laporan`, payload)
  //       .then((r) => {
  //         if (r.status === 200) {
  //           toast({
  //             status: "success",
  //             title: r.data.message,
  //             position: "top",
  //             isClosable: true,
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         toast({
  //           status: "error",
  //           title:
  //             (typeof e?.response?.data?.message === "string" &&
  //               (e?.response?.data?.message as string)) ||
  //             "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
  //           isClosable: true,
  //           position: "top",
  //         });
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   },
  // });

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Pelaporan"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer
        flex={1}
        p={5}
        bg={contentBgColor}
        align={"center"}
        justify={"center"}
      >
        <Image src="/vectors/error503.webp" maxW={"300px"} mb={6} />
        <Text fontSize={16} fontWeight={600}>
          Maaf, fitur ini belum tersedia
        </Text>
      </CContainer>

      {/* <CContainer
        flex={1}
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
            <Text fontSize={16} fontWeight={600}>
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

            <FormControl mb={4} isInvalid={!!formik.errors.tgl_kejadian}>
              <FormLabel>
                Tanggal Kejadian
                <RequiredForm />
              </FormLabel>
              <DatePickerDrawer
                id="laporan-date-picker"
                name="tgl_kejadian"
                placeholder=""
                onConfirm={(inputValue) => {
                  formik.setFieldValue("tgl_kejadian", inputValue);
                }}
                inputValue={formik.values.tgl_kejadian}
                isError={!!formik.errors.tgl_kejadian}
              />
              <FormErrorMessage>
                {formik.errors.tgl_kejadian as string}
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

            <FormControl mb={4} isInvalid={!!formik.errors.kronologi}>
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

            <FormControl isInvalid={!!formik.errors.kronologi}>
              <FormLabel>
                Foto
                <RequiredForm />
              </FormLabel>
              <FileInput
                name="foto"
                onChangeSetter={(input) => {
                  formik.setFieldValue("foto", input);
                }}
                inputValue={formik.values.foto}
                isError={!!formik.errors.foto}
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
          isLoading={loading}
        >
          Kirim
        </Button>
      </CContainer> */}
    </CContainer>
  );
}
