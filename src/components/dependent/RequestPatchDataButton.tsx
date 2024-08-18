import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { RiArrowUpCircleLine } from "@remixicon/react";
import { useState } from "react";

interface Props extends Omit<IconButtonProps, "aria-label"> {
  validator: () => void;
  column: string;
  payload: any;
}

export default function RequestPatchDataButton({
  validator,
  column,
  payload,
  ...props
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  function requestPatchData(column: string, payload: any) {
    setLoading(true);
    if (payload) {
      console.log(column, payload);
    } else {
      setLoading(false);
    }
  }

  return (
    <IconButton
      isLoading={loading}
      borderRadius={"full"}
      aria-label={`Request update for ${column}`}
      icon={<Icon as={RiArrowUpCircleLine} fontSize={28} color={"p.500"} />}
      className="btn-solid clicky"
      onClick={async () => {
        validator();
        requestPatchData(column, payload);
      }}
      {...props}
    />
  );
}
