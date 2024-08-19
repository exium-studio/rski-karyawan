import {
  Avatar,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { RiCameraLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePickerDrawer from "../../../components/dependent/input/DatePickerDrawer";
import SelectAgama from "../../../components/dependent/input/dedicated/SingleSelectAgama";
import SelectGender from "../../../components/dependent/input/dedicated/SingleSelectGender";
import SelectGoldar from "../../../components/dependent/input/dedicated/SIngleSelectGoldar";
import StringInput from "../../../components/dependent/input/StringInput";
import Textarea from "../../../components/dependent/input/Textareaold";
import RequestPatchDataButton from "../../../components/dependent/RequestPatchDataButton";
import RequiredForm from "../../../components/form/RequiredForm";
import { useLightDarkColor } from "../../../constant/colors";
import { Interface__DetailKaryawan } from "../../../constant/interfaces";
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import CContainer from "../../../components/independent/wrapper/CContainer";

interface Props {
  data: Interface__DetailKaryawan;
}

export default function EditDataPersonalForm({ data }: Props) {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      foto_profil: data?.user?.foto_profil || undefined,
      tempat_lahir: data?.tempat_lahir || undefined,
      tgl_lahir: data?.tgl_lahir || undefined,
      telepon: data?.no_hp,
      jenis_kelamin: data?.jenis_kelamin
        ? {
            value: data.jenis_kelamin.id,
            label: data.jenis_kelamin.label,
          }
        : undefined,
      nik: data?.nik || undefined,
      nik_ktp: data?.no_kk || undefined,
      agama: data?.agama
        ? {
            value: data.agama.id,
            label: data.agama.label,
          }
        : undefined,
      golongan_darah: data?.golongan_darah
        ? {
            value: data.golongan_darah.id,
            label: data.golongan_darah.label,
          }
        : undefined,
      tinggi_badan: data?.tinggi_badan || undefined,
      alamat: data?.alamat || undefined,
      no_ijazah: data?.no_ijazah || undefined,
      tahun_lulus: data?.tahun_lulus.toString() || "",
    },
    validationSchema: yup.object().shape({
      foto_profil: yup.mixed().required("Harus diisi"),
      tempat_lahir: yup.string().required("Harus diisi"),
      tgl_lahir: yup.date().required("Harus diisi"),
      telepon: yup.string().required("Harus diisi"),
      jenis_kelamin: yup.object().required("Harus diisi"),
      nik: yup.string().required("Harus diisi"),
      nik_ktp: yup.string().required("Harus diisi"),
      agama: yup.object().required("Harus diisi"),
      golongan_darah: yup.object().required("Harus diisi"),
      tinggi_badan: yup.string().required("Harus diisi"),
      alamat: yup.string().required("Harus diisi"),
      no_ijazah: yup.string().required("Harus diisi"),
      tahun_lulus: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // TODO hit api simpan profil
    },
  });

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <form id="updatePersonalDataForm">
      <FormControl mb={4} isInvalid={!!formik.errors.foto_profil}>
        <HStack justify={"space-between"}>
          <HStack>
            <Center
              mx={"auto"}
              my={2}
              className="clicky"
              cursor={"pointer"}
              position={"relative"}
              w={"fit-content"}
              mr={1}
            >
              <Avatar
                size={"lg"}
                src={data?.user?.foto_profil || ""}
                name={data?.user?.nama}
                bg={"gray"}
              />
              <Center
                position={"absolute"}
                borderRadius={"full"}
                w={"28px"}
                h={"28px"}
                bg={"p.500"}
                bottom={0}
                right={0}
              >
                <Icon as={RiCameraLine} color={lightDarkColor} />
              </Center>
            </Center>

            <CContainer justify={"center"}>
              <Text fontSize={14} fontWeight={500} mb={"2px"}>
                {data?.user?.nama}
              </Text>
              <Text fontSize={12} opacity={0.4}>
                {data?.unit_kerja?.nama_unit}
              </Text>
            </CContainer>
          </HStack>

          <RequestPatchDataButton
            validator={() => {
              formik.validateField("foto_profil");
            }}
            column="foto_profil"
            payload={formik.values.foto_profil}
          />
        </HStack>

        <FormErrorMessage>{formik.errors.foto_profil}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.tempat_lahir}>
        <FormLabel>
          Tempat Lahir
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="tempat_lahir"
            placeholder="Semarang"
            onChangeSetter={(input) => {
              formik.setFieldValue("tempat_lahir", input);
            }}
            inputValue={formik.values.tempat_lahir}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("tempat_lahir");
            }}
            column="tempat_lahir"
            payload={formik.values.tempat_lahir}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.tempat_lahir}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.tgl_lahir}>
        <FormLabel>
          Tanggal Lahir
          <RequiredForm />
        </FormLabel>
        <HStack>
          <DatePickerDrawer
            id="lengkapi-data-user-1-select-tgl_lahir"
            name={"tgl_lahir"}
            onConfirm={(inputValue) => {
              formik.setFieldValue("tgl_lahir", inputValue);
            }}
            inputValue={
              formik.values.tgl_lahir
                ? new Date(formik.values.tgl_lahir)
                : undefined
            }
            isError={!!formik.errors.tgl_lahir}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("tgl_lahir");
            }}
            column="tgl_lahir"
            payload={formik.values.tgl_lahir}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.tgl_lahir as string}</FormErrorMessage>
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
          <HStack w={"100%"}>
            <StringInput
              pl={12}
              name="telepon"
              placeholder="8***********"
              onChangeSetter={(input) => {
                formik.setFieldValue("telepon", input);
              }}
              inputValue={formik.values.telepon}
            />
            <RequestPatchDataButton
              validator={() => {
                formik.validateField("telepon");
              }}
              column="telepon"
              payload={formik.values.telepon}
            />
          </HStack>
        </InputGroup>
        <FormErrorMessage>{formik.errors.telepon}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.jenis_kelamin}>
        <FormLabel>
          Jenis Kelamin
          <RequiredForm />
        </FormLabel>
        <HStack>
          <SelectGender
            id="lengkapi-data-user-1-select-gender"
            name="kelamin"
            onConfirm={(inputValue) => {
              formik.setFieldValue("kelamin", inputValue);
            }}
            inputValue={formik.values.jenis_kelamin}
            isError={!!formik.errors.jenis_kelamin}
            placeholder="Pilih Jenis Kelamin"
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("jenis_kelamin");
            }}
            column="jenis_kelamin"
            payload={formik.values.jenis_kelamin}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.jenis_kelamin as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.nik}>
        <FormLabel>
          Nomor Induk Kependudukan
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="nik"
            placeholder="3301************"
            onChangeSetter={(input) => {
              formik.setFieldValue("nik", input);
            }}
            inputValue={formik.values.nik}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("nik");
            }}
            column="nik"
            payload={formik.values.nik}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.nik}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.nik_ktp}>
        <FormLabel>
          Nomor Kartu Keluarga
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="nik_ktp"
            placeholder="3301************"
            onChangeSetter={(input) => {
              formik.setFieldValue("nik_ktp", input);
            }}
            inputValue={formik.values.nik_ktp}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("nik_ktp");
            }}
            column="nik_ktp"
            payload={formik.values.nik_ktp}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.nik_ktp}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.agama}>
        <FormLabel>
          Agama
          <RequiredForm />
        </FormLabel>
        <HStack>
          <SelectAgama
            id="lengkapi-data-user-1-select-agama"
            name="agama"
            onConfirm={(inputValue) => {
              formik.setFieldValue("agama", inputValue);
            }}
            inputValue={formik.values.agama}
            placeholder="Pilih Agama"
            isError={!!formik.errors.agama}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("agama");
            }}
            column="agama"
            payload={formik.values.agama}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.agama as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.golongan_darah}>
        <FormLabel>
          Golongan Darah
          <RequiredForm />
        </FormLabel>
        <HStack>
          <SelectGoldar
            id="lengkapi-data-user-1-select"
            name="golongan_darah"
            onConfirm={(inputValue) => {
              formik.setFieldValue("golongan_darah", inputValue);
            }}
            inputValue={formik.values.golongan_darah}
            placeholder="Pilih Golongan Darah"
            isError={!!formik.errors.golongan_darah}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("golongan_darah");
            }}
            column="golongan_darah"
            payload={formik.values.golongan_darah}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.golongan_darah as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.tinggi_badan}>
        <FormLabel>
          Tinggi Badan
          <RequiredForm />
        </FormLabel>
        <InputGroup>
          <InputRightElement mr={"52px"}>
            <Text>cm</Text>
          </InputRightElement>
          <HStack w={"100%"}>
            <Input
              pr={12}
              name="tinggi_badan"
              onChange={(e) => {
                formik.setFieldValue(
                  "tinggi_badan",
                  parseNumber(e.target.value)
                );
              }}
              value={
                formik.values.tinggi_badan === 0
                  ? ""
                  : formatNumber(formik.values.tinggi_badan)
              }
              placeholder="179"
            />
            <RequestPatchDataButton
              validator={() => {
                formik.validateField("tinggi_badan");
              }}
              column="tinggi_badan"
              payload={formik.values.tinggi_badan}
            />
          </HStack>
        </InputGroup>
        <FormErrorMessage>
          {formik.errors.tinggi_badan as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.alamat}>
        <FormLabel>
          Alamat
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <Textarea
            formik={formik}
            name="alamat"
            placeholder="Jalan Soekarno Hatta no.123"
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("alamat");
            }}
            column="alamat"
            payload={formik.values.alamat}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.alamat}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.no_ijazah}>
        <FormLabel>
          Nomor Ijazah Terakhir
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="no_ijazah"
            placeholder="1101************"
            onChangeSetter={(input) => {
              formik.setFieldValue("no_ijazah", input);
            }}
            inputValue={formik.values.no_ijazah}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("no_ijazah");
            }}
            column="no_ijazah"
            payload={formik.values.no_ijazah}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.no_ijazah}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.tahun_lulus ? true : false}>
        <FormLabel>
          Tahun Lulus Ijazah Terakhir
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="tahun_lulus"
            placeholder="2024"
            onChangeSetter={(input) => {
              formik.setFieldValue("tahun_lulus", input);
            }}
            inputValue={formik.values.tahun_lulus}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("tahun_lulus");
            }}
            column="tahun_lulus"
            payload={formik.values.tahun_lulus}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.tahun_lulus}</FormErrorMessage>
      </FormControl>
    </form>
  );
}
