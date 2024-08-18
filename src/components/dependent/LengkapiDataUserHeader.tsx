import { HStack, StackProps } from "@chakra-ui/react";
import BackButton from "../independent/BackButton";
import BantuanButton from "../independent/BantuanButton";
import { useLightDarkColor } from "../../constant/colors";

interface Props extends StackProps {
  backLink?: string;
}

export default function LengkapiDataUserHeader({ backLink, ...props }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <HStack
      bg={lightDarkColor}
      h={"72px"}
      // px={4}
      py={4}
      justify={"space-between"}
      position={"sticky"}
      top={0}
      left={0}
      w={"100%"}
      zIndex={99}
      {...props}
    >
      <BackButton backLink={backLink} />

      <BantuanButton />
    </HStack>
  );
}
