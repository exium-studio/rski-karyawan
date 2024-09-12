import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import FullPageSpinner from "../components/independent/FullPageSpinner";
import logout from "../lib/logout";

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
      }
      navigate("/login");
    }
  }, [navigate]);

  // SX

  return <FullPageSpinner />;
}
