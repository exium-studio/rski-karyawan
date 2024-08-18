import { StackProps, VStack } from "@chakra-ui/react";
import DebugTools from "../../DebugTools";

interface Props extends StackProps {
  children: any;
}

export default function Container({ children, ...props }: Props) {
  return (
    <>
      {/* quick debug tools */}
      <DebugTools />
      {/* quick debug tools */}

      <VStack
        className="container"
        w={"100%"}
        gap={0}
        maxW={"720px"}
        minH={"100vh"}
        mx={"auto"}
        align={"stretch"}
        pb={8}
        // px={5}
        {...props}
      >
        {children}
      </VStack>
    </>
  );
}
