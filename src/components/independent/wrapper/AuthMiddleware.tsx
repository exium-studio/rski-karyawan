import { Icon, useToast, VStack } from "@chakra-ui/react";
import { RiShieldUserFill } from "@remixicon/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../global/useAuth";
import getAuthToken from "../../../lib/getAuthToken";
import getUserData from "../../../lib/getUserData";
import req from "../../../lib/req";
import ComponentSpinner from "../ComponentSpinner";
import useMedicAlert from "../../../hooks/useMedicAlert";
import SIPSTRAlert from "../../dependent/SIPSTRAlert";

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
  const userData = getUserData();
  const userDataRef = useRef(userData);
  const authToken = getAuthToken();

  // console.log("authToken", authToken);

  const { onOpen, setData } = useMedicAlert();

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
            const newUnitKerja = r.data.data.unit_kerja;
            const newUserData = {
              ...userDataRef.current,
              unit_kerja: [newUnitKerja],
            };
            localStorage.setItem("__user_data", JSON.stringify(newUserData));
            const newDcs = r.data.data.user.data_completion_step;
            setDcs(newDcs);
            setStatusAktif(r.data.data.user.status_aktif);
            setJenisKaryawan(r.data.data.unit_kerja?.jenis_karyawan);

            // Handle alert sip str
            const masaBerlakuStr =
              r.data.data.user.data_karyawan.masa_berlaku_str;
            const masaBerlakuSip =
              r.data.data.user.data_karyawan.masa_berlaku_sip;

            if (masaBerlakuStr || masaBerlakuSip) {
              onOpen();
              setData({
                masa_str: masaBerlakuStr,
                masa_sip: masaBerlakuSip,
              });
            }
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
    onOpen,
    setData,
  ]);

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
          <SIPSTRAlert />

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
