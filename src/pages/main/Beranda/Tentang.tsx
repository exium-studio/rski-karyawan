import {
  Box,
  HStack,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { RiAwardLine, RiBardLine, RiHospitalLine } from "@remixicon/react";
import { useState } from "react";
import Header from "../../../components/dependent/Header";
import TentangContent from "../../../components/dependent/TentangContent";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";

export default function Tentang() {
  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  // States
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Tentang"
        px={4}
        // borderBottom={"1px solid var(--divider2)"}
      />

      <Tabs position="relative" variant="unstyled">
        <Box
          bg={lightDarkColor}
          position={"sticky"}
          top={"calc(56px)"}
          zIndex={4}
        >
          <TabList
            h={"40px"}
            w={"100%"}
            // borderTop={"1px solid var(--divider2)"}
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
                <Icon as={RiHospitalLine} opacity={tabIndex === 0 ? 1 : 0.4} />
                <Text
                  noOfLines={1}
                  fontWeight={500}
                  opacity={tabIndex === 0 ? 1 : 0.4}
                >
                  Tentang
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
                <Icon as={RiBardLine} opacity={tabIndex === 1 ? 1 : 0.4} />
                <Text
                  noOfLines={1}
                  fontWeight={500}
                  opacity={tabIndex === 1 ? 1 : 0.4}
                >
                  Visi & Misi
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
                <Icon as={RiAwardLine} opacity={tabIndex === 2 ? 1 : 0.4} />
                <Text
                  noOfLines={1}
                  fontWeight={500}
                  opacity={tabIndex === 2 ? 1 : 0.4}
                >
                  Mutu
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

        <CContainer bg={contentBgColor}>
          <TabPanels>
            <TabPanel p={0}>
              <CContainer
                // border={"1px solid red"}
                p={5}
                pb={8}
                h={"calc(100vh - 56px - 40px)"}
                overflowY={"auto"}
              >
                <TentangContent
                  url={`/api/get-about-hospital`}
                  tabIndex={tabIndex}
                  index={0}
                />
                {/* <ListPengajuanTukarJadwal tabIndex={tabIndex} index={0} /> */}
              </CContainer>
            </TabPanel>

            <TabPanel p={0}>
              <CContainer
                // border={"1px solid red"}
                p={5}
                pb={8}
                h={"calc(100vh - 56px - 40px)"}
                overflowY={"auto"}
              >
                <TentangContent
                  url={`/api/get-visi-misi`}
                  tabIndex={tabIndex}
                  index={1}
                />
                {/* <ListPermintaanTukarJadwal tabIndex={tabIndex} index={1} /> */}
              </CContainer>
            </TabPanel>

            <TabPanel p={0}>
              <CContainer
                // border={"1px solid red"}
                p={5}
                pb={8}
                h={"calc(100vh - 56px - 40px)"}
                overflowY={"auto"}
              >
                <TentangContent
                  url={`/api/get-mutu`}
                  tabIndex={tabIndex}
                  index={2}
                />
                {/* <ListPermintaanTukarJadwal tabIndex={tabIndex} index={1} /> */}
              </CContainer>
            </TabPanel>
          </TabPanels>
        </CContainer>
      </Tabs>
    </CContainer>
  );
}
