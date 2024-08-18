import { Box, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Retry from "../../../components/dependent/Retry";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { dummyKaryawans } from "../../../constant/dummy";
import { Interface__Karyawan } from "../../../constant/interfaces";
import useDataState from "../../../hooks/useDataState";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { iconSize } from "../../../constant/sizes";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import KaryawanItem from "../../../components/dependent/KaryawanItem";
import BackButton from "../../../components/independent/BackButton";
import { Link } from "react-router-dom";

export default function Feedback() {
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");

  const { error, loading, data, retry } = useDataState<Interface__Karyawan[]>({
    initialData: dummyKaryawans,
    url: "",
  });

  const fd = data?.filter((item) => {
    const searchTerm = search?.toLowerCase();
    return item.user.nama.toLowerCase().includes(searchTerm as string);
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
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

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
              Feedback
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

      <CContainer p={5} pb={8} gap={3} bg={contentBgColor}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} h={"80px"} />
              ))}

            {(!data || (data && data.length === 0)) && <NoData />}

            {fd && fd.length === 0 && <NotFound />}

            {fd && fd.length > 0 && (
              <>
                {fd.map((karyawan, i) => (
                  <Box
                    key={i}
                    as={Link}
                    to={`/beranda/feedback/${karyawan.id}`}
                  >
                    <KaryawanItem
                      key={i}
                      data={karyawan}
                      bg={lightDarkColor}
                      noStatus
                    />
                  </Box>
                ))}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
