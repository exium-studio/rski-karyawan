import { Spinner, StackProps } from "@chakra-ui/react";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {}

export default function FullPageSpinner({ ...props }: Props) {
  return (
    <CContainer
      justify={"center"}
      align={"center"}
      p={5}
      h={"100vh"}
      w={"100vw"}
      {...props}
    >
      <Spinner />
    </CContainer>
  );
}
