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

export default function Faqs() {
  // SX
  const lightDarkColor = useLightDarkColor();
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header
        left={"back"}
        title="FAQs"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5}>
        <Accordion allowMultiple>
          <CContainer gap={3}>
            <AccordionItem
              bg={lightDarkColor}
              border={"none"}
              borderRadius={12}
            >
              <AccordionButton h="48px">
                <Text textAlign={"left"} flex={1} fontWeight={500}>
                  Section 1 title
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem
              bg={lightDarkColor}
              border={"none"}
              borderRadius={12}
            >
              <AccordionButton h="48px">
                <Text textAlign={"left"} flex={1} fontWeight={500}>
                  Section 2 title
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </CContainer>
        </Accordion>
      </CContainer>
    </CContainer>
  );
}
