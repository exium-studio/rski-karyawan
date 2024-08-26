import { Icon, useToast, VStack } from "@chakra-ui/react";
import { RiShieldUserFill } from "@remixicon/react";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import useAuth from "../../../global/useAuth";
import req from "../../../lib/req";
import ComponentSpinner from "../ComponentSpinner";

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
              (typeof e?.response?.data?.message === "string" &&
                (e?.response?.data?.message as string)) ||
              "Maaf terjadi kesalahan pada sistem",
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
  }, [authToken, dcs, setDcs, toast, setStatusAktif, navigate]);

  // console.log(statusAktif, dcs);

  return (
    <>
      {loading && (
        <VStack
          p={5}
          h={"100vh"}
          justify={"center"}
          flex={1}
          position={"relative"}
        >
          <ComponentSpinner
            position={"absolute"}
            spinnerProps={{ size: "xl", w: "80px", h: "80px" }}
            opacity={0.4}
          />

          <Icon as={RiShieldUserFill} fontSize={32} opacity={0.4} />
        </VStack>
      )}

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
