import { ButtonProps } from "@chakra-ui/react";
import { Interface__SelectOption } from "../../../../constant/interfaces";
import SingleSelectDrawer from "../SingleSelectDrawer";
import { dummyTipeCutis } from "../../../../constant/dummy";

interface Props extends ButtonProps {
  id: string;
  name: string;
  onConfirm: (inputValue: Interface__SelectOption | undefined) => void;
  inputValue: Interface__SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  nonNullable?: boolean;
}

export default function SingleSelectJenisCuti({
  id,
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay,
  isError,
  placement = "bottom",
  placeholder,
  nonNullable,
  ...props
}: Props) {
  //TODO get data tipe cuti
  const options = dummyTipeCutis.map((tipeCuti) => ({
    value: tipeCuti.id,
    label: tipeCuti.nama,
  }));

  return (
    <SingleSelectDrawer
      id={id}
      name={name}
      options={options}
      onConfirm={onConfirm}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placement={placement}
      placeholder={placeholder}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
