import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { RiCustomerServiceLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { iconSize } from "../../constant/sizes";

interface Props extends ButtonProps {}

export default function BantuanButton({ ...props }: Props) {
  return (
    <Button
      as={Link}
      to={"/profil/kontak"}
      leftIcon={<Icon as={RiCustomerServiceLine} fontSize={iconSize} />}
      w={"fit-content"}
      ml={"auto"}
      className="btn-apa clicky"
      {...props}
    >
      Butuh Bantuan?
    </Button>
  );
}
