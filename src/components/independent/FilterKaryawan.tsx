import {
  Box,
  Button,
  ButtonProps,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEqualizer3Line } from "@remixicon/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useCallBackOnNavigate from "../../hooks/useCallBackOnNavigate";
import backOnClose from "../../lib/backOnClose";
import MultipleSelectStatusKerja from "../dependent/input/dedicated/MultipleSelectStatusKerja";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import MultipleSelectJenisKaryawan from "../dependent/input/dedicated/MultipleSelectJenisKaryawan";

interface Props extends ButtonProps {}

export default function FilterKaryawan({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterKaryawan, setFilterKaryawan, clearFilterKaryawan } =
    useFilterKaryawan();
  useCallBackOnNavigate(clearFilterKaryawan);

  // console.log(filterTukarJadwal);

  // local
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      jenis_karyawan: undefined,
      status_kerja: undefined,
    },
    validationSchema: yup.object().shape({
      jenis_karyawan: yup.array(),
      status_kerja: yup.array(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function filterCount(values: any) {
    let count = 0;
    if (values.jenis_karyawan && values.jenis_karyawan.length > 0) {
      count += values.jenis_karyawan.length;
    }
    if (values.status_kerja && values.status_kerja.length > 0) {
      count += values.status_kerja.length;
    }
    return count;
  }
  function applyFilter() {
    setFilterKaryawan(formik.values);
    backOnClose();
  }
  function resetFilter() {
    formik.resetForm();
  }

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          formik.setFieldValue("jenis_karyawan", filterKaryawan.jenis_karyawan);
          formik.setFieldValue("status_kerja", filterKaryawan.status_kerja);
        }}
        rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
        w={"100%"}
        className="btn-clear"
        justifyContent={"space-between"}
        px={"24px !important"}
      >
        <HStack flex={1}>
          <Text>Filter Karyawan</Text>
          {filterCount(filterKaryawan) && (
            <Center
              ml={"auto"}
              p={1}
              borderRadius={"full"}
              bg={"p.500"}
              color={lightDarkColor}
              w={"16px"}
              h={"16px"}
            >
              <Text fontSize={12}>{filterCount(filterKaryawan)}</Text>
            </Center>
          )}
        </HStack>
      </Button>

      <CustomDrawer
        id="filter-tukar-jadwal-drawer"
        name="filter"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                Filter Karyawan
              </Text>
              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </Box>
        }
        footer={
          <>
            <Button className="btn-solid clicky" onClick={resetFilter}>
              Clear
            </Button>

            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              onClick={applyFilter}
            >
              Terapkan
            </Button>
          </>
        }
      >
        <CContainer px={6}>
          <form id="ajukanCutiForm" onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={!!formik.errors.status_kerja} mb={4}>
              <FormLabel>Status Kerja</FormLabel>
              <MultipleSelectStatusKerja
                id="filter-karyawan-select-status-kerja"
                name="status_kerja"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status_kerja", inputValue);
                }}
                inputValue={formik.values.status_kerja}
                placeholder="Multi Pilih Status Kerja"
                optionsDisplay="chip"
                maxSelectedDisplay={3}
              />
            </FormControl>

            <FormControl isInvalid={!!formik.errors.status_kerja}>
              <FormLabel>Jenis Karyawan</FormLabel>
              <MultipleSelectJenisKaryawan
                id="filter-karyawan-select-jenis-karyawan"
                name="jenis_karyawan"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_karyawan", inputValue);
                }}
                inputValue={formik.values.jenis_karyawan}
                placeholder="Multi Pilih Jenis Karyawan"
                optionsDisplay="chip"
                maxSelectedDisplay={3}
              />
            </FormControl>
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
