import {
  RiCalendarFill,
  RiCalendarLine,
  RiHomeSmile2Fill,
  RiHomeSmile2Line,
  RiMailDownloadFill,
  RiMailDownloadLine,
  RiTeamFill,
  RiTeamLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";

const navs = [
  {
    label: "Beranda",
    link: "/beranda",
    icon: RiHomeSmile2Line,
    iconFill: RiHomeSmile2Fill,
  },
  {
    label: "Jadwal",
    link: "/jadwal",
    icon: RiCalendarLine,
    iconFill: RiCalendarFill,
  },
  {
    label: "Karyawan",
    link: "/karyawan",
    icon: RiTeamLine,
    iconFill: RiTeamFill,
  },
  {
    label: "Inbox",
    link: "/inbox",
    icon: RiMailDownloadLine,
    iconFill: RiMailDownloadFill,
  },
  {
    label: "Profil",
    link: "/profil",
    icon: RiUserLine,
    iconFill: RiUserFill,
  },
];

export default navs;
