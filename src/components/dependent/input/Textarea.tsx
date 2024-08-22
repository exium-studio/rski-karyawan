import {
  Textarea as ChakraTextarea,
  TextareaProps,
  useColorMode,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";

interface Props extends TextareaProps {
  name: string;
  onChangeSetter: (inputValue: string | undefined) => void;
  inputValue: string | undefined;
  isError?: boolean;
  placeholder?: string;
}

export default function Textarea({
  name,
  onChangeSetter,
  inputValue,
  isError,
  placeholder,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 5
      }px`;
    }
  }, [textareaRef]);

  useEffect(() => {
    autoResize();
  }, [autoResize, inputValue]);

  const { colorMode } = useColorMode();
  const darkLightColorManual = colorMode === "light" ? "white" : "var(--dark)";

  return (
    <>
      <Global
        styles={css`
          textarea:-webkit-autofill {
            border: 1px solid var(--divider3) !important;
          }
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus,
          textarea:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 100px ${darkLightColorManual} inset !important;
            box-shadow: 0 0 0 100px ${darkLightColorManual} inset !important;
          }
        `}
      />

      <ChakraTextarea
        ref={textareaRef}
        minH={"80px"}
        name={name}
        placeholder={placeholder || "Masukkan deskripsi singkat"}
        onChange={(e) => {
          onChangeSetter(e.target.value);
        }}
        value={inputValue}
        {...props}
      />
    </>
  );
}
