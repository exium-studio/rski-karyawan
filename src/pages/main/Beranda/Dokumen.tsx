import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  RiCloseLine,
  RiSearchLine,
  RiVerifiedBadgeFill,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import DokumenFileItem from "../../../components/dependent/DokumenFileItem";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import Retry from "../../../components/dependent/Retry";
import BackButton from "../../../components/independent/BackButton";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import Skeleton from "../../../components/independent/Skeleton";
import TambahDokumen from "../../../components/independent/TambahDokumen";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";

export default function Dokumen() {
  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-all-berkas-karyawan`,
    dependencies: [],
  });
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");
  const fd = data?.filter((item: any) => {
    const searchTerm = search?.toLowerCase();
    return (
      item?.label?.toLowerCase().includes(searchTerm as string) &&
      item?.status_berkas?.id !== 3
    );
  });
  const rejected = data?.filter((item: any) => {
    return item?.status_berkas?.id === 3;
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchMode) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 200);
    }
  }, [searchInputRef, searchMode]);

  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer flex={1}>
      <Box
        position={"sticky"}
        top={"0"}
        bg={lightDarkColor}
        borderBottom={"1px solid var(--divider2) !important"}
        zIndex={2}
      >
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
              Dokumen
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
                setSearch(inputValue);
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
      </Box>

      <CContainer flex={1} bg={contentBgColor} p={5} pb={"calc(92px)"}>
        {error && (
          <>
            {notFound && <NoData minH={"132px"} label="Tidak ada dokumen" />}

            {!notFound && (
              <Center my={"auto"} minH={"300px"}>
                <Retry loading={loading} retry={retry} />
              </Center>
            )}
          </>
        )}

        {!error && (
          <>
            {loading && (
              <SimpleGrid columns={2} gap={3}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} flex={1} h={"145.5px"} mx={"auto"} />
                ))}
              </SimpleGrid>
            )}

            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && <NoData />}

                {fd && fd.length === 0 && <NotFound />}

                {(fd || (fd && fd.length) > 0) && (
                  <>
                    <SimpleGrid columns={2} gap={3}>
                      {fd.map((dokumen: any, i: number) => (
                        <DokumenFileItem key={i} data={dokumen} />
                      ))}
                    </SimpleGrid>

                    <CContainer mt={8} gap={5}>
                      <Text fontWeight={600}>Berkas yang ditolak</Text>
                      <SimpleGrid columns={2} gap={3}>
                        {rejected.map((dokumen: any, i: number) => (
                          <DokumenFileItem key={i} data={dokumen} />
                        ))}
                      </SimpleGrid>
                    </CContainer>

                    <Box mt={5}>
                      <Text fontWeight={500} mb={2} opacity={0.6}>
                        Status Berkas
                      </Text>

                      <CContainer gap={2}>
                        <HStack>
                          <Icon
                            as={RiVerifiedBadgeFill}
                            color={"yellow.400"}
                            fontSize={iconSize}
                          />
                          <Text opacity={0.6}>Menunggu Verifikasi</Text>
                        </HStack>

                        <HStack>
                          <Icon
                            as={RiVerifiedBadgeFill}
                            color={"red.400"}
                            fontSize={iconSize}
                          />
                          <Text opacity={0.6}>Verifikasi ditolak</Text>
                        </HStack>

                        <HStack>
                          <Icon
                            as={RiVerifiedBadgeFill}
                            color={"green.400"}
                            fontSize={iconSize}
                          />
                          <Text opacity={0.6}>Verifikasi disetujui</Text>
                        </HStack>
                      </CContainer>
                    </Box>
                  </>
                )}
              </>
            )}
          </>
        )}

        <TambahDokumen />
      </CContainer>
    </CContainer>
  );
}
