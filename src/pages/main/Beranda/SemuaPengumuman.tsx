import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import PengumumanItem from "../../../components/dependent/PengumumanItem";
import Retry from "../../../components/dependent/Retry";
import BackButton from "../../../components/independent/BackButton";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { dummyPengumuman } from "../../../constant/dummy";
import { iconSize } from "../../../constant/sizes";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";
import backOnClose from "../../../lib/backOnClose";

export default function SemuaPengumuman() {
  useScrollToTop();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("semua-pengumuman-modal", isOpen, onOpen, onClose);

  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: dummyPengumuman,
    url: "/api/latest-penngumuman",
  });

  const fd = data?.filter((item: any) => {
    const searchTerm = search?.toLowerCase();
    return item.judul.toLowerCase().includes(searchTerm as string);
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
    <>
      <Text
        color={"p.500"}
        fontWeight={500}
        fontSize={"12px !important"}
        onClick={onOpen}
        cursor={"pointer"}
      >
        Semua Pengumuman
      </Text>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        size={"full"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent m={0} overflowX={"clip"}>
          <ModalHeader>
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
                <HStack>
                  <BackButton />
                </HStack>

                {!searchMode && (
                  <Text
                    textAlign={"center"}
                    noOfLines={1}
                    fontWeight={600}
                    fontSize={[16, null, 18]}
                  >
                    Pengumuman
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
          </ModalHeader>
          <ModalBody p={0}>
            <CContainer flex={1}>
              <CContainer bg={contentBgColor} p={5} pb={8} gap={3} flex={1}>
                {error && (
                  <>
                    {notFound && (
                      <NoData minH={"132px"} label="Tidak ada pengumuman" />
                    )}

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
                      <>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <Skeleton
                            key={i}
                            flex={1}
                            mx={"auto"}
                            minH={"106.5px"}
                          />
                        ))}
                      </>
                    )}
                    {!loading && (
                      <>
                        {(!data || (data && data.length === 0)) && (
                          <NoData label="Tidak ada pengumuman" />
                        )}
                        {fd && fd.length === 0 && (
                          <NotFound label="Pengumuman tidak ditemukan" />
                        )}
                        {fd && fd.length > 0 && (
                          <>
                            {fd.map((pengumuman: any, i: number) => (
                              <PengumumanItem
                                key={i}
                                data={pengumuman}
                                flex={0}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </CContainer>
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
