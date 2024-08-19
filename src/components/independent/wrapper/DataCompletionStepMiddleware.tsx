import { useEffect, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import FullPageSpinner from "../FullPageSpinner";
import useDcs from "../../../global/useDcs";
import req from "../../../lib/req";
import { useToast } from "@chakra-ui/react";

interface Props {
  ldp?: number;
  children?: ReactNode;
}

export default function DataCompletionStepMiddleware({ ldp, children }: Props) {
  const authToken = getCookie("__auth_token");
  const { dcs, setDcs } = useDcs();

  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && typeof dcs !== "number") {
      req
        .get("/api/getuserinfo")
        .then((r) => {
          if (r.status === 200) {
            const newDcs = r.data.data.data_completion_step;
            setDcs(newDcs);
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
                  {ldp !== dcs && (
                    <Navigate to={`/lengkapi-data-personal-${dcs}`} />
                  )}

                  {ldp === dcs && children}
                </>
              )}

              {!ldp && (
                <>
                  {dcs !== 0 && (
                    <Navigate to={`/lengkapi-data-personal-${dcs}`} />
                  )}

                  {dcs === 0 && children}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
