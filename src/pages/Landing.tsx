import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import logout from "../lib/logout";
import { useEffect } from "react";
import CContainer from "../components/independent/wrapper/CContainer";
import { Spinner } from "@chakra-ui/react";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const firstTime = localStorage.getItem("firsttime");
    if (!firstTime) {
      navigate("/onboarding");
    } else {
      const authToken = getCookie("authToken");
      if (!authToken) {
        logout();
        navigate("/login");
      }
    }
  }, [navigate]);

  // SX

  return (
    <CContainer justify={"center"}>
      <Spinner />
    </CContainer>
  );
}
