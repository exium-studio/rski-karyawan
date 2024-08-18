import { Box, HStack, StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  active: number;
  length: number;
  activeW?: string;
}

export default function HorizontalSliderIndicator({
  active,
  length,
  activeW,
  ...props
}: Props) {
  return (
    <HStack {...props}>
      {Array.from({ length }).map((_, i) => (
        <Box
          transition={"200ms"}
          key={i}
          w={i + 1 === active ? activeW || "74px" : "16px"}
          h="6px"
          borderRadius="full"
          bg={i + 1 === active ? "p.500" : "var(--p500a3)"}
        />
      ))}
    </HStack>
  );
}
