import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {}

export default function FlexLine({ ...props }: Props) {
  return (
    <Box
      h={"1px !important"}
      flex={1}
      flexShrink={0}
      bg={"var(--divider2)"}
      mx={4}
      {...props}
    />
  );
}
