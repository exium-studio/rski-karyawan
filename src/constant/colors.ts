import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f7f7f7", "#151515");
};

const usePrimaryAlphaColor = () => {
  return useColorModeValue("teal.100", "rgba(129, 230, 217, 0.16)");
};

const useLightDarkColor = () => {
  return useColorModeValue("#ffffff", "#191919");
};

const useDarkLightColor = () => {
  return useColorModeValue("#191919", "#ffffff");
};

const useErrorColor = () => {
  return useColorModeValue("#E53E3E", "#FC8181");
};

const useWarningColor = () => {
  return useColorModeValue("#C05621", "#FBD38D");
};

const useRedaColor = () => {
  return useColorModeValue("#FED7D7", "#FEB2B229");
};

const statusKaryawanColorScheme = {
  tetap: "orange",
  Tetap: "orange",
  kontrak: "purple",
  Kontrak: "purple",
  magang: "green",
  Magang: "green",
};

export {
  useContentBgColor,
  usePrimaryAlphaColor,
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useRedaColor,
  useWarningColor,
  statusKaryawanColorScheme,
};
