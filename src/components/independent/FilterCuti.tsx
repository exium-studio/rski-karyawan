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
import useFilterCuti from "../../global/useFilterCuti";
import useCallBackOnNavigate from "../../hooks/useCallBackOnNavigate";
import backOnClose from "../../lib/backOnClose";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";
import MultipleSelectStatusCuti from "../dependent/input/dedicated/MultipleSelectStatusCuti";
import SingleSelectJenisCuti from "../dependent/input/dedicated/SingleSelectJenisCuti";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

export default function FilterCuti() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterCuti, setFilterCuti, clearFilterCuti } = useFilterCuti();
  useCallBackOnNavigate(clearFilterCuti);

  // local
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      date_range: undefined,
      jenis_cuti: undefined,
      status_cuti: undefined,
    },
    validationSchema: yup.object().shape({
      date_range: yup.object(),
      jenis_cuti: yup.array(),
      status_cuti: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function filterCount(values: any) {
    let count = 0;
    if (values.date_range) count++;
    if (values.status_cuti && values.status_cuti.length > 0) {
      count += values.status_cuti.length;
    }
    if (values.jenis_cuti && values.jenis_cuti.length > 0) {
      count += values.jenis_cuti.length;
    }
    return count;
  }
  function applyFilter() {
    setFilterCuti(formik.values);
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
          formik.setFieldValue("date_range", filterCuti.date_range);
          formik.setFieldValue("jenis_cuti", filterCuti.jenis_cuti);
          formik.setFieldValue("status_cuti", filterCuti.status_cuti);
        }}
        rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
        w={"100%"}
        className="btn-clear"
        justifyContent={"space-between"}
        px={"24px !important"}
      >
        <HStack flex={1}>
          <Text>Filter Cuti</Text>
          {filterCount(filterCuti) && (
            <Center
              ml={"auto"}
              p={1}
              borderRadius={"full"}
              bg={"p.500"}
              color={lightDarkColor}
              w={"16px"}
              h={"16px"}
            >
              <Text fontSize={12}>{filterCount(filterCuti)}</Text>
            </Center>
          )}
        </HStack>
      </Button>

      <CustomDrawer
        id="filter-cuti-drawer"
        name="filter"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={
          <Box pt={"18px"} pr={5} pb={5} pl={6}>
            <HStack justify={"space-between"}>
              <Text fontSize={16} fontWeight={600}>
                Filter Cuti
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

            <FormControl mb={4} isInvalid={!!formik.errors.jenis_cuti}>
              <FormLabel>Jenis Cuti</FormLabel>
              <SingleSelectJenisCuti
                id="ajukan-cuti-select-jenis-cuti"
                name="jenis_cuti"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_cuti", inputValue);
                }}
                inputValue={formik.values.jenis_cuti}
                placeholder="Pilih Jenis Cuti"
              />
            </FormControl>

            <FormControl isInvalid={!!formik.errors.date_range}>
              <FormLabel>Status Cuti</FormLabel>
              <MultipleSelectStatusCuti
                id="filter-cuti-select-status-cuti"
                name="status_cuti"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status_cuti", inputValue);
                }}
                inputValue={formik.values.status_cuti}
                placeholder="Multi Pilih Status Cuti"
                optionsDisplay="chip"
              />
            </FormControl>
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
