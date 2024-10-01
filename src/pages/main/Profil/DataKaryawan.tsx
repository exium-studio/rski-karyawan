import { Center, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import DetailDataKaryawan from "../../../components/dependent/DetailDataKaryawan";
import SearchComponent from "../../../components/dependent/input/SearchComponent";
import Retry from "../../../components/dependent/Retry";
import BackButton from "../../../components/independent/BackButton";
import ComponentSpinner from "../../../components/independent/ComponentSpinner";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import { iconSize } from "../../../constant/sizes";
import useDataState from "../../../hooks/useDataState";

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
                <CContainer p={5} pb={8} bg={contentBgColor}>
                  <DetailDataKaryawan data={data} searchQuery={searchQuery} />
                </CContainer>
              )}
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
