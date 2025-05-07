import {
  Badge,
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DeleteAnggotaKeluarga from "../../../components/dependent/DeleteAnggotaKeluarga";
import AddFamily from "../../../components/dependent/input/dedicated/AddFamily";
import EditFamily from "../../../components/dependent/input/dedicated/EditFamily";
import FlexLine from "../../../components/independent/FlexLine";
import CContainer from "../../../components/independent/wrapper/CContainer";
import NoData from "../../../components/independent/NoData";
import RequestPatchDataButton from "../../../components/dependent/RequestPatchDataButton";
import formatDate from "../../../lib/formatDate";
import calculateAge from "../../../lib/calculateAge";

interface Props {
  data: any[];
}

export default function UbahDataKeluargaForm({ data }: Props) {
  const [newItemAdded, setNewItemAdded] = useState(false);

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      keluarga: (data as any[]) || [],
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

  // SX

  const remappedData = formik.values.keluarga.map((anggota) => ({
    data_keluarga_id: anggota.id, // Mengubah data_keluarga_id
    hubungan: anggota?.hubungan?.label || anggota.hubungan, // Mengambil label dari hubungan
    pendidikan_terakhir: {
      id:
        anggota?.pendidikan_terakhir?.id || anggota.pendidikan_terakhir?.value, // Mengambil id pendidikan terakhir
      label: anggota?.pendidikan_terakhir?.label || "", // Mengambil label pendidikan terakhir
    },
    nama_keluarga: anggota.nama_keluarga, // Menyalin nama_keluarga
    status_hidup:
      anggota.status_hidup?.value !== undefined
        ? anggota.status_hidup.value
        : anggota.status_hidup,
    tgl_lahir: formatDate(anggota.tgl_lahir, "short2"),
    pekerjaan: anggota.pekerjaan,
    no_hp: anggota.no_hp,
    email: anggota.email,
    status_keluarga_id: anggota.status_keluarga_id,
    is_bpjs: anggota.is_bpjs,
    is_menikah: anggota.is_bpjs,
    verifikator_1: anggota.verifikator_1,
    alasan: anggota.alasan,
    created_at: anggota.created_at,
    updated_at: anggota.updated_at,
  }));

  // console.log(remappedData);

  return (
    <>
      <CContainer flex={0} gap={3}>
        <AnimatePresence>
          {formik.values.keluarga &&
            formik.values.keluarga.length > 0 &&
            formik.values.keluarga.map((anggota, i) => (
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
                  align={"stretch"}
                  borderRadius={8}
                  p={4}
                  bg={"var(--divider)"}
                >
                  <HStack justify={"space-between"} mr={-1}>
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
                          console.log("editted", inputValue);

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
                                (_, i) => i !== index
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
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.hubungan?.label || anggota?.hubungan}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Status Hidup</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.status_hidup ? "Hidup" : "Meniggal"}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Tanggal Lahir</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"200px"}
                      >
                        {anggota?.tgl_lahir
                          ? `${formatDate(anggota?.tgl_lahir)} (${calculateAge(
                              anggota?.tgl_lahir
                            )} Tahun)`
                          : ""}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Pekerjaan</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.pekerjaan}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Pendidikan</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.pendidikan_terakhir?.label}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Nomor Telepon</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.no_hp}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Email</Text>
                      <FlexLine />
                      <Text
                        textAlign={"right"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        maxW={"140px"}
                      >
                        {anggota.email}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Sudah Menukah</Text>
                      <FlexLine />
                      <Badge
                        borderRadius={"full"}
                        colorScheme={anggota.is_menikah ? "green" : "red"}
                      >
                        {anggota.is_menikah ? "Sudah Menikah" : "Belum Menikah"}
                      </Badge>
                    </HStack>
                    <HStack>
                      <Text opacity={0.4}>Tanggungan BPJS</Text>
                      <FlexLine />
                      <Badge
                        borderRadius={"full"}
                        colorScheme={anggota.is_bpjs ? "green" : "red"}
                      >
                        {anggota.is_bpjs ? "Ditanggung" : "Tidak Ditanggung"}
                      </Badge>
                    </HStack>
                  </>
                </VStack>
              </motion.div>
            ))}
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
