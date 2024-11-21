import {
  Button,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMapPin2Fill, RiRefreshLine } from "@remixicon/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { iconSize } from "../../constant/sizes";
import useDataState from "../../hooks/useDataState";
import getAddress from "../../lib/getCurrentAddress";
import getLocation from "../../lib/getLocation";
import Skeleton from "../independent/Skeleton";

export default function CurrentAddress() {
  const { setLoading, loading, data, setData } = useDataState<string>({
    initialData: "",
    url: "",
    dependencies: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getLocation()
      .then((myLocation) => {
        getAddress(myLocation.lat, myLocation.long)
          .then((address) => {
            setData(address);
            // console.log(address);
          })
          .catch((error) => {
            setData("Error, silahkan refresh");
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Gagal mendapatkan lokasi:", error);
        setData("Layanan lokasi tidak tersedia");
        navigate("?alert_location_permission=1");
        setLoading(false);
      });
  }, [navigate, setLoading, setData]);

  // SX
  const skeletonBg = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");

  return (
    <>
      {loading && <Skeleton bg={skeletonBg} h={"36px"} mt={8} maxW={"280px"} />}

      {!loading && data === "promt" && (
        <HStack h={"42px"} mb={8}>
          <Button
            color={"white"}
            border={"1px solid white"}
            bg={"transparent"}
            colorScheme="whiteAlpha"
            className="clicky"
            borderRadius={24}
            onClick={() => {
              window.location.reload();
            }}
            leftIcon={<Icon as={RiRefreshLine} fontSize={iconSize} />}
          >
            Izin Akses Lokasi
          </Button>
        </HStack>
      )}

      {!loading && data !== "promt" && (
        <Popover>
          <PopoverTrigger>
            <HStack
              align={"flex-start"}
              maxW={"280px"}
              gap={1}
              h={"36px"}
              mt={8}
            >
              <Text
                noOfLines={2}
                fontSize={[13, null, 15]}
                textAlign={"center"}
                w={"fit-content"}
              >
                <span>
                  <Icon as={RiMapPin2Fill} fontSize={12} mr={2} />
                </span>
                {data}
              </Text>
            </HStack>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>{data}</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
