import { Box, Icon, IconButton } from "@chakra-ui/react";
import { RiHistoryLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import EventDiklatItem from "../../../components/dependent/EventDiklatItem";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import NoData from "../../../components/independent/NoData";
import NotFound from "../../../components/independent/NotFound";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import useScrollToTop from "../../../hooks/useScrollToTop";
import AjukanDiklatEksternal from "../../../components/independent/AjukanDiklatEksternal";

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
        <Header
          left={"back"}
          right={
            <IconButton
              aria-label="riwayat perubahan data"
              icon={<Icon as={RiHistoryLine} fontSize={20} />}
              className="btn"
              borderRadius={"full"}
              size={"sm"}
              as={Link}
              to={"/beranda/event-diklat/riwayat"}
            />
          }
          title={"Diklat"}
          px={4}
        />
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

        <AjukanDiklatEksternal />
      </CContainer>
    </CContainer>
  );
}
