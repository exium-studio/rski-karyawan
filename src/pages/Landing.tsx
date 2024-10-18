import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../components/independent/FullPageSpinner";
import logout from "../lib/logout";
import getAuthToken from "../lib/getAuthToken";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const firstTime = localStorage.getItem("firsttime");
    if (!firstTime) {
      navigate("/onboarding");
    } else {
      const authToken = getAuthToken();
      if (!authToken) {
        logout();
      }
      navigate("/login");
    }
  }, [navigate]);

  // SX

  return <FullPageSpinner />;
}
