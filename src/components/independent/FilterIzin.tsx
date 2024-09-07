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
import MultiSelectStatusVerifikasi2 from "../dependent/input/dedicated/MultiSelectStatusVerifikasi2";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";
import StringInput from "../dependent/input/StringInput";

export default function FilterIzin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterCuti, setFilterCuti, clearFilterCuti } = useFilterCuti();
  useCallBackOnNavigate(clearFilterCuti);

  // local
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tahun: "",
      status_izin: undefined,
    },
    validationSchema: yup.object().shape({
      tahun: yup.string(),
      status_izin: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  function filterCount(values: any) {
    let count = 0;
    if (values.tahun) count++;
    if (values.status_izin && values.status_izin.length > 0) {
      count += values.status_izin.length;
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
          formik.setFieldValue("status_izin", filterCuti.status_izin);
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
                Filter Izin
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
            <FormControl mb={4} isInvalid={!!formik.errors.tahun}>
              <FormLabel>Tahun</FormLabel>
              <StringInput
                name="tahun"
                onChangeSetter={(input) => {
                  formik.setFieldValue("tahun", input);
                }}
                inputValue={formik.values.tahun}
                placeholder="2024"
              />
            </FormControl>

            <FormControl isInvalid={!!formik.errors.tahun}>
              <FormLabel>Status Verifikasi</FormLabel>
              <MultiSelectStatusVerifikasi2
                id="filter-cuti-select-status-cuti"
                name="status_izin"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status_izin", inputValue);
                }}
                inputValue={formik.values.status_izin}
                placeholder="Filter Status Verifikasi"
                optionsDisplay="chip"
              />
            </FormControl>
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
