import { Box, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import Retry from "../../../components/dependent/Retry";
import NoData from "../../../components/independent/NoData";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";
import timeSince from "../../../lib/timeSince";
import NotFound from "../../../components/independent/NotFound";

export default function Inbox() {
  useScrollToTop();

  const dummy = [
    {
      id: 1,
      is_read: false,
      kategori: {
        id: 3,
        label: "Permintaan Tukar Jadwal",
        link: "/beranda/tukar-jadwal?tabindex=1",
      },
      sender: {
        // User Interface
        id: 1,
        nama: "Jolitos Kurniawan",
        foto_profil: "/images/gear5.jpg",
      },
      message: "Jolitos Kurniawan ingin tukar jadwal dengan Anda",
      created_at: "2024-07-11",
    },
    {
      id: 2,
      is_read: false,
      kategori: {
        id: 4,
        label: "Lembur",
        link: "/beranda/lembur",
      },
      sender: {
        id: 1,
        nama: "Jolitos Kurniawan",
        foto_profil: "/images/gear5.jpg",
      },
      message: "Kepala ruang mejadwalkan lembur untuk Anda",
      created_at: "2024-07-10",
    },
    {
      id: 3,
      is_read: true,
      kategori: {
        id: 5,
        label: "Event & Diklat",
        link: "/beranda/event-diklat",
      },
      sender: {
        id: 1,
        nama: "Jolitos Kurniawan",
        foto_profil: "/images/gear5.jpg",
      },
      message: "Kepala ruang mejadwalkan lembur untuk Anda",
      created_at: "2024-07-4",
    },
    {
      id: 4,
      is_read: true,
      kategori: {
        id: 5,
        label: "Pengumuman",
        link: "/beranda/pengumuman",
      },
      sender: {
        id: 1,
        nama: "Jolitos Kurniawan",
        foto_profil: "/images/gear5.jpg",
      },
      message: "Ada pengumuman baru, segera dicek ya",
      created_at: "2024-07-4",
    },
    {
      id: 5,
      is_read: true,
      kategori: {
        id: 3,
        label: "Pengajuan Tukar Jadwal",
        link: "/beranda/tukar-jadwal?tabindex=0",
      },
      sender: {
        // User Interface
        id: 1,
        nama: "Jolitos Kurniawan",
        foto_profil: "/images/gear5.jpg",
      },
      message: "Tukar jadwal anda sudah disetujui manajer",
      created_at: "2024-07-1",
    },
  ];

  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummy,
    url: "",
  });

  const fd = data?.filter((item: any) => {
    const searchTerm = search?.toLowerCase();
    return item.kategori.label.toLowerCase().includes(searchTerm as string);
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

  console.log(fd);

  return (
    <CContainer>
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
          <HStack
            w={searchMode ? "0px" : "40px"}
            ml={searchMode ? "-12px" : ""}
          ></HStack>

          {!searchMode && (
            <Text
              textAlign={"center"}
              noOfLines={1}
              fontWeight={600}
              fontSize={[16, null, 18]}
            >
              Inbox
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

      <CContainer bg={contentBgColor} p={5} gap={3}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}
        {!error && (
          <>
            {loading && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} flex={1} mx={"auto"} minH={"106.5px"} />
                ))}
              </>
            )}
            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && (
                  <NoData label="Tidak ada inbox" />
                )}

                {fd && fd.length === 0 && (
                  <NotFound label="Inbox tidak ditemukan" />
                )}

                {(fd || (fd && fd.length > 0)) && (
                  <>
                    {fd.map((inbox: any, i: number) => (
                      <Link key={i} to={inbox.kategori.link}>
                        <CContainer
                          flex={0}
                          p={4}
                          bg={lightDarkColor}
                          borderRadius={12}
                          cursor={"pointer"}
                          className="clicky"
                        >
                          <HStack align={"start"}>
                            <CContainer gap={1}>
                              <Text fontWeight={600}>
                                {inbox.kategori.label}
                              </Text>
                              <Text fontSize={13} noOfLines={1} opacity={0.6}>
                                {inbox.message}
                              </Text>
                              <Text fontSize={12} opacity={0.4} pt={2}>
                                {timeSince(inbox.created_at)}
                              </Text>
                            </CContainer>

                            {!inbox.is_read && (
                              <Box
                                w={"6px"}
                                h={"6px"}
                                borderRadius={"full"}
                                bg={"red.400"}
                              />
                            )}
                          </HStack>
                        </CContainer>
                      </Link>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
