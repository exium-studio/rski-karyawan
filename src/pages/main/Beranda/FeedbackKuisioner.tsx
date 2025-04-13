import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import NoData from "../../../components/independent/NoData";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import RequiredForm from "../../../components/form/RequiredForm";
import MiniProfile from "../../../components/independent/MiniProfile";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import {
  useContentBgColor,
  useErrorColor,
  useLightDarkColor,
} from "../../../constant/colors";
import { dummyKuisioner } from "../../../constant/dummy";
import {
  Interface__Kuisioner,
  Interface__User,
} from "../../../constant/interfaces";
import useDataState from "../../../hooks/useDataState";

interface Data {
  user_dinilai: Interface__User;
  kuisioner: Interface__Kuisioner[];
}

export default function FeedbackKuisioner() {
  // data kuosioner
  const { error, loading, data, retry } = useDataState<Data>({
    initialData: undefined,
    url: "",
  });

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { jawaban: Array(data?.kuisioner.length).fill(null) },
    validationSchema: yup.object().shape({
      jawaban: yup
        .array()
        .of(
          yup
            .number()
            .required("Jawaban tidak boleh kosong")
            .typeError("Jawaban harus berupa angka")
        )
        .required("Jawaban tidak boleh kosong")
        .min(1, "Setidaknya harus ada satu jawaban"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  const handleAnswerClick = (index: number, value: number) => {
    const currentAnswers = [...formik.values.jawaban];

    currentAnswers[index] = value;

    console.log(currentAnswers);
    formik.setFieldValue("jawaban", currentAnswers);
  };

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();
  const errorColor = useErrorColor();

  return (
    <CContainer>
      <Header
        left={"back"}
        title="Kuisioner"
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer p={5} gap={3} bg={contentBgColor}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            {loading && (
              <>
                <Skeleton h={"80px"} />

                <Skeleton h={"74px"} />

                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} h={"120.6px"} />
                ))}
              </>
            )}

            {!data && <NoData />}

            {data && (
              <>
                <CContainer
                  flex={0}
                  bg={lightDarkColor}
                  p={4}
                  borderRadius={12}
                >
                  <MiniProfile data={data.user_dinilai} />
                </CContainer>

                <Alert status="info" p={4} borderRadius={8}>
                  <Box>
                    <Text>
                      Silakan berikan penilaian Anda untuk setiap pertanyaan
                      berikut ini:
                    </Text>
                    {/* <OrderedList mt={2}>
                      <ListItem fontSize={"sm"}>
                        <Text>Sangat tidak setuju</Text>
                      </ListItem>
                      <ListItem fontSize={"sm"}>
                        <Text>Tidak setuju</Text>
                      </ListItem>
                      <ListItem fontSize={"sm"}>
                        <Text>Netral</Text>
                      </ListItem>
                      <ListItem fontSize={"sm"}>
                        <Text>Setuju</Text>
                      </ListItem>
                      <ListItem fontSize={"sm"}>
                        <Text>Sangat setuju</Text>
                      </ListItem>
                    </OrderedList> */}
                  </Box>
                </Alert>

                <form id="jawabanForm" onSubmit={formik.handleSubmit}>
                  <CContainer gap={3}>
                    {data.kuisioner.map((kuisioner, pertanyaan_index) => (
                      <CContainer
                        key={pertanyaan_index}
                        p={4}
                        borderRadius={12}
                        bg={lightDarkColor}
                      >
                        <FormControl>
                          <FormLabel
                            fontWeight={500}
                            fontSize={18}
                            mb={2}
                            mr={0}
                          >
                            <HStack align={"start"}>
                              <Text>{pertanyaan_index + 1}.</Text>
                              <Text flex={1}>{kuisioner.pertanyaan}</Text>
                              <RequiredForm />
                            </HStack>
                          </FormLabel>

                          <HStack justify={"center"} gap={4} mt={3}>
                            {Array.from({ length: 5 }).map((_, i) => {
                              // console.log(formik.values.jawaban[index], i);

                              return (
                                <Center
                                  key={i}
                                  p={2}
                                  w={"40px"}
                                  // border={"1px solid var(--divider3)"}
                                  borderRadius={"full"}
                                  cursor={"pointer"}
                                  border={
                                    formik.values.jawaban[pertanyaan_index] ===
                                    i
                                      ? "1px solid var(--p500)"
                                      : "1px solid var(--divider3)"
                                  }
                                  bg={
                                    formik.values.jawaban[pertanyaan_index] ===
                                    i
                                      ? "var(--p500a4)"
                                      : ""
                                  }
                                  color={
                                    formik.values.jawaban[pertanyaan_index] ===
                                    i
                                      ? "p.500"
                                      : ""
                                  }
                                  onClick={() => {
                                    handleAnswerClick(pertanyaan_index, i);
                                  }}
                                >
                                  <Text fontWeight={550}>{i + 1}</Text>
                                </Center>
                              );
                            })}
                          </HStack>
                        </FormControl>
                      </CContainer>
                    ))}
                  </CContainer>
                </form>

                {formik.errors.jawaban && (
                  <Text textAlign={"center"} color={errorColor}>
                    Kuisioner belum diisi semua
                  </Text>
                )}

                <Button
                  type="submit"
                  form="jawabanForm"
                  className="btn-ap clicky"
                  colorScheme="ap"
                  size={"lg"}
                >
                  Kirim
                </Button>
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
