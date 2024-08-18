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
import useFilterTukarJadwal from "../../global/useFilterTukarJadwal";
import backOnClose from "../../lib/backOnClose";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import MultipleSelectJenisTukarJadwal from "../dependent/input/dedicated/MultipleSelectJenisTukarJadwal";
import MultipleSelectStatusTukarJadwal from "../dependent/input/dedicated/MultipleSelectStatusTukarJadwal";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import useCallBackOnNavigate from "../../hooks/useCallBackOnNavigate";

interface Props extends ButtonProps {}

export default function FilterTukarJadwal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterTukarJadwal, setFilterTukarJadwal, clearFilterTukarJadwal } =
    useFilterTukarJadwal();
  useCallBackOnNavigate(clearFilterTukarJadwal);

  // console.log(filterTukarJadwal);

  // local
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      date_range: undefined,
      jenis_penukaran: undefined,
      status_penukaran: undefined,
    },
    validationSchema: yup.object().shape({
      date_range: yup.object(),
      jenis_penukaran: yup.array(),
      status_penukaran: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function filterCount(values: any) {
    let count = 0;
    if (values.date_range) count++;
    if (values.status_penukaran && values.status_penukaran.length > 0) {
      count += values.status_penukaran.length;
    }
    if (values.jenis_penukaran && values.jenis_penukaran.length > 0) {
      count += values.jenis_penukaran.length;
    }
    return count;
  }
  function applyFilter() {
    setFilterTukarJadwal(formik.values);
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
          formik.setFieldValue("date_range", filterTukarJadwal.date_range);
          formik.setFieldValue(
            "jenis_penukaran",
            filterTukarJadwal.jenis_penukaran
          );
          formik.setFieldValue(
            "status_penukaran",
            filterTukarJadwal.status_penukaran
          );
        }}
        rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
        w={"100%"}
        className="btn-clear"
        justifyContent={"space-between"}
        px={"24px !important"}
        {...props}
      >
        <HStack flex={1}>
          <Text>Filter Tukar Jadwal</Text>
          {filterCount(filterTukarJadwal) && (
            <Center
              ml={"auto"}
              p={1}
              borderRadius={"full"}
              bg={"p.500"}
              color={lightDarkColor}
              w={"16px"}
              h={"16px"}
            >
              <Text fontSize={12}>{filterCount(filterTukarJadwal)}</Text>
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
                Filter Tukar Jadwal
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

            <FormControl mb={4} isInvalid={!!formik.errors.date_range}>
              <FormLabel>Jenis Penukaran</FormLabel>
              <MultipleSelectJenisTukarJadwal
                id="filter-tukar-jadwal-select-jenis-penukaran"
                name="jenis_penukaran"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_penukaran", inputValue);
                }}
                inputValue={formik.values.jenis_penukaran}
                placeholder="Multi Pilih Jenis Penukaran"
                optionsDisplay="chip"
              />
            </FormControl>

            <FormControl isInvalid={!!formik.errors.date_range}>
              <FormLabel>Status Penukaran</FormLabel>
              <MultipleSelectStatusTukarJadwal
                id="filter-tukar-jadwal-select-status-penukaran"
                name="status_penukaran"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status_penukaran", inputValue);
                }}
                inputValue={formik.values.status_penukaran}
                placeholder="Multi Pilih Status Penukaran"
                optionsDisplay="chip"
              />
            </FormControl>
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
