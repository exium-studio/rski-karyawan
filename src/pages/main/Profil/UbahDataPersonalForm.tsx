import {
  Avatar,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowUpCircleLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import DisclosureHeader from "../../../components/dependent/DisclosureHeader";
import DatePickerDrawer from "../../../components/dependent/input/DatePickerDrawer";
import SelectAgama from "../../../components/dependent/input/dedicated/SingleSelectAgama";
import SelectGender from "../../../components/dependent/input/dedicated/SingleSelectGender";
import SelectGoldar from "../../../components/dependent/input/dedicated/SIngleSelectGoldar";
import SingleSelectPendidikan from "../../../components/dependent/input/dedicated/SingleSelectPendidikan";
import FileInputLarge from "../../../components/dependent/input/FileInputLarge";
import StringInput from "../../../components/dependent/input/StringInput";
import Textarea from "../../../components/dependent/input/Textareaold";
import RequestPatchDataButton from "../../../components/dependent/RequestPatchDataButton";
import RequiredForm from "../../../components/form/RequiredForm";
import CContainer from "../../../components/independent/wrapper/CContainer";
import CustomDrawer from "../../../components/independent/wrapper/CustomDrawer";
import { iconSize } from "../../../constant/sizes";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import getUserData from "../../../lib/getUserData";

interface Props {
  data: any;
}

export default function EditDataPersonalForm({ data }: Props) {
  const userData = getUserData();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      foto_profil: data?.user?.foto_profil || undefined,
      tempat_lahir: data?.tempat_lahir,
      tgl_lahir: data?.tanggal_lahir
        ? new Date(formatDate(data?.tanggal_lahir, "iso"))
        : undefined,
      telepon: data?.no_hp,
      jenis_kelamin: data?.jenis_kelamin
        ? {
            value: data.jenis_kelamin,
            label: data.jenis_kelamin === 1 ? "Laki - laki" : "Permpuan",
          }
        : undefined,
      nik_ktp: data?.nik_ktp,
      no_kk: data?.no_kk,
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
      tinggi_badan: data?.tinggi_badan,
      berat_badan: data?.berat_badan,
      alamat: data?.alamat,
      no_ijazah: data?.no_ijasah,
      pendidikan_terakhir: data?.pendidikan_terakhir
        ? {
            value: data?.pendidikan_terakhir?.id,
            label: data?.pendidikan_terakhir?.label,
          }
        : undefined,
      tahun_lulus: data?.tahun_lulus?.toString(),
      gelar_depan: data?.gelar_depan,
      gelar_belakang: data?.gelar_belakang,
      asal_sekolah: data?.asal_sekolah,
      riwayat_penyakit: data?.riwayat_penyakit,
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
      berat_badan: yup.string().required("Harus diisi"),
      alamat: yup.string().required("Harus diisi"),
      no_ijazah: yup.string().required("Harus diisi"),
      pendidikan_terakhir: yup.object().required("Harus diisi"),
      tahun_lulus: yup.string().required("Harus diisi"),
      gelar_depan: yup.string(),
      gelar_belakang: yup.string(),
      asal_sekolah: yup.string(),
      riwayat_penyakit: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  // SX
  // const lightDarkColor = useLightDarkColor();

  const FileInputDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [avatar, setAvatar] = useState<any>(undefined);

    return (
      <>
        <Center
          mx={"auto"}
          my={2}
          cursor={"pointer"}
          position={"relative"}
          w={"fit-content"}
          mr={1}
          // onClick={onOpen}
        >
          <Avatar
            src={formik.values.foto_profil || ""}
            name={data?.user?.nama}
            bg={"gray"}
          />
          {/* <Center
            position={"absolute"}
            borderRadius={"full"}
            w={"28px"}
            h={"28px"}
            bg={"p.500"}
            bottom={0}
            right={0}
          >
            <Icon as={RiCameraLine} color={lightDarkColor} />
          </Center> */}
        </Center>

        <CustomDrawer
          id={"avatarinput"}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          header={<DisclosureHeader title="Avatar" />}
          footer={
            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              onClick={() => {
                backOnClose();
              }}
              leftIcon={<Icon as={RiArrowUpCircleLine} fontSize={iconSize} />}
            >
              Ajukan Perubahan
            </Button>
          }
        >
          <CContainer px={6}>
            <Text opacity={0.4} textAlign={"center"} mb={2}>
              Gunakan foto 1:1
            </Text>

            <FileInputLarge
              name={"avatar"}
              onChangeSetter={(input) => {
                setAvatar(input);
              }}
              inputValue={avatar}
            />
          </CContainer>
        </CustomDrawer>
      </>
    );
  };

  return (
    <form id="updatePersonalDataForm">
      <FormControl mb={4} isInvalid={!!formik.errors.foto_profil}>
        <HStack justify={"space-between"}>
          <HStack>
            <FileInputDrawer />

            <CContainer justify={"center"}>
              <Text fontSize={14} fontWeight={500} mb={"2px"}>
                {userData?.nama}
              </Text>
              <Text fontSize={12} opacity={0.4}>
                {userData?.unit_kerja[0]?.nama_unit}
              </Text>
            </CContainer>
          </HStack>
        </HStack>

        <FormErrorMessage>
          {formik.errors.foto_profil as string}
        </FormErrorMessage>
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
        <FormErrorMessage>
          {formik.errors.tempat_lahir as string}
        </FormErrorMessage>
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
            payload={formatDate(
              formik.values.tgl_lahir as unknown as string,
              "short2"
            )}
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
              column="no_hp"
              payload={formik.values.telepon}
            />
          </HStack>
        </InputGroup>
        <FormErrorMessage>{formik.errors.telepon as string}</FormErrorMessage>
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
              formik.setFieldValue("jenis_kelamin", inputValue);
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

      <FormControl mb={4} isInvalid={!!formik.errors.nik_ktp}>
        <FormLabel>
          Nomor Induk Kependudukan
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
        <FormErrorMessage>{formik.errors.nik_ktp as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.no_kk}>
        <FormLabel>
          Nomor Kartu Keluarga
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="no_kk"
            placeholder="3301************"
            onChangeSetter={(input) => {
              formik.setFieldValue("no_kk", input);
            }}
            inputValue={formik.values.no_kk}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("no_kk");
            }}
            column="no_kk"
            payload={formik.values.no_kk}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.no_kk as string}</FormErrorMessage>
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

      <FormControl mb={4} isInvalid={!!formik.errors.berat_badan}>
        <FormLabel>
          Berat Badan
          <RequiredForm />
        </FormLabel>
        <InputGroup>
          <InputRightElement mr={"52px"}>
            <Text>kg</Text>
          </InputRightElement>
          <HStack w={"100%"}>
            <Input
              pr={12}
              name="berat_badan"
              onChange={(e) => {
                formik.setFieldValue(
                  "berat_badan",
                  parseNumber(e.target.value)
                );
              }}
              value={
                formik.values.berat_badan === 0
                  ? ""
                  : formatNumber(formik.values.berat_badan)
              }
              placeholder="65"
            />
            <RequestPatchDataButton
              validator={() => {
                formik.validateField("berat_badan");
              }}
              column="berat_badan"
              payload={formik.values.berat_badan}
            />
          </HStack>
        </InputGroup>
        <FormErrorMessage>
          {formik.errors.tinggi_badan as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!formik.errors.riwayat_penyakit}>
        <FormLabel>
          Riwayat Penyakit
          <RequiredForm />
        </FormLabel>
        <HStack align={"start"}>
          <Textarea
            formik={formik}
            name="riwayat_penyakit"
            placeholder="Masukkan riwayat penyakit"
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("riwayat_penyakit");
            }}
            column="riwayat_penyakit"
            payload={formik.values.riwayat_penyakit}
          />
        </HStack>
        <FormErrorMessage>{formik.errors.alamat as string}</FormErrorMessage>
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
        <FormErrorMessage>{formik.errors.alamat as string}</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}
        isInvalid={formik.errors.pendidikan_terakhir ? true : false}
      >
        <FormLabel>
          Pendidikan Terakhir
          <RequiredForm />
        </FormLabel>
        <HStack>
          {/* <StringInput
            name="pendidikan_terakhir"
            placeholder="S1 Akuntansi"
            onChangeSetter={(input) => {
              formik.setFieldValue("pendidikan_terakhir", input);
            }}
            inputValue={formik.values.pendidikan_terakhir}
          /> */}
          <SingleSelectPendidikan
            id="lengkapi-step-1"
            name="pendidikan_terakhir"
            placeholder="Sarjana 1"
            onConfirm={(input) => {
              formik.setFieldValue("pendidikan_terakhir", input);
            }}
            inputValue={formik.values.pendidikan_terakhir}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("pendidikan_terakhir");
            }}
            column="pendidikan_terakhir"
            payload={formik.values.pendidikan_terakhir?.value}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.pendidikan_terakhir as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.asal_sekolah ? true : false}>
        <FormLabel>
          Asal Sekolah
          <RequiredForm />
        </FormLabel>
        <HStack>
          <StringInput
            name="asal_sekolah"
            placeholder="Universitas"
            onChangeSetter={(input) => {
              formik.setFieldValue("asal_sekolah", input);
            }}
            inputValue={formik.values.asal_sekolah}
          />
          {/* <SingleSelectPendidikan
            id="lengkapi-step-1"
            name="asal_sekolah"
            placeholder="Sarjana 1"
            onConfirm={(input) => {
              formik.setFieldValue("asal_sekolah", input);
            }}
            inputValue={formik.values.asal_sekolah}
          /> */}
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("asal_sekolah");
            }}
            column="asal_sekolah"
            payload={formik.values.asal_sekolah}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.asal_sekolah as string}
        </FormErrorMessage>
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
        <FormErrorMessage>{formik.errors.no_ijazah as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.tahun_lulus ? true : false}>
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
        <FormErrorMessage>
          {formik.errors.tahun_lulus as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.gelar_depan ? true : false}>
        <FormLabel>
          Gelar Depan
          {/* <RequiredForm /> */}
        </FormLabel>
        <HStack>
          <StringInput
            name="gelar_depan"
            placeholder="dr."
            onChangeSetter={(input) => {
              formik.setFieldValue("gelar_depan", input);
            }}
            inputValue={formik.values.gelar_depan}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("gelar_depan");
            }}
            column="gelar_depan"
            payload={formik.values.gelar_depan}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.gelar_depan as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.gelar_belakang ? true : false}>
        <FormLabel>
          Gelar Belakang
          {/* <RequiredForm /> */}
        </FormLabel>
        <HStack>
          <StringInput
            name="gelar_belakang"
            placeholder="S. Kom"
            onChangeSetter={(input) => {
              formik.setFieldValue("gelar_belakang", input);
            }}
            inputValue={formik.values.gelar_belakang}
          />
          <RequestPatchDataButton
            validator={() => {
              formik.validateField("gelar_belakang");
            }}
            column="gelar_belakang"
            payload={formik.values.gelar_belakang}
          />
        </HStack>
        <FormErrorMessage>
          {formik.errors.gelar_belakang as string}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}
