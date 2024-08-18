import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Icon,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { iconSize } from "./constant/sizes";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(
    <Icon as={RiMoonLine} fontSize={iconSize} />,
    <Icon as={RiSunLine} fontSize={iconSize} />
  );

  return (
    <IconButton
      size="md"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={SwitchIcon}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
