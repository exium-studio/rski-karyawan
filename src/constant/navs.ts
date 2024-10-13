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
    inboxKey: "beranda",
    link: "/beranda",
    icon: RiHomeSmile2Line,
    iconFill: RiHomeSmile2Fill,
  },
  {
    label: "Jadwal",
    inboxKey: "jadwal",
    link: "/jadwal",
    icon: RiCalendarLine,
    iconFill: RiCalendarFill,
  },
  {
    label: "Karyawan",
    inboxKey: "karyawan",
    link: "/karyawan",
    icon: RiTeamLine,
    iconFill: RiTeamFill,
  },
  {
    label: "Inbox",
    inboxKey: "inbox",
    link: "/inbox",
    icon: RiMailDownloadLine,
    iconFill: RiMailDownloadFill,
  },
  {
    label: "Profil",
    inboxKey: "profil",
    link: "/profil",
    icon: RiUserLine,
    iconFill: RiUserFill,
  },
];

export default navs;
