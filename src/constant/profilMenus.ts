import {
  RiEditLine,
  RiInformationLine,
  RiPhoneLine,
  RiShieldStarLine,
} from "@remixicon/react";

const profilMenus = [
  {
    title: "Akun",
    items: [
      // { label: "Penghargaan", link: "", icon: RiAwardLine },
      {
        label: "Perubahan Data",
        link: "/profil/ubah",
        icon: RiEditLine,
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
      {
        label: "FAQs",
        link: "/profil/faqs",
        icon: RiInformationLine,
      },
      { label: "Kontak Bantuan", link: "/profil/kontak", icon: RiPhoneLine },
    ],
  },
];

export default profilMenus;
