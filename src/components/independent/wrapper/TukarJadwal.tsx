import {
  Box,
  HStack,
  Icon,
  StackProps,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import Header from "../../dependent/Header";
import NotifCount from "../../dependent/NotifCount";
import FilterTukarJadwal from "../FilterTukarJadwal";
import ListPengajuanTukarJadwal from "../ListPengajuanTukarJadwal";
import ListPermintaanTukarJadwal from "../ListPermintaanTukarJadwal";
import CContainer from "./CContainer";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface Props extends StackProps {
  title: string;
  active: number;
  children?: any;
}

export default function TukarJadwalContainer({
  title,
  active,
  children,
  ...props
}: Props) {
  const dummy = [null, 1];
  const { data } = useDataState<(number | null)[]>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });

  const pengajuanTabRef = useRef<HTMLButtonElement>(null);
  const permintaanTabRef = useRef<HTMLButtonElement>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let tabIndexQuery = queryParams.get("tabindex");

    if (tabIndexQuery === "0") {
      setTabIndex(0);
      setTimeout(() => {
        pengajuanTabRef?.current?.click();
      }, 50);
    }

    if (tabIndexQuery === "1") {
      setTabIndex(1);
      setTimeout(() => {
        permintaanTabRef?.current?.click();
      }, 50);
    }
  }, [location, navigate]);

  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer {...props}>
      <Box position={"sticky"} top={"0"} bg={lightDarkColor} zIndex={2}>
        <Header left={"back"} title={title} px={4} />

        <FilterTukarJadwal />
      </Box>

      <Tabs position="relative" variant="unstyled">
        <Box
          bg={lightDarkColor}
          position={"sticky"}
          top={"calc(56px + 40px)"}
          zIndex={4}
        >
          <TabList
            h={"40px"}
            w={"100%"}
            borderTop={"1px solid var(--divider2)"}
            borderBottom={"1px solid var(--divider2)"}
          >
            <Tab
              ref={pengajuanTabRef}
              flex={1}
              onClick={() => {
                setTimeout(() => {
                  setTabIndex(0);
                }, 50);
              }}
            >
              <HStack>
                <Icon as={RiArrowUpLine} opacity={tabIndex === 0 ? 1 : 0.4} />
                <Text fontWeight={500} opacity={tabIndex === 0 ? 1 : 0.4}>
                  Pengajuan
                </Text>
                <NotifCount data={data?.[0]} />
              </HStack>
            </Tab>

            <Tab
              ref={permintaanTabRef}
              flex={1}
              onClick={() => {
                setTimeout(() => {
                  setTabIndex(1);
                }, 50);
              }}
            >
              <HStack>
                <Icon as={RiArrowDownLine} opacity={tabIndex === 1 ? 1 : 0.4} />
                <Text fontWeight={500} opacity={tabIndex === 1 ? 1 : 0.4}>
                  Permintaan
                </Text>
                <NotifCount data={data?.[1]} />
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
                p={5}
                pb={8}
                h={"calc(100vh - 56px - 40px - 40px)"}
                overflowY={"auto"}
              >
                <ListPengajuanTukarJadwal />
              </CContainer>
            </TabPanel>
            <TabPanel p={0}>
              <CContainer
                p={5}
                pb={8}
                h={"calc(100vh - 56px - 40px - 40px)"}
                overflowY={"auto"}
              >
                <ListPermintaanTukarJadwal />
              </CContainer>
            </TabPanel>
          </TabPanels>
        </CContainer>
      </Tabs>
    </CContainer>
  );
}
