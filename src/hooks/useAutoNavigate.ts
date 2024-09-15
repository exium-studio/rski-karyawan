import { useNavigate } from "react-router-dom";

const useAutoNavigate = () => {
  const navigate = useNavigate();

  const autoNavigate = (
    authToken?: string,
    dcs?: number,
    statusAktif?: boolean | number
  ) => {
    // console.log(dcs, statusAktif);

    if (authToken) {
      if (statusAktif) {
        if (dcs && dcs !== 0) {
          navigate(`/lengkapi-data-personal-${dcs}`);
        } else {
          navigate("/beranda");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  // Return the function to be called externally
  return autoNavigate;
};

export default useAutoNavigate;
