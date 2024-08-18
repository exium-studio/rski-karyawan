import {
  RiAccountBoxFill,
  RiAccountBoxLine,
  RiFileFill,
  RiFileLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";

const editDataMenus = [
  {
    label: "Personal",
    link: "/profil/edit/personal",
    icon: RiAccountBoxLine,
    iconFill: RiAccountBoxFill,
  },
  {
    label: "Keluarga",
    link: "/profil/edit/keluarga",
    icon: RiHeartLine,
    iconFill: RiHeartFill,
  },
  {
    label: "Berkas",
    link: "/profil/edit/berkas",
    icon: RiFileLine,
    iconFill: RiFileFill,
  },
];

export default editDataMenus;
