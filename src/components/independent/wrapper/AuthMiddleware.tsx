import { Icon, useToast, VStack } from "@chakra-ui/react";
import { RiShieldUserFill } from "@remixicon/react";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../global/useAuth";
import req from "../../../lib/req";
import ComponentSpinner from "../ComponentSpinner";
import getAuthToken from "../../../lib/getAuthToken";

interface Props {
  ldp?: number;
  children?: ReactNode;
  allowedJenisKaryawan?: number[];
}

export default function AuthMiddleware({
  ldp,
  children,
  allowedJenisKaryawan,
}: Props) {
  const authToken = getAuthToken();
  const {
    dcs,
    setDcs,
    statusAktif,
    setStatusAktif,
    jenisKaryawan,
    setJenisKaryawan,
  } = useAuth();

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
            // console.log(r.data.data);
            const newDcs = r.data.data.user.data_completion_step;
            setDcs(newDcs);
            setStatusAktif(r.data.data.user.status_aktif);
            setJenisKaryawan(r.data.data.unit_kerja?.jenis_karyawan);
          }
        })
        .catch((e) => {
          console.log(e);
          toast({
            status: "error",
            title:
              (typeof e?.response?.data?.message === "string" &&
                (e?.response?.data?.message as string)) ||
              "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
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
  }, [
    authToken,
    dcs,
    setDcs,
    toast,
    setStatusAktif,
    navigate,
    setJenisKaryawan,
  ]);

  // console.log(statusAktif, dcs);
  // console.log(ldp, dcs, statusAktif, allowedJenisKaryawan, jenisKaryawan);

  const location = useLocation();
  const pathname = location.pathname;

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
          {pathname === "/login" ? (
            children
          ) : (
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

                      {dcs === 0 && statusAktif === 2 && (
                        <>
                          {allowedJenisKaryawan && (
                            <>
                              {typeof jenisKaryawan === "number" && (
                                <>
                                  {allowedJenisKaryawan.includes(
                                    jenisKaryawan
                                  ) ? (
                                    children
                                  ) : (
                                    <Navigate to={"/"} />
                                  )}
                                </>
                              )}
                            </>
                          )}

                          {!allowedJenisKaryawan && children}
                        </>
                      )}

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
      )}
    </>
  );
}
