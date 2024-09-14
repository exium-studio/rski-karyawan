import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import berandaMenus from "../../constant/berandaMenus";
import { useLightDarkColor } from "../../constant/colors";
import useAuth from "../../global/useAuth";
import useDataState from "../../hooks/useDataState";
import chunkArray from "../../lib/chunkArray";
import NotifCount from "../dependent/NotifCount";
import { useRef } from "react";

interface ItemProps extends StackProps {
  menu: any;
  notifCount?: number | null;
}

const BerandaMenuItem = ({ menu, notifCount, ...props }: ItemProps) => {
  // SX
  const lightDarkColor = useLightDarkColor();
  const navigate = useNavigate();

  // const userData = getUserData();

  // console.log(userData?.unit_kerja?.[0]?.jenis_karyawan);

  // const userJenisKaryawan = userData?.unit_kerja?.[0]?.jenis_karyawan;

  const { jenisKaryawan } = useAuth();

  // console.log(userJenisKaryawan);

  return (
    <VStack
      borderRadius={12}
      p={2}
      bg={`${lightDarkColor} !important`}
      cursor={"pointer"}
      h={"85px"}
      // w={sw >= 720 ? "calc(180px - 20px)" : "calc(25vw - 20px)"}
      flexShrink={0}
      className="btn-solid clicky"
      transition={"200ms"}
      gap={1}
      as={Button}
      onClick={() => {
        navigate(menu.link);
      }}
      isDisabled={!menu.jenis_karyawan.includes(jenisKaryawan)}
      {...props}
    >
      <Box position={"relative"}>
        <NotifCount
          data={notifCount}
          position={"absolute"}
          top={"-6px"}
          right={"-6px"}
          zIndex={2}
        />
        <Image src={menu.image} h={"28px"} />
      </Box>
      <Text
        fontSize={12}
        textAlign={"center"}
        my={"auto"}
        lineHeight={1.2}
        whiteSpace={"wrap"}
      >
        {menu.label}
      </Text>
    </VStack>
  );
};

export default function BerandaMenus() {
  const dummy = [null, null, null, null, null, null, null, null, null];

  const { data } = useDataState<(number | null)[]>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });

  const chunkedBerandaMenus = chunkArray(berandaMenus, 8);

  const berandaContainerRef = useRef(null);

  return (
    <VStack gap={0} align={"stretch"}>
      <Box
        w={"50px"}
        h={"4px"}
        bg={"var(--divider2)"}
        mx={"auto"}
        mt={2}
        mb={3}
        borderRadius={"full"}
      />

      <Box
        ref={berandaContainerRef}
        overflowX={"auto"}
        w={"100%"}
        className="noScroll"
        scrollSnapType={"x mandatory"}
      >
        <HStack
          id="berandaMenuContainer"
          px={5}
          w={"max-content"}
          gap={0}
          align={"stretch"}
        >
          {chunkedBerandaMenus.map((bm, i) => (
            <SimpleGrid
              key={i}
              scrollSnapAlign={"center"}
              columns={4}
              gap={3}
              px={5}
              w={"100vw"}
              maxW={"720px"}
            >
              {bm.map((menu, ii) => (
                <BerandaMenuItem
                  key={ii}
                  menu={menu}
                  notifCount={data?.[ii]}
                  // scrollSnapAlign={"center"}
                />
              ))}
            </SimpleGrid>
          ))}
        </HStack>
      </Box>

      {/* Panel Indicator */}
      <Box
        w={"30px"}
        bg={"var(--divider3)"}
        mx={"auto"}
        mt={3}
        borderRadius={"full"}
      >
        <Box h={"4px"} w={"20px"} bg={"p.500"} borderRadius={"full"} />
      </Box>
    </VStack>
  );
}
