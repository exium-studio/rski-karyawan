import { Box, Button, Image, Text, VStack, Wrap } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import berandaMenus from "../../constant/berandaMenus";
import { useLightDarkColor } from "../../constant/colors";
import useAuth from "../../global/useAuth";
import useDataState from "../../hooks/useDataState";
import useScreenWidth from "../../hooks/useScreenWidth";
import NotifCount from "../dependent/NotifCount";

interface ItemProps {
  menu: any;
  notifCount?: number | null;
}

const BerandaMenuItem = ({ menu, notifCount }: ItemProps) => {
  const sw = useScreenWidth();

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
      bg={lightDarkColor}
      cursor={"pointer"}
      _active={{ opacity: 0.6 }}
      h={"85px"}
      w={sw >= 720 ? "calc(180px - 20px)" : "calc(25vw - 20px)"}
      flexShrink={0}
      className="clicky"
      transition={"200ms"}
      gap={1}
      as={Button}
      onClick={() => {
        navigate(menu.link);
      }}
      isDisabled={!menu.jenis_karyawan.includes(jenisKaryawan)}
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

  // const containerRef = useRef<HTMLDivElement | null>(null);
  // const [indicatorTranslateRight, setIndicatorTranslateRight] = useState(0);
  // const [indicatorContainerWidth, setIndicatorContainerWidth] =
  //   useState<number>(20);

  // const handleScroll = () => {
  //   const container = containerRef.current;
  //   if (container) {
  //     const containerWidth = container.offsetWidth;
  //     const containerScrollLeft = container.scrollLeft;
  //     const containerScrollWidth = container.scrollWidth;
  //     const containerMaxScrollWidth = containerScrollWidth - containerWidth;

  //     const containerScaleToIndicator = 10 / containerWidth;
  //     setIndicatorContainerWidth(
  //       10 * 2 + containerMaxScrollWidth * containerScaleToIndicator
  //     );
  //     setIndicatorTranslateRight(
  //       containerScaleToIndicator * containerScrollLeft
  //     );
  //   }
  // };

  // const sw = useScreenWidth();

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
        id="berandaMenuContainer"
        w={"100%"}
        overflowX={"auto"}
        className="noScroll"
        // ref={containerRef}
        // onScroll={handleScroll}
      >
        <Wrap
          px={5}
          spacing={3}
          // w={
          //   sw >= 720
          //     ? "calc((160px * 5)  + 40px + (12px * 4))"
          //     : "calc(((25vw - 20px) * 6) + 12px)"
          // }
          w={"100%"}
        >
          {berandaMenus.map((menu, i) => (
            <BerandaMenuItem key={i} menu={menu} notifCount={data?.[i]} />
          ))}
        </Wrap>
      </Box>
      {/* 
      <HStack
        mx={"auto"}
        w={`${indicatorContainerWidth}px`}
        h={"5px"}
        mt={3}
        bg={"var(--divider2)"}
        borderRadius={"full"}
        position="relative"
        zIndex={2}
      >
        <Box
          id="berandaMenuIndicator"
          h={"5px"}
          w={"10px"}
          bg={"var(--p500)"}
          borderRadius={"full"}
          position="absolute"
          left={`${indicatorTranslateRight * 5}px`}
        />
      </HStack> */}
    </VStack>
  );
}
