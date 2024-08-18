import { ButtonProps, Icon, IconButton } from "@chakra-ui/react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
interface Props extends ButtonProps {
  backLink?: string;
  icon?: any;
}

export default function BackButton({ backLink, icon, ...props }: Props) {
  const navigate = useNavigate();

  // const navigateRef = useRef(navigate);
  // navigateRef.current = navigate;

  // const handlePopState = useCallback(() => {
  //   if (backLink) {
  //     navigateRef.current(backLink);
  //   }
  // }, [backLink]);

  // useEffect(() => {
  //   if (backLink) {
  //     window.addEventListener("popstate", handlePopState);
  //   }

  //   return () => {
  //     if (backLink) {
  //       window.removeEventListener("popstate", handlePopState);
  //     }
  //   };
  // }, [backLink, handlePopState]);

  return (
    <IconButton
      aria-label="Tombol Kembali"
      icon={<Icon as={icon || RiArrowLeftSLine} fontSize={24} mr={"2px"} />}
      className="btn"
      size={"sm"}
      borderRadius={"full"}
      onClick={() => {
        if (backLink) {
          navigate(backLink);
        } else {
          window.history.back();
        }
      }}
      {...props}
    />
  );
}
