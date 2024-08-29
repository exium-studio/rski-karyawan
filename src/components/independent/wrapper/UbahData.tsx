import {
  Box,
  HStack,
  Icon,
  IconButton,
  StackProps,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  RiAccountBoxLine,
  RiFileLine,
  RiHeartLine,
  RiHistoryLine,
} from "@remixicon/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLightDarkColor } from "../../../constant/colors";
import UbahDataPersonal from "../../../pages/main/Profil/UbahDataPersonal";
import Header from "../../dependent/Header";
import CContainer from "./CContainer";
import UbahDataKeluarga from "../../../pages/main/Profil/UbahDataKeluarga";
import UbahDataBerkas from "../../../pages/main/Profil/UbahDataBerkas";
import { useEffect, useRef, useState } from "react";

interface Props extends StackProps {
  title: string;
  active: number;
  children?: any;
}

export default function UbahData({ title, active, children, ...props }: Props) {
  const personalTabRef = useRef<HTMLButtonElement>(null);
  const keluargaTabRef = useRef<HTMLButtonElement>(null);
  const berkasTabRef = useRef<HTMLButtonElement>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let tabIndexQuery = queryParams.get("tabindex");

    if (tabIndexQuery === "0") {
      setTabIndex(0);
      setTimeout(() => {
        personalTabRef?.current?.click();
      }, 50);
    }

    if (tabIndexQuery === "1") {
      setTabIndex(1);
      setTimeout(() => {
        keluargaTabRef?.current?.click();
      }, 50);
    }

    if (tabIndexQuery === "2") {
      setTabIndex(2);
      setTimeout(() => {
        berkasTabRef?.current?.click();
      }, 50);
    }
  }, [location, navigate]);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer flex={1} {...props}>
      <Header
        left={"back"}
        backLink="/profil"
        right={
          <IconButton
            aria-label="riwayat perubahan data"
            icon={<Icon as={RiHistoryLine} fontSize={20} />}
            className="btn"
            borderRadius={"full"}
            size={"sm"}
            as={Link}
            to={"/profil/edit/riwayat"}
          />
        }
        title={title}
        px={4}
      />

      <Tabs position="relative" flex={1} variant="unstyled">
        <Box
          bg={lightDarkColor}
          position={"sticky"}
          top={"calc(56px)"}
          zIndex={4}
        >
          <TabList
            h={"40px"}
            w={"100%"}
            borderTop={"1px solid var(--divider2)"}
            borderBottom={"1px solid var(--divider2)"}
          >
            <Tab
              flex={1}
              onClick={() => {
                setTimeout(() => {
                  setTabIndex(0);
                }, 50);
              }}
            >
              <HStack>
                <Icon
                  transition={"200ms"}
                  as={RiAccountBoxLine}
                  opacity={tabIndex === 0 ? 1 : 0.4}
                />
                <Text
                  transition={"200ms"}
                  fontWeight={500}
                  opacity={tabIndex === 0 ? 1 : 0.4}
                >
                  Personal
                </Text>
              </HStack>
            </Tab>
            <Tab
              flex={1}
              onClick={() => {
                setTimeout(() => {
                  setTabIndex(1);
                }, 50);
              }}
            >
              <HStack>
                <Icon
                  transition={"200ms"}
                  as={RiHeartLine}
                  opacity={tabIndex === 1 ? 1 : 0.4}
                />
                <Text
                  transition={"200ms"}
                  fontWeight={500}
                  opacity={tabIndex === 1 ? 1 : 0.4}
                >
                  Keluarga
                </Text>
              </HStack>
            </Tab>
            <Tab
              flex={1}
              onClick={() => {
                setTimeout(() => {
                  setTabIndex(2);
                }, 50);
              }}
            >
              <HStack>
                <Icon
                  transition={"200ms"}
                  as={RiFileLine}
                  opacity={tabIndex === 2 ? 1 : 0.4}
                />
                <Text
                  transition={"200ms"}
                  fontWeight={500}
                  opacity={tabIndex === 2 ? 1 : 0.4}
                >
                  Berkas
                </Text>
              </HStack>
            </Tab>
          </TabList>

          <TabIndicator
            mt="-1.5px"
            height="1px"
            bg="p.500"
            borderRadius="full"
          />
        </Box>

        <TabPanels flex={1}>
          <TabPanel p={0} flex={1}>
            <UbahDataPersonal />
          </TabPanel>
          <TabPanel p={0} flex={1}>
            <UbahDataKeluarga />
          </TabPanel>
          <TabPanel p={0} flex={1}>
            <UbahDataBerkas />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CContainer>
  );
}
