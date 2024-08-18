import { Interface__ValidStatusKerja } from "../constant/interfaces";

export default function karyawanStatusColor(
  status: Interface__ValidStatusKerja
): string {
  const color = {
    Kerja: "green",
    Cuti: "yellow",
    Izin: "blue",
    Libur: "gray",
  };

  return color[status];
}
