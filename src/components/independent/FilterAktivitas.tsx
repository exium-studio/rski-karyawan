import {
  Box,
  Button,
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
import useFilterAktivitas from "../../global/useFilterAktivitas";
import useCallBackOnNavigate from "../../hooks/useCallBackOnNavigate";
import backOnClose from "../../lib/backOnClose";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import MultipleSelectJenisAktivitas from "../dependent/input/dedicated/MultipleSelectJenisAktivitas";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

export default function FilterAktivitas() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterAktivitas, setFilterAktivitas, clearFilterAktivitas } =
    useFilterAktivitas();
  useCallBackOnNavigate(clearFilterAktivitas);

  // console.log(filterAktivitas);

  // local
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      date_range: undefined,
      jenis_aktivitas: undefined,
    },
    validationSchema: yup.object().shape({
      date_range: yup.object(),
      jenis_aktivitas: yup.array(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function filterCount(values: any) {
    let count = 0;
    if (values.date_range) count++;
    if (values.date_range && values.date_range.length > 0) {
      count += values.date_range.length;
    }
    if (values.jenis_aktivitas && values.jenis_aktivitas.length > 0) {
      count += values.jenis_aktivitas.length;
    }
    return count;
  }
  function applyFilter() {
    setFilterAktivitas(formik.values);
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
          formik.setFieldValue("date_range", filterAktivitas.date_range);
          formik.setFieldValue(
            "jenis_aktivitas",
            filterAktivitas.jenis_aktivitas
          );
        }}
        rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
        w={"100%"}
        className="btn-clear"
        justifyContent={"space-between"}
        px={"24px !important"}
      >
        <HStack flex={1}>
          <Text>Filter Aktivitas</Text>
          {filterCount(filterAktivitas) && (
            <Center
              ml={"auto"}
              p={1}
              borderRadius={"full"}
              bg={"p.500"}
              color={lightDarkColor}
              w={"16px"}
              h={"16px"}
            >
              <Text fontSize={12}>{filterCount(filterAktivitas)}</Text>
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
              <Text fontSize={16} fontWeight={600}>
                Filter Aktivitas
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
            <FormControl mb={4} isInvalid={!!formik.errors.date_range}>
              <FormLabel>Rentang Tanggal</FormLabel>
              <DateRangePickerDrawer
                id="filter-cuti-date-range-picker-drawer"
                name="date_range"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("date_range", inputValue);
                }}
                inputValue={formik.values.date_range}
              />
            </FormControl>

            <FormControl isInvalid={!!formik.errors.date_range}>
              <FormLabel>Jenis Aktivitas</FormLabel>
              <MultipleSelectJenisAktivitas
                id="filter-aktivitas-select-jenis-aktivitas"
                name="jenis_aktivitas"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_aktivitas", inputValue);
                }}
                inputValue={formik.values.jenis_aktivitas}
                placeholder="Multi Pilih Jenis Aktivitas"
                optionsDisplay="chip"
              />
            </FormControl>
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
