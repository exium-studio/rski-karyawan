import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import NotifCount from "./NotifCount";

interface Props {
  nav: { label: string; icon: any; iconFill: any; link: string };
  index: number;
  active: number;
  notifCount?: number | null;
}

export default function NavItem({ nav, index, active, notifCount }: Props) {
  const navItemRef = useRef<HTMLDivElement>(null);

  // SX
  const onClickRipple = () => {
    if (navItemRef.current) {
      navItemRef.current.classList.remove("ripple-sm");
      setTimeout(() => {
        if (navItemRef.current) {
          navItemRef.current.classList.add("ripple-sm");
        }
      }, 10);
    }
  };

  return (
    <VStack
      ref={navItemRef}
      as={Link}
      to={nav.link}
      justify={"center"}
      color={active === index ? "p.500" : ""}
      px={2}
      gap={1}
      onClick={onClickRipple}
      position={"relative"}
    >
      <Box position={"relative"} h={"22px"}>
        <NotifCount
          data={notifCount}
          position={"absolute"}
          top={"-6px"}
          right={"-6px"}
          zIndex={2}
        />
        <Icon
          opacity={active === index ? 1 : 0.4}
          as={active === index ? nav.iconFill : nav.icon}
          fontSize={24}
        />
      </Box>
      <Text opacity={active === index ? 1 : 0.4} fontSize={11} fontWeight={550}>
        {nav.label}
      </Text>
    </VStack>
  );
}
