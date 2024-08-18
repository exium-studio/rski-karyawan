import { SimpleGrid, VStack } from "@chakra-ui/react";
import navs from "../../../constant/navs";
import Container from "./Container";
import { useLightDarkColor } from "../../../constant/colors";
import NavItem from "../../dependent/NavItem";
import useDataState from "../../../hooks/useDataState";

interface Props {
  active: number;
  children?: any;
  noNavs?: boolean;
}

export default function NavContainer({ children, active, noNavs }: Props) {
  const dummy = [2, null, null, 4, null];
  const { data } = useDataState<(number | null)[]>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });

  // SX
  const bodyColor = useLightDarkColor();

  return (
    <Container p={0}>
      <VStack gap={0} minH={"100vh"} align={"stretch"}>
        <VStack
          id="content"
          flex={1}
          mb={noNavs ? 0 : "75px"}
          align={"stretch"}
          gap={0}
        >
          {children}
        </VStack>

        {!noNavs && (
          <VStack
            position={"fixed"}
            bottom={0}
            left={0}
            w={"100%"}
            zIndex={3}
            // overflow={"clip"}
          >
            <SimpleGrid
              bg={bodyColor}
              pb={3}
              w={"100%"}
              columns={5}
              borderTop={"1px solid var(--divider2)"}
              h={"75px"}
              maxW={"720px"}
              mx={"auto"}
            >
              {navs.map((nav, i) => (
                <NavItem
                  key={i}
                  nav={nav}
                  index={i}
                  active={active}
                  notifCount={data?.[i]}
                />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
