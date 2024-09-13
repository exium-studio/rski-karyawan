import { Box, HStack, Text } from "@chakra-ui/react";
import EventDiklatItem from "../../../components/dependent/EventDiklatItem";
import Retry from "../../../components/dependent/Retry";
import BackButton from "../../../components/independent/BackButton";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function EventDiklat() {
  useScrollToTop();

  // const [searchMode, setSearchMode] = useState<boolean>(false);
  // const [search, setSearch] = useState<string | undefined>("");

  const { error, notFound, loading, data, retry } = useDataState<any[]>({
    initialData: undefined,
    url: `/api/get-all-diklat`,
  });

  // const fd = data?.filter((item) => {
  //   const searchTerm = search?.toLowerCase();
  //   return item.nama.toLowerCase().includes(searchTerm as string);
  // });
  // const searchInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (searchMode) {
  //     setTimeout(() => {
  //       if (searchInputRef.current) {
  //         searchInputRef.current.focus();
  //       }
  //     }, 200);
  //   }
  // }, [searchInputRef, searchMode]);

  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

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

          {/* {!searchMode && (
            <Text
              textAlign={"center"}
              noOfLines={1}
              fontWeight={600}
              fontSize={[16, null, 18]}
            >
              Diklat
            </Text>
          )} */}

          <Text
            textAlign={"center"}
            noOfLines={1}
            fontWeight={600}
            fontSize={[16, null, 18]}
          >
            Diklat
          </Text>

          <HStack w={"40px"}>
            <BackButton />
          </HStack>

          {/* <HStack
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
          </HStack> */}
        </HStack>
      </Box>

      <CContainer p={5} pb={8} gap={3} bg={contentBgColor} flex={1}>
        {error && (
          <>
            {notFound && <NoData label="Tidak ada data Diklat" />}

            {!notFound && (
              <Box my={"auto"}>
                <Retry loading={loading} retry={retry} />
              </Box>
            )}
          </>
        )}

        {!error && (
          <>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} h={"348px"} />
              ))}

            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && <NoData />}

                {data && data.length === 0 && <NotFound />}

                {data && data.length > 0 && (
                  <>
                    {data.map((eventDiklat, i) => (
                      <EventDiklatItem key={i} data={eventDiklat} />
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
