import {
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import * as yup from "yup";
import BooleanBadge from "../../../components/dependent/BooleanBadge";
import DeleteAnggotaKeluarga from "../../../components/dependent/DeleteAnggotaKeluarga";
import AddFamily from "../../../components/dependent/input/dedicated/AddFamily";
import EditFamily from "../../../components/dependent/input/dedicated/EditFamily";
import RequestPatchDataButton from "../../../components/dependent/RequestPatchDataButton";
import FlexLine from "../../../components/independent/FlexLine";
import NoData from "../../../components/independent/NoData";
import CContainer from "../../../components/independent/wrapper/CContainer";
import formatDate from "../../../lib/formatDate";

interface Props {
  data: any[];
}

export default function UbahDataKeluargaForm({ data }: Props) {
  const [newItemAdded, setNewItemAdded] = useState(false);

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      keluarga: data ? [...(data as any[])] : [],
    },

    validationSchema: yup.object().shape({
      keluarga: yup
        .array()
        .min(1, "Keluarga harus diisi")
        .required("Keluarga harus diisi"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  // console.debug(formik.values.keluarga);

  // For Payload, from component format to payload format
  const remappedData = formik.values.keluarga.map((anggota) => ({
    data_keluarga_id: anggota?.data_keluarga_id || anggota?.id,
    hubungan: anggota?.hubungan?.value || anggota?.hubungan,
    nama_keluarga: anggota.nama_keluarga,
    status_hidup:
      typeof anggota?.status_hidup !== "object"
        ? anggota?.status_hidup
        : anggota?.status_hidup?.value,
    pendidikan_terakhir_id:
      anggota?.pendidikan_terakhir?.value || anggota?.pendidikan_terakhir?.id,
    tempat_lahir: anggota?.tempat_lahir,
    tgl_lahir: formatDate(anggota.tgl_lahir, "short2"),
    jenis_kelamin:
      typeof anggota?.jenis_kelamin !== "object"
        ? anggota?.jenis_kelamin
        : anggota?.jenis_kelamin?.value,
    kategori_agama_id:
      anggota.agama?.value ||
      anggota.kategori_agama?.value ||
      anggota.kategori_agama?.id,
    kategori_darah_id:
      anggota.goldar?.value ||
      anggota.kategori_darah?.value ||
      anggota.kategori_darah?.id,
    pekerjaan: anggota.pekerjaan || "",
    no_rm: anggota?.no_rm || "",
    no_hp: anggota?.no_hp || "",
    email: anggota?.email || "",
    is_bpjs: anggota?.is_bpjs ? 1 : 0,
    is_menikah: anggota?.is_menikah ? 1 : 0,
    //! UNUSED
    // status_keluarga_id: anggota?.status_keluarga_id,
    // verifikator_1: anggota?.verifikator_1,
    // alasan: anggota.alasan,
    // created_at: anggota.created_at,
    // updated_at: anggota.updated_at,
  }));

  // console.log("formik.values.keluarga", formik.values.keluarga);
  // console.log("remappedData", remappedData);

  return (
    <>
      <CContainer flex={0} gap={3}>
        <AnimatePresence>
          {formik.values.keluarga &&
            formik.values.keluarga.length > 0 &&
            formik.values.keluarga.map((anggota, i) => {
              // console.log("anggota", anggota);
              const anggota_keluarga_id =
                anggota?.data_keluarga_id || anggota?.id;

              return (
                <motion.div
                  key={anggota_keluarga_id}
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
                    align={"stretch"}
                    borderRadius={8}
                    p={4}
                    bg={"var(--divider)"}
                  >
                    <HStack justify={"space-between"} mr={-1}>
                      <Text fontWeight={600} fontSize={16}>
                        {anggota.nama_keluarga}
                      </Text>
                      ?
                      <HStack>
                        <EditFamily
                          data={anggota}
                          id={`profile-edit-data-keluarga-${anggota_keluarga_id}`}
                          name="keluarga"
                          onConfirm={(inputValue) => {
                            const newKeluarga = [...formik.values.keluarga];

                            newKeluarga[i] = {
                              ...inputValue,
                              id: anggota_keluarga_id,
                              data_keluarga_id: anggota_keluarga_id,
                              // kategori_agama: {
                              //   value: anggota?.agama?.value,
                              //   label: anggota?.agama?.label,
                              // },
                              // kategori_darah: {
                              //   value: anggota?.goldar?.value,
                              //   label: anggota?.goldar?.label,
                              // },
                            };
                            formik.setFieldValue("keluarga", newKeluarga);
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
                                  (_, i) => i !== index,
                                ),
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
                        <Text align={"right"}>
                          {typeof anggota?.hubungan === "string"
                            ? anggota.hubungan
                            : anggota?.hubungan?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Status Hidup</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {typeof anggota?.status_hidup === "number"
                            ? anggota?.status_hidup
                              ? "Aktif"
                              : "Tidak Aktif"
                            : anggota?.status_hidup?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Jenis Kelamin</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {typeof anggota?.jenis_kelamin !== "object"
                            ? anggota?.jenis_kelamin
                              ? "Laki-laki"
                              : "Perempuan"
                            : anggota?.jenis_kelamin?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Tempat Lahir</Text>
                        <FlexLine />
                        <Text align={"right"}>{anggota?.tempat_lahir}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Tanggal Lahir</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {formatDate(anggota?.tgl_lahir)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Pendidikan Terakhir</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {anggota?.pendidikan_terakhir?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Agama</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {anggota?.kategori_agama?.label ||
                            anggota?.agama?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Golongan Darah</Text>
                        <FlexLine />
                        <Text align={"right"}>
                          {anggota?.kategori_darah?.label ||
                            anggota?.goldar?.label}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Pekerjaan</Text>
                        <FlexLine />
                        <Text align={"right"}>{anggota?.pekerjaan}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Nomor Telepon</Text>
                        <FlexLine />
                        <Text align={"right"}>{anggota?.no_hp}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>Email</Text>
                        <FlexLine />
                        <Text align={"right"}>{anggota?.email}</Text>
                      </HStack>
                      <HStack>
                        <Text opacity={0.4}>No. Rekam Medis</Text>
                        <FlexLine />
                        <Text align={"right"}>{anggota?.no_rm}</Text>
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
              );
            })}
        </AnimatePresence>
      </CContainer>

      {/* @ts-ignore */}
      {(!formik.values.keluarga || formik.values.keluarga?.length === 0) && (
        <NoData my={"auto"} minH={"200px"} />
      )}

      <Box mt={"auto"}>
        <form id="LengkapiDataUser2Form" onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={!!formik.errors.keluarga} mt={6}>
            <HStack>
              <AddFamily
                id="lengkapi-data-user-2-tambah-data-keluarga"
                name="keluarga"
                onConfirm={(inputValue) => {
                  setNewItemAdded(true);
                  const newKeluarga = [...formik.values.keluarga];
                  newKeluarga.push({
                    ...inputValue,
                    id: null,
                  });
                  formik.setFieldValue("keluarga", newKeluarga);
                }}
              />

              <RequestPatchDataButton
                validator={() => {
                  formik.validateField("keluarga");
                  formik.resetForm();
                }}
                column="keluarga"
                payload={JSON.stringify(remappedData)}
                url="/api/update-data-keluarga"
                isDisabled={formik.values.keluarga?.length === 0}
              />
            </HStack>
            <FormErrorMessage>
              {formik.errors.keluarga as string}
            </FormErrorMessage>
          </FormControl>
        </form>
      </Box>
    </>
  );
}
