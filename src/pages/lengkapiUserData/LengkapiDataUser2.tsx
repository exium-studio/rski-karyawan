import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BooleanBadge from "../../components/dependent/BooleanBadge";
import DeleteAnggotaKeluarga from "../../components/dependent/DeleteAnggotaKeluarga";
import HorizontalSliderIndicator from "../../components/dependent/HorizontalSliderIndicator";
import AddFamily from "../../components/dependent/input/dedicated/AddFamily";
import EditFamily from "../../components/dependent/input/dedicated/EditFamily";
import LengkapiDataUserHeader from "../../components/dependent/LengkapiDataUserHeader";
import FlexLine from "../../components/independent/FlexLine";
import CContainer from "../../components/independent/wrapper/CContainer";
import Container from "../../components/independent/wrapper/Container";
import useDcs from "../../global/useAuth";
import useScrollToTop from "../../hooks/useScrollToTop";
import formatDate from "../../lib/formatDate";
import req from "../../lib/req";

export default function LengkapiDataUser2() {
  useScrollToTop();

  const navigate = useNavigate();

  const [newItemAdded, setNewItemAdded] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setDcs } = useDcs();

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      keluarga: [] as any[],
    },

    validationSchema: yup.object().shape({
      keluarga: yup
        .array()
        .min(1, "Keluarga harus diisi")
        .required("Keluarga harus diisi"),
    }),

    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const payload = {
        keluarga: values.keluarga.map((anggota) => ({
          data_keluarga_id: anggota.id,
          hubungan: anggota.hubungan,
          pendidikan_terakhir: anggota?.pendidikan_terakhir,
          nama_keluarga: anggota.nama_keluarga,
          status_hidup: anggota.status_hidup,
          tgl_lahir: formatDate(anggota.tgl_lahir, "short2"),
          pekerjaan: anggota.pekerjaan,
          no_hp: anggota.no_hp,
          email: anggota.email,
          status_keluarga_id: anggota.status_keluarga_id,
          is_bpjs: anggota.is_bpjs,
          is_menikah: anggota.is_menikah,
          verifikator_1: anggota.verifikator_1,
          alasan: anggota.alasan,
        })),
      };

      req
        .post(`/api/input-keluarga`, payload)
        .then((r) => {
          if (r.status === 200) {
            setDcs(3);
            navigate("/lengkapi-data-personal-3");
            toast({
              status: "success",
              title: r.data.message,
              isClosable: true,
              position: "top",
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
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  // console.log(formik.values.keluarga);

  return (
    <Container px={5}>
      <CContainer flex={1}>
        <LengkapiDataUserHeader />

        <VStack gap={0} flex={1} align={"stretch"} mt={4}>
          <HorizontalSliderIndicator
            length={5}
            active={2}
            justify={"center"}
            activeW="16px"
            mb={6}
          />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={2} mr={"auto"}>
            Data Keluarga
          </Text>
          <Text fontSize={14} opacity={0.4}>
            Silahkan tambah data keluarga dengan tombol di bawah ini
          </Text>

          <CContainer flex={0} gap={0}>
            <AnimatePresence>
              {formik.values?.keluarga?.map((anggota: any, i: number) => (
                <motion.div
                  key={anggota.id}
                  initial={{
                    opacity: newItemAdded ? 0 : 1,
                    scale: newItemAdded ? 0.5 : 1,
                    background: newItemAdded ? "p.500 !important" : "",
                  }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.5, height: 0 }}
                  transition={{ duration: newItemAdded ? 0.5 : 0.3 }}
                >
                  <VStack
                    // py={3}
                    // border={"1px solid var(--divider3)"}
                    // px={2}
                    align={"stretch"}
                    mt={4}
                    borderRadius={8}
                  >
                    <HStack justify={"space-between"} mb={2} mr={-1}>
                      <Text fontWeight={600} fontSize={16}>
                        {anggota.nama_keluarga}
                      </Text>

                      <HStack>
                        <EditFamily
                          data={anggota}
                          id={`lengkapi-data-user-2-edit-data-keluarga-${anggota.id}`}
                          name="keluarga"
                          onConfirm={(inputValue) => {
                            const newKeluarga = [...formik.values.keluarga];
                            const index = newKeluarga.findIndex(
                              (item) => item.id === anggota.id
                            );

                            if (index !== -1) {
                              newKeluarga[index] = {
                                ...inputValue,
                                id: anggota.id,
                              };
                              formik.setFieldValue("keluarga", newKeluarga);
                            }
                          }}
                        />

                        <DeleteAnggotaKeluarga
                          index={i}
                          data={anggota}
                          onDelete={(index) => {
                            setNewItemAdded(false);
                            setTimeout(() => {
                              formik.setFieldValue(
                                "keluarga",
                                formik.values.keluarga.filter(
                                  (_: any, i: number) => i !== index
                                )
                              );
                            }, 50);
                          }}
                        />
                      </HStack>
                    </HStack>

                    <>
                      <HStack>
                        <Text opacity={0.4}>Hubungan Keluarga</Text>
                        <FlexLine />
                        <Text>{anggota?.hubungan}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Status Hidup</Text>
                        <FlexLine />
                        <Text>
                          {anggota?.status_hidup ? "Aktif" : "Tidak Aktif"}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Jenis Kelamin</Text>
                        <FlexLine />
                        <Text>
                          {anggota?.jenis_kelamin ? "Laki-laki" : "Perempuan"}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Tempat Lahir</Text>
                        <FlexLine />
                        <Text>{anggota?.tempat_lahir}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Tanggal Lahir</Text>
                        <FlexLine />
                        <Text>{formatDate(anggota?.tgl_lahir)}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Pendidikan Terakhir</Text>
                        <FlexLine />
                        <Text>{anggota?.pendidikan_terakhir?.label}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Agama</Text>
                        <FlexLine />
                        <Text>{anggota?.agama?.label}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Golongan Darah</Text>
                        <FlexLine />
                        <Text>{anggota?.kategori_darah?.label}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Pekerjaan</Text>
                        <FlexLine />
                        <Text>{anggota?.pekerjaan}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Nomor Telepon</Text>
                        <FlexLine />
                        <Text>{anggota?.no_hp}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Email</Text>
                        <FlexLine />
                        <Text>{anggota?.email}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>No. Rekam Medis</Text>
                        <FlexLine />
                        <Text>{anggota?.no_rm}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Tanggungan BPJS</Text>
                        <FlexLine />
                        <BooleanBadge
                          data={anggota.is_bpjs}
                          trueValue="Ditanggung"
                          falseValue="Tidak Ditanggung"
                        />
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Sudah Menikah</Text>
                        <FlexLine />
                        <BooleanBadge
                          data={anggota?.is_menikah}
                          trueValue="Menikah"
                          falseValue="Belum Menikah"
                        />
                      </HStack>
                    </>
                  </VStack>
                </motion.div>
              ))}
            </AnimatePresence>
          </CContainer>

          <form id="LengkapiDataUser2Form" onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={!!formik.errors.keluarga} mt={4}>
              <AddFamily
                id="lengkapi-data-user-2-tambah-data-keluarga"
                name="keluarga"
                onConfirm={(inputValue) => {
                  setNewItemAdded(true);
                  const newKeluarga = Array.isArray(formik.values.keluarga)
                    ? [...formik.values.keluarga]
                    : [];
                  newKeluarga.push({
                    ...inputValue,
                    id: new Date().getTime().toString(),
                  });
                  formik.setFieldValue("keluarga", newKeluarga);
                }}
              />
              <FormErrorMessage>
                {formik.errors.keluarga as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <VStack align={"stretch"} pt={6} mt={"auto"} w={"100%"}>
            <Button
              colorScheme="ap"
              type="submit"
              form="LengkapiDataUser2Form"
              className="btn-ap clicky"
              w={"100%"}
              h={"50px"}
              isLoading={loading}
            >
              Selanjutnya
            </Button>

            {/* <Button
              w={"100%"}
              variant={"ghost"}
              colorScheme="ap"
              as={Link}
              to={"/lengkapi-data-personal-3"}
              color="p.500"
              fontWeight={500}
              mx={"auto"}
            >
              Next Step (Debug)
            </Button> */}
          </VStack>
        </VStack>
      </CContainer>
    </Container>
  );
}
