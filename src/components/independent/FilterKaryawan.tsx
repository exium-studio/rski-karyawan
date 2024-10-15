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
import MultipleSelectStatusKaryawan from "../dependent/input/dedicated/MultipleSelectStatusKaryawan";
import BackOnCloseButton from "./BackOnCloseButton";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

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
      status: undefined,
      // jenis_karyawan: undefined,
    },
    validationSchema: yup.object().shape({
      status: yup.array(),
      // jenis_karyawan: yup.array(),
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
    if (values.status && values.status.length > 0) {
      count += values.status.length;
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
          formik.setFieldValue("status", filterKaryawan.status);
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
              <Text fontSize={16} fontWeight={600}>
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
            <FormControl isInvalid={!!formik.errors.status}>
              <FormLabel>Status Karyawan</FormLabel>
              <MultipleSelectStatusKaryawan
                id="filter-karyawan-select-status-kerja"
                name="status"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("status", inputValue);
                }}
                inputValue={formik.values.status}
                placeholder="Filter Status Karyawan"
                optionsDisplay="chip"
                maxSelectedDisplay={3}
              />
            </FormControl>

            {/* <FormControl isInvalid={!!formik.errors.status}>
              <FormLabel>Jenis Karyawan</FormLabel>
              <MultipleSelectJenisKaryawan
                id="filter-karyawan-select-jenis-karyawan"
                name="jenis_karyawan"
                onConfirm={(inputValue) => {
                  formik.setFieldValue("jenis_karyawan", inputValue);
                }}
                inputValue={formik.values.jenis_karyawan}
                placeholder="Filter Jenis Karyawan"
                optionsDisplay="chip"
                maxSelectedDisplay={3}
              />
            </FormControl> */}
          </form>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
