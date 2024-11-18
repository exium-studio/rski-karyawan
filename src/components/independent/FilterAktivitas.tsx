import useFilterAktivitas from "../../global/useFilterAktivitas";
import DateRangePickerDrawer from "../dependent/input/DateRangePickerDrawer";

export default function FilterAktivitas() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { filterAktivitas, setFilterAktivitas } = useFilterAktivitas();
  // useCallBackOnNavigate(clearFilterAktivitas);

  // const today = new Date();
  // const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  // const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

  // const defaultRangeTgl = {
  //   from: startOfWeekDate,
  //   to: endOfWeekDate,
  // };

  // local
  // const formik = useFormik({
  //   validateOnChange: false,
  //   initialValues: {
  //     date_range: defaultRangeTgl,
  //     jenis_aktivitas: undefined,
  //   },
  //   validationSchema: yup.object().shape({
  //     date_range: yup.object(),
  //     jenis_aktivitas: yup.array(),
  //   }),
  //   onSubmit: (values, { resetForm }) => {
  //     console.log(values);
  //   },
  // });

  // function filterCount(values: any) {
  //   let count = 0;
  //   if (values.date_range) count++;
  //   if (values.date_range && values.date_range.length > 0) {
  //     count += values.date_range.length;
  //   }
  //   if (values.jenis_aktivitas && values.jenis_aktivitas.length > 0) {
  //     count += values.jenis_aktivitas.length;
  //   }
  //   return count;
  // }
  // function applyFilter() {
  //   setFilterAktivitas(formik.values);
  //   backOnClose();
  // }
  // function resetFilter() {
  //   formik.resetForm();
  // }

  // SX
  // const lightDarkColor = useLightDarkColor();

  return (
    <>
      <DateRangePickerDrawer
        id="jadwal_daterange_picker_drawer"
        name="jadwal_daterange"
        onConfirm={(inputValue) => {
          setFilterAktivitas({ ...filterAktivitas, date_range: inputValue });
        }}
        inputValue={filterAktivitas?.date_range}
        maxRange={7}
        nonNullable
        border={"none"}
        borderRadius={0}
        px={"20px !important"}
        fontWeight={600}
        _focus={{ border: "none" }}
        presetsConfig={["thisWeek", "nextWeek"]}
      />
      {/* <Button
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
      </CustomDrawer> */}
    </>
  );
}
