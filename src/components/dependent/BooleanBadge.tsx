import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: boolean | number | null;
  trueValue: string;
  falseValue: string;
  nullValue?: string;
}

export default function BooleanBadge({
  data,
  trueValue,
  falseValue,
  nullValue,
  ...props
}: Props) {
  return (
    <Badge
      textAlign={"center"}
      colorScheme={
        data ? "green" : data === null && nullValue ? "orange" : "red"
      }
      borderRadius={"full"}
      {...props}
    >
      {data ? trueValue : data === null && nullValue ? nullValue : falseValue}
    </Badge>
  );
}
