import { ButtonProps } from "@chakra-ui/react";
import { Interface__SelectOption } from "../../../../constant/interfaces";
import MultipleSelectDrawer from "../MultipleSelectDrawer";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Interface__SelectOption[] | undefined) => void;
  inputValue: Interface__SelectOption[] | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  maxSelectedDisplay?: number;
  isError?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
}

export default function MultiSelectStatusVerifikasi2({
  id,
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay,
  maxSelectedDisplay,
  isError,
  placement = "bottom",
  placeholder,
  nonNullable,
  ...props
}: Props) {
  const options = [
    {
      value: 1,
      label: "Menunggu Verifikasi",
    },
    {
      value: 2,
      label: "Verif. 1 Disetujui",
    },
    {
      value: 3,
      label: "Verif. 1 Ditolak",
    },
    {
      value: 4,
      label: "Verif. 2 Disetujui",
    },
    {
      value: 5,
      label: "Verif. 2 Ditolak",
    },
  ];

  return (
    <MultipleSelectDrawer
      id={id}
      name={name}
      options={options}
      onConfirm={onConfirm}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      maxSelectedDisplay={maxSelectedDisplay}
      isError={isError}
      placement={placement}
      placeholder={placeholder}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
