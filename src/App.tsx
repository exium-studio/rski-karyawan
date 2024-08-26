import { ChakraProvider } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AuthMiddleware from "./components/independent/wrapper/AuthMiddleware";
import NavContainer from "./components/independent/wrapper/NavContainer";
import TukarJadwal from "./components/independent/wrapper/TukarJadwal";
import UbahData from "./components/independent/wrapper/UbahData";
import "./globalStyle.css";
import useStatusBarColor from "./lib/statusBarColor";
import InternalServerErrorPage from "./pages/errorPage/InternalServerErrorPage";
import MaintenancePage from "./pages/errorPage/MaintenancePage";
import MissingPage from "./pages/errorPage/MissingPage";
import Landing from "./pages/Landing";
import LengkapiDataUser1 from "./pages/lengkapiUserData/LengkapiDataUser1";
import LengkapiDataUser2 from "./pages/lengkapiUserData/LengkapiDataUser2";
import LengkapiDataUser3 from "./pages/lengkapiUserData/LengkapiDataUser3";
import LengkapiDataUser4 from "./pages/lengkapiUserData/LengkapiDataUser4";
import LengkapiDataUser5 from "./pages/lengkapiUserData/LengkapiDataUser5";
import Login from "./pages/Login";
import Aktivitas from "./pages/main/SemuaAktivitas";
import Beranda from "./pages/main/Beranda/Beranda";
import Cuti from "./pages/main/Beranda/Cuti";
import Dokumen from "./pages/main/Beranda/Dokumen";
import EventDiklat from "./pages/main/Beranda/EventDiklat";
import Feedback from "./pages/main/Beranda/Feedback";
import FeedbackKuisioner from "./pages/main/Beranda/FeedbackKuisioner";
import Inbox from "./pages/main/Beranda/Inbox";
import Koperasi from "./pages/main/Beranda/Koperasi";
import Laporan from "./pages/main/Beranda/Laporan";
import Lembur from "./pages/main/Beranda/Lembur";
import PengajuanTukarJadwal from "./pages/main/Beranda/PengajuanTukarJadwal";
import Pengumuman from "./pages/main/Beranda/SemuaPengumuman";
import SlipGajiku from "./pages/main/Beranda/SlipGajiku";
import Jadwal from "./pages/main/Jadwal/Jadwal";
import Karyawan from "./pages/main/Karyawan/Karyawan";
import Faqs from "./pages/main/Profil/Faqs";
import Kontak from "./pages/main/Profil/Kontak";
import Profil from "./pages/main/Profil/Profil";
import RiwayatPerubahanData from "./pages/main/Profil/RiwayatPerubahanData";
import SyaratDanKetentuan from "./pages/main/Profil/SyaratDanKetentuan";
import Onboarding from "./pages/Onboarding";
import EmailVerfication from "./pages/resetPassword/EmailVerfication";
import ForgotPassword from "./pages/resetPassword/ForgotPassword";
import NewPassword from "./pages/resetPassword/NewPassword";
import { globalTheme } from "./theme/globalTheme";

// function disableRightClick(event: MouseEvent) {
//   event.preventDefault();
// }

// styling notif bar color
const EndpointWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const setStatusBarPrimary = useStatusBarColor("#16b3ac", "#191919");
  const setStatusBarBody = useStatusBarColor("#ffffff", "#191919");
  const setStatusBarDark = useStatusBarColor("#191919", "#191919");

  useEffect(() => {
    // Dapatkan endpoint dari lokasi saat ini
    const endpoint = location.pathname.split("/").pop();
    switch (endpoint) {
      default:
        setStatusBarBody();
        break;
      case "beranda":
        setStatusBarPrimary();
        break;
      case "foto":
        setStatusBarDark();
        break;
    }
  }, [location, setStatusBarPrimary, setStatusBarBody, setStatusBarDark]);

  return <>{children}</>;
};

export const App = () => {
  // useEffect(() => {
  //   // Tambahkan event listener ke objek document saat komponen dimuat
  //   document.addEventListener("contextmenu", disableRightClick);

  //   // Bersihkan event listener saat komponen dibongkar
  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //   };
  // }, []);

  return (
    <ChakraProvider theme={globalTheme}>
      <BrowserRouter>
        <EndpointWrapper>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password-email-verif"
              element={<EmailVerfication />}
            />
            <Route path="/new-password" element={<NewPassword />} />
            <Route
              path="/lengkapi-data-personal-1"
              element={
                <AuthMiddleware ldp={1}>
                  <LengkapiDataUser1 />
                </AuthMiddleware>
              }
            />
            <Route
              path="/lengkapi-data-personal-2"
              element={
                <AuthMiddleware ldp={2}>
                  <LengkapiDataUser2 />
                </AuthMiddleware>
              }
            />
            <Route
              path="/lengkapi-data-personal-3"
              element={
                <AuthMiddleware ldp={3}>
                  <LengkapiDataUser3 />
                </AuthMiddleware>
              }
            />
            <Route
              path="/lengkapi-data-personal-4"
              element={
                <AuthMiddleware ldp={4}>
                  <LengkapiDataUser4 />
                </AuthMiddleware>
              }
            />
            <Route
              path="/lengkapi-data-personal-5"
              element={
                <AuthMiddleware ldp={5}>
                  <LengkapiDataUser5 />
                </AuthMiddleware>
              }
            />

            <Route
              path="/beranda"
              element={
                <AuthMiddleware>
                  <NavContainer active={0}>
                    <Beranda />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/inbox"
              element={
                <AuthMiddleware>
                  <NavContainer active={3}>
                    <Inbox />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            {/* <Route
              path="/presensi/foto"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <AmbilFoto />
                  </NavContainer>
                </AuthMiddleware>
              }
            /> */}
            <Route
              path="/beranda/cuti"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Cuti />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/tukar-jadwal"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <TukarJadwal title="Pengajuan Tukar Jadwal" active={0}>
                      <PengajuanTukarJadwal />
                    </TukarJadwal>
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/lembur"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Lembur />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/event-diklat"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <EventDiklat />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/slip-gajiku"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <SlipGajiku />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/dokumen"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Dokumen />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/feedback"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Feedback />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/feedback/:user_id"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <FeedbackKuisioner />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/koperasi"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Koperasi />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/laporan"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Laporan />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/beranda/pengumuman"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Pengumuman />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/jadwal"
              element={
                <AuthMiddleware>
                  <NavContainer active={1}>
                    <Jadwal />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            {/* <Route
              path="/jadwal/:currentJadwalId"
              element={
                <AuthMiddleware>
                  <NavContainer active={1} noNavs>
                    <DetailJadwal />
                  </NavContainer>
                </AuthMiddleware>
              }
            /> */}
            <Route
              path="/karyawan"
              element={
                <AuthMiddleware>
                  <NavContainer active={2}>
                    <Karyawan />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            {/* <Route
              path="/karyawan/detail"
              element={
                <AuthMiddleware>
                  <NavContainer active={2} noNavs>
                    <DetailKaryawan />
                  </NavContainer>
                </AuthMiddleware>
              }
            /> */}
            <Route
              path="/beranda/aktivitas"
              element={
                <AuthMiddleware>
                  <NavContainer active={0} noNavs>
                    <Aktivitas />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/profil"
              element={
                <AuthMiddleware>
                  <NavContainer active={4}>
                    <Profil />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/profil/ubah"
              element={
                <AuthMiddleware>
                  <NavContainer active={4} noNavs>
                    <UbahData title="Ubah Data Personal" active={0} />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/profil/edit/riwayat"
              element={
                <AuthMiddleware>
                  <NavContainer active={4} noNavs>
                    <RiwayatPerubahanData />
                  </NavContainer>
                </AuthMiddleware>
              }
            />
            <Route
              path="/profil/syarat-dan-ketentuan"
              element={
                <NavContainer active={4} noNavs>
                  <SyaratDanKetentuan />
                </NavContainer>
              }
            />
            <Route
              path="/profil/faqs"
              element={
                <NavContainer active={4} noNavs>
                  <Faqs />
                </NavContainer>
              }
            />
            <Route
              path="/profil/kontak"
              element={
                <NavContainer active={4} noNavs>
                  <Kontak />
                </NavContainer>
              }
            />

            <Route path="servererror" element={<InternalServerErrorPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </EndpointWrapper>
      </BrowserRouter>
    </ChakraProvider>
  );
};
