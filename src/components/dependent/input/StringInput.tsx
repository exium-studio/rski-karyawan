import {
  Input as ChakraInput,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

interface Props extends InputProps {}

export default function StringInput({ ...props }: Props) {
  // SX
  const { colorMode } = useColorMode();
  const darkLightColorManual = colorMode === "light" ? "white" : "var(--dark)";

  return (
    <>
      <Global
        styles={css`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${darkLightColorManual} inset !important;
            box-shadow: 0 0 0 30px ${darkLightColorManual} inset !important;
          }
        `}
      />

      <ChakraInput
        _focus={{
          border: "1px solid var(--p500) !important",
          boxShadow: "none !important",
        }}
        {...props}
      />
    </>
  );
}
