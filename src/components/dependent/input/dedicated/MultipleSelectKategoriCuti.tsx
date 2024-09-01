import { ButtonProps } from "@chakra-ui/react";
import { Interface__SelectOption } from "../../../../constant/interfaces";
import { optionsKategoriCuti } from "../../../../constant/selectOptions";
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

export default function MultipleSelectKategoriCuti({
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
  return (
    <MultipleSelectDrawer
      id={id}
      name={name}
      options={optionsKategoriCuti}
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
