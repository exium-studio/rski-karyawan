import { BoxProps, HStack, Text } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends BoxProps {
  title?: string;
  withoutCloseButton?: boolean;
  onClose?: () => void;
  addition?: any;
}

export default function DisclosureHeader({
  title,
  withoutCloseButton,
  onClose,
  addition,
  ...props
}: Props) {
  return (
    <HStack align={"center"} w={"100%"} h="56px" pr={5} pl={6} {...props}>
      <HStack w={"100%"} justify={"space-between"}>
        <Text fontWeight={600}>{title}</Text>

        {addition}

        {!withoutCloseButton && (
          <BackOnCloseButton
            aria-label="back on close button"
            onClose={onClose}
          />
        )}
      </HStack>
    </HStack>
  );
}
