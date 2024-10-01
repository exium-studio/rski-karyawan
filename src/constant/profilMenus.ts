import {
  RiBriefcaseLine,
  RiLock2Line,
  RiPhoneLine,
  RiShieldStarLine,
  RiUserLine,
} from "@remixicon/react";

const profilMenus = [
  {
    title: "Akun",
    items: [
      // { label: "Penghargaan", link: "", icon: RiAwardLine },
      {
        label: "Detail Data Karyawan",
        link: "/profil/data-karyawan",
        icon: RiBriefcaseLine,
      },
      {
        label: "Data Personal & Keluarga",
        link: "/profil/ubah",
        icon: RiUserLine,
      },
      {
        label: "Ubah Kata Sandi",
        link: "/profil/change-password",
        icon: RiLock2Line,
      },
    ],
  },
  {
    title: "Lainnya",
    items: [
      {
        label: "Syarat dan Ketentuan",
        link: "/profil/syarat-dan-ketentuan",
        icon: RiShieldStarLine,
      },
      // {
      //   label: "FAQs",
      //   link: "/profil/faqs",
      //   icon: RiInformationLine,
      // },
      { label: "Kontak Bantuan", link: "/profil/kontak", icon: RiPhoneLine },
    ],
  },
];

export default profilMenus;
