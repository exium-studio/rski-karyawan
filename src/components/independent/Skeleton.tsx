import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children?: any;
}

export default function Skeleton({ children, ...props }: Props) {
  return (
    <Box
      className={"skeleton"}
      w={"100%"}
      h={"50px"}
      bg={"var(--divider)"}
      borderRadius={12}
      {...props}
    >
      {children}
    </Box>
  );
}
