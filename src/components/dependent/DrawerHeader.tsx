import { HStack, StackProps, Text } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends StackProps {
  title: string;
  withoutCloseButton?: boolean;
}

export default function DrawerHeader({
  title,
  withoutCloseButton,
  ...props
}: Props) {
  return (
    <HStack align={"center"} w={"100%"} h="60px" pr={5} pl={6} {...props}>
      <HStack w={"100%"} align={"center !Important"} justify={"space-between"}>
        <Text fontSize={16} fontWeight={600}>
          {title}
        </Text>

        {!withoutCloseButton && (
          <BackOnCloseButton aria-label="back on close button" mr={"-6px"} />
        )}
      </HStack>
    </HStack>
  );
}
