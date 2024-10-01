import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import backOnClose from "../../lib/backOnClose";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";

interface Props {
  id: string;
  title: string;
  content: any;
  children?: any;
  onConfirm: () => void;
  boxProps?: BoxProps;
  loading?: boolean;
}

const BooleanConfirmationDrawerDisclosure = ({
  id,
  title,
  content,
  children,
  onConfirm,
  boxProps,
  loading,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} {...boxProps}>
        {children}
      </Box>

      <CustomDrawer
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title={title} />}
        footer={
          <ButtonGroup>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={backOnClose}
              isDisabled={loading}
            >
              Tidak
            </Button>
            <Button
              w={"100%"}
              className="btn-ap clicky"
              colorScheme="ap"
              onClick={onConfirm}
              isLoading={loading}
            >
              Ya
            </Button>
          </ButtonGroup>
        }
      >
        <CContainer px={6}>{content}</CContainer>
      </CustomDrawer>
    </>
  );
};

export default BooleanConfirmationDrawerDisclosure;
