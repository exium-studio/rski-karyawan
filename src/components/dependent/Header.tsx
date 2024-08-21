import { HStack, StackProps, Text } from "@chakra-ui/react";
import BackButton from "../independent/BackButton";
import { useLightDarkColor } from "../../constant/colors";

interface Props extends StackProps {
  title?: string;
  backLink?: string;
  left?: any;
  right?: any;
}
export default function Header({
  title,
  backLink,
  left,
  right,
  ...props
}: Props) {
  return (
    <HStack
      bg={useLightDarkColor()}
      h={"56px"}
      px={5}
      py={4}
      justify={"space-between"}
      position={"sticky"}
      top={0}
      left={0}
      zIndex={99}
      w={"100%"}
      {...props}
    >
      <HStack w={"70px"}>
        {left === "back" && (
          <BackButton backLink={backLink} color={props?.color} />
        )}
      </HStack>

      <Text textAlign={"center"} noOfLines={1} fontWeight={600} fontSize={16}>
        {title}
      </Text>

      <HStack w={"70px"} justify={"flex-end"}>
        {right}
      </HStack>
    </HStack>
  );
}
