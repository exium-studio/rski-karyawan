import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";

export default function Kontak() {
  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Kontak Bantuan"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer flex={1} bg={contentBgColor} p={5}>
        <Accordion allowMultiple>
          <CContainer gap={3}>
            <AccordionItem
              bg={lightDarkColor}
              border={"none"}
              borderRadius={8}
              overflow={"clip"}
            >
              <AccordionButton h="48px">
                <Text textAlign={"left"} flex={1} fontWeight={500}>
                  Reza Hawari
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>Nomornya Reza</Text>
              </AccordionPanel>
            </AccordionItem>
          </CContainer>
        </Accordion>
      </CContainer>
    </CContainer>
  );
}
