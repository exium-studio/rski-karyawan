import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import JenisKaryawanBadge from "../../../components/dependent/JenisKaryawanBadge";
import Retry from "../../../components/dependent/Retry";
import StatusKaryawanBadge from "../../../components/dependent/StatusKaryawanBadge";
import BackButton from "../../../components/independent/BackButton";
import ComponentSpinner from "../../../components/independent/ComponentSpinner";
import FlexLine from "../../../components/independent/FlexLine";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { iconSize, responsiveSpacing } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";
import calculateMasaKerjaFromTanggalMasuk from "../../../lib/calculateMasaKerjaFromTanggalMasuk";
import formatDate from "../../../lib/formatDate";
import formatDurationShort from "../../../lib/formatDurationShort";
import formatNumber from "../../../lib/formatNumber";

export default function DataKaryawan() {
  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-data-karyawan`, // /api/get-data-karyawan-personal
    dependencies: [],
  });

  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const words = search?.split(" ")?.filter((word) => word.length > 0);
    const modifiedWords = words?.reduce((acc: string[], word) => {
      acc.push(word);
      if (word.toLowerCase() === "nomor") {
        acc.push("no.");
      } else if (word.toLowerCase() === "nik") {
        acc.push("no. induk karyawan");
      }
      return acc;
    }, []);
    setSearchQuery(modifiedWords);
  }, [search]);

  return (
    <CContainer flex={1}>
      <HStack
        bg={lightDarkColor}
        h={"56px"}
        pl={5}
        pr={4}
        py={4}
        justify={"space-between"}
        position={"sticky"}
        top={0}
        left={0}
        zIndex={99}
        w={"100%"}
        borderBottom={"1px solid var(--divider2)"}
      >
        <HStack w={"40px"}>
          <BackButton />
        </HStack>

        {!searchMode && (
          <Text
            textAlign={"center"}
            noOfLines={1}
            fontWeight={600}
            fontSize={[16, null, 18]}
          >
            Detail Data Karyawan
          </Text>
        )}

        <HStack
          w={searchMode ? "100%" : "40px"}
          justify={searchMode ? "start" : "end"}
          transition={"200ms"}
        >
          <IconButton
            aria-label="Search Button"
            icon={<Icon as={RiSearchLine} fontSize={iconSize} />}
            borderRadius={"full"}
            size={"sm"}
            className="btn"
            onClick={() => {
              setSearchMode(true);
            }}
            display={!searchMode ? "flex" : "none"}
          />

          <SearchComponent
            name="search"
            inputValue={search}
            onChangeSetter={(inputValue) => {
              setSearch(inputValue || "");
            }}
            inputRef={searchInputRef}
            display={searchMode ? "flex" : "none"}
            minW={"0px !important"}
            size="sm"
          />

          <IconButton
            display={searchMode ? "flex" : "none"}
            transition={"200ms"}
            aria-label="Tombol Kembali"
            icon={<Icon as={RiCloseLine} fontSize={20} />}
            className="btn"
            size={"sm"}
            borderRadius={"full"}
            onClick={() => {
              setSearchMode(false);
              setSearch("");
            }}
          />
        </HStack>
      </HStack>

      {loading && <ComponentSpinner m={"auto"} />}

      {!loading && (
        <>
          {error && (
            <Center m={"auto"}>
              <Retry loading={loading} retry={retry} />
            </Center>
          )}

          {!error && (
            <>
              {data && (
                <CContainer
                  pt={[5, null, null, 0]}
                  flex={1}
                  px={5}
                  pb={8}
                  gap={responsiveSpacing}
                  overflowY={[null, null, null, "auto"]}
                  className="scrollY"
                  bg={contentBgColor}
                >
                  <CContainer
                    flex={1}
                    overflowY={"auto"}
                    className="scrollY"
                    // bg={lightDarkColor}
                    gap={responsiveSpacing}
                  >
                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Utama
                      </Text>

                      <VStack
                        align={"stretch"}
                        w={"100%"}
                        gap={4}
                        minH={"150px"}
                        // bg={"red"}
                      >
                        <HStack justify={"space-between"}>
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Jenis Karyawan"
                            />
                          </Box>
                          <FlexLine />
                          <JenisKaryawanBadge
                            data={data.unit_kerja?.jenis_karyawan}
                          />
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Induk Karyawan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. Induk Karyawan"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.nik}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Gelar Depan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Gelar Depan"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.gelar_depan}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Gelar Depan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Nama"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.user?.nama}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Gelar Depan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Gelar Belakang"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.gelar_belakang}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tempat Lahir</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tempat Lahir"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.tempat_lahir}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tanggal Lahir</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tanggal Lahir"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDate(data.tgl_lahir)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Alamat</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Alamat"
                            />
                          </Box>
                          <FlexLine />

                          <Popover>
                            <PopoverTrigger>
                              <Text
                                fontWeight={500}
                                whiteSpace={"nowrap"}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                maxW={"243px"}
                              >
                                {data.alamat}
                              </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>{data.alamat}</PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Telepon</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. HP"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.no_hp}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>NIK KTP</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="NIK KTP"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {/* {data?.path_nik_ktp && (
                                      <SmallLink to={data?.path_nik_ktp}>
                                        Lihat
                                      </SmallLink>
                                    )} */}

                            {data?.nik_ktp && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.nik_ktp}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. KK</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. KK"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {/* {data?.path_no_kk && (
                                      <SmallLink to={data?.path_no_kk}>
                                        Lihat
                                      </SmallLink>
                                    )} */}

                            {data?.no_kk && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.no_kk}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>NPWP</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="NPWP"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.npwp}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Jenis Kelamin</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Jenis Kelamin"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.jenis_kelamin === 1
                              ? "Laki - laki"
                              : data.jenis_kelamin === 0
                              ? "Perempuan"
                              : ""}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Agama</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Agama"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.agama?.label}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Email</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Email"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.email}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Golongan Darah</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Golongan Darah"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.golongan_darah?.label}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tinggi Badan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tinggi Badan"
                            />
                          </Box>
                          <FlexLine />
                          {data.tinggi_badan && (
                            <Text fontWeight={500} textAlign={"right"}>
                              {data.tinggi_badan} cm
                            </Text>
                          )}
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Berat Badan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Berat Badan"
                            />
                          </Box>
                          <FlexLine />
                          {data?.berat_badan && (
                            <Text fontWeight={500} textAlign={"right"}>
                              {data.berat_badan} kg
                            </Text>
                          )}
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Kode PTKP</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Kode PTKP"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.ptkp?.kode_ptkp}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Ijazah</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Pendidikan Terakhir"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {data.pendidikan_terakhir && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.pendidikan_terakhir?.label}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Ijazah</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Asal Sekolah"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            <Text fontWeight={500} textAlign={"right"}>
                              {data?.asal_sekolah}
                            </Text>
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tahun Lulus</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tahun Lulus"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.tahun_lulus}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Jabatan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Jabatan"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.jabatan?.nama_jabatan}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tanggal Masuk</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tanggal Masuk"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDate(data.tgl_masuk)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tanggal Diangkat</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tanggal Diangkat"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDate(data.tgl_diangkat)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Unit Kerja</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Unit Kerja"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.unit_kerja?.nama_unit}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Status Karyawan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Status Karyawan"
                            />
                          </Box>
                          <FlexLine />
                          <StatusKaryawanBadge data={data.status_karyawan} />
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Kompetensi</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Kompetensi"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.kompetensi?.nama_kompetensi}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Kesehatan
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Rekam Medis</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. Rekam Medis"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.no_rm}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Rekam Medis</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="BMI"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.bmi_value &&
                              data?.bmi_ket &&
                              `${data?.bmi_value} (${data?.bmi_ket})`}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Manulife</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. Manulife"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.no_manulife}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. BPJS Kesehatan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. BPJS Kesehatan"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {data?.no_bpjsksh && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.no_bpjsksh}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. BPJS Ketenagakerjaan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. BPJS Ketenagakerjaan"
                            />
                          </Box>
                          <FlexLine />

                          {data?.no_bpjsktk && (
                            <Text fontWeight={500} textAlign={"right"}>
                              {data?.no_bpjsktk}
                            </Text>
                          )}
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Pekerjaan
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tanggal Keluar</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tanggal Keluar"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDate(data.tgl_keluar)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Masa Kerja</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Masa Kerja"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {calculateMasaKerjaFromTanggalMasuk(data.tgl_masuk)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Jabatan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Role"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.role?.name}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Tanggal Berakhir PKS</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tanggal Berakhir PKS"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDate(data.tgl_berakhir_pks)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Masa Diklat</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Masa Diklat"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {formatDurationShort(data.masa_diklat)}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Pendidikan dan Sertifikat
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Ijazah</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. Ijazah"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {data?.no_ijazah && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.no_ijazah}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. STR</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. STR"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {data?.no_str && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.no_str}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Masa Berlaku STR</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Masa Berlaku STR"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.masa_berlaku_str
                              ? formatDate(data?.masa_berlaku_str)
                              : data?.no_str
                              ? "Seumur Hidup"
                              : ""}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. SIP</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. SIP"
                            />
                          </Box>
                          <FlexLine />
                          <HStack>
                            {data?.no_sip && (
                              <Text fontWeight={500} textAlign={"right"}>
                                {data?.no_sip}
                              </Text>
                            )}
                          </HStack>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Masa Berlaku SIP</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Masa Berlaku SIP"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.masa_berlaku_sip
                              ? formatDate(data?.masa_berlaku_sip)
                              : data?.no_sip
                              ? "Seumur Hidup"
                              : ""}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Keuangan
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Kelompok Gaji</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Kelompok Gaji"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data?.kelompok_gaji?.nama_kelompok}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Gaji</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Gaji"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp{" "}
                            {formatNumber(
                              data.kelompok_gaji?.besaran_gaji || 0
                            )}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>No. Rekening</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="No. Rekening"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            {data.no_rekening}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Uang Makan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Uang Makan"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp {formatNumber(data.uang_makan || 0)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Uang Lembur</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Uang Lembur"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp {formatNumber(data.uang_lembur || 0)}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Tunjangan
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Jabatan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tunjangan Jabatan"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp{" "}
                            {formatNumber(
                              data?.jabatan?.tunjangan_jabatan || 0
                            )}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Jabatan</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tunjangan Kompetensi"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp{" "}
                            {formatNumber(
                              data.kompetensi?.tunjangan_kompetensi || 0
                            )}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Fungsional</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tunjangan Fungsional"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp {formatNumber(data?.tunjangan_fungsional || 0)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Khusus</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tunjangan Khusus"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp {formatNumber(data?.tunjangan_khusus || 0)}
                          </Text>
                        </HStack>

                        <HStack justify={"space-between"}>
                          {/* <Text opacity={0.6}>Lainnya</Text> */}
                          <Box opacity={0.6}>
                            <Highlighter
                              highlightClassName="hw"
                              unhighlightClassName="uw"
                              searchWords={searchQuery}
                              autoEscape={true}
                              textToHighlight="Tunjangan Lainnya"
                            />
                          </Box>
                          <FlexLine />
                          <Text fontWeight={500} textAlign={"right"}>
                            Rp {formatNumber(data?.tunjangan_lainnya || 0)}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack align={"stretch"} gap={0}>
                      <Text fontSize={20} fontWeight={600} mb={4}>
                        Potongan
                      </Text>

                      <VStack align={"stretch"} gap={4}>
                        {data.potongan_gaji?.length === 0 && (
                          <Text opacity={0.4}>Tidak ada potongan gaji</Text>
                        )}

                        {data.potongan_gaji?.map((potongan: any, i: number) => (
                          <HStack justify={"space-between"} key={i}>
                            <Box opacity={0.6}>
                              <Highlighter
                                highlightClassName="hw"
                                unhighlightClassName="uw"
                                searchWords={searchQuery}
                                autoEscape={true}
                                textToHighlight={potongan.nama_premi}
                              />
                            </Box>
                            <FlexLine />
                            <Text fontWeight={500} textAlign={"right"}>
                              {potongan.kategori_potongan_id === 1
                                ? `${formatNumber(
                                    potongan.besaran_premi || 0
                                  )}%`
                                : `Rp ${formatNumber(
                                    potongan.besaran_premi || 0
                                  )}`}
                              {/* Rp{" "}
{formatNumber(potongan.besaran_premi)} */}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </CContainer>
                </CContainer>
              )}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
