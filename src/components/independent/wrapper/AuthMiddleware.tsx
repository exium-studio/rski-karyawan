import { useEffect, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import FullPageSpinner from "../FullPageSpinner";
import useAuth from "../../../global/useAuth";
import req from "../../../lib/req";
import { useToast } from "@chakra-ui/react";

interface Props {
  ldp?: number;
  children?: ReactNode;
}

export default function AuthMiddleware({ ldp, children }: Props) {
  const authToken = getCookie("__auth_token");
  const { dcs, setDcs, statusAktif, setStatusAktif } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && typeof dcs !== "number") {
      setLoading(true);
      req
        .get("/api/getuserinfo")
        .then((r) => {
          if (r.status === 200) {
            const newDcs = r.data.data.data_completion_step;
            setDcs(newDcs);
            setStatusAktif(r.data.data.status_aktif);
          }
        })
        .catch((e) => {
          console.log(e);
          toast({
            status: "error",
            title:
              e.response.data.message || "Maaf terjadi kesalahan pada sistem",
            position: "top",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [authToken, dcs, navigate]);

  return (
    <>
      {loading && <FullPageSpinner />}

      {!loading && (
        <>
          {!authToken && <Navigate to={"/"} />}

          {authToken && (
            <>
              {ldp && (
                <>
                  {dcs === 0 && <Navigate to={"/beranda"} />}

                  {ldp !== dcs && dcs !== 0 && (
                    <Navigate to={`/lengkapi-data-personal-${dcs}`} />
                  )}

                  {ldp === dcs && children}
                </>
              )}

              {!ldp && (
                <>
                  {dcs === 0 && statusAktif !== 2 && <Navigate to={"/"} />}

                  {dcs === 0 && statusAktif === 2 && children}

                  {dcs !== 0 && (
                    <Navigate to={`/lengkapi-data-personal-${dcs}`} />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
