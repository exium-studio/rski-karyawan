const optionsAgama = [
  { value: 1, label: "Islam" },
  { value: 2, label: "Kristen" },
  { value: 3, label: "Katolik" },
  { value: 4, label: "Budha" },
  { value: 5, label: "Hindu" },
  { value: 6, label: "Konghucu" },
];

const optionsHubunganKeluarga = [
  { value: 1, label: "Ibu" },
  { value: 2, label: "Ayah" },
  { value: 3, label: "Istri" },
  { value: 4, label: "Suami" },
  { value: 5, label: "Anak" },
];

const optionsKategoriCuti = [
  { value: 1, label: "Tahunan" },
  { value: 2, label: "Kelahiran" },
  { value: 3, label: "Pribadi" },
];

const optionsKategoriTukarJadwal = [
  { value: 1, label: "Tukar Shift" },
  { value: 2, label: "Tukar Libur" },
];

const optionsStatusTukarJadwal = [
  { value: null, label: "Menunggu" },
  { value: true, label: "Disetujui" },
  { value: false, label: "Tidak Disetujui" },
];

const optionsStatusKerja = [
  { value: 1, label: "Kerja" },
  { value: 2, label: "Cuti" },
  { value: 3, label: "Izin" },
  { value: 4, label: "Libur" },
];

const optionsJenisKaryawan = [
  { value: true, label: "Shift" },
  { value: false, label: "Non-Shift" },
];

const optionsJenisAktivitasPresensi = [
  { value: 1, label: "Masuk" },
  { value: 2, label: "Keluar" },
];

const optionsJenisKelamin = [
  {
    value: 1,
    label: "Laki - Laki",
  },
  {
    value: 2,
    label: "Perempuan",
  },
];

const optionsInboxType = [
  {
    id: 1,
    label: "Cuti",
    link: "/beranda/cuti",
  },
  {
    id: 2,
    label: "Pengajuan Tukar Jadwal",
    link: "/beranda/tukar-jadwal?tabindex=0",
  },
  {
    id: 3,
    label: "Permintaan Tukar Jadwal",
    link: "/beranda/tukar-jadwal?tabindex=1",
  },
  {
    id: 4,
    label: "Lembur",
    link: "/beranda/lembur",
  },
  {
    id: 5,
    label: "Event & Diklat",
    link: "/beranda/event-diklat",
  },
  {
    id: 6,
    label: "Slip Gajiku",
    link: "/beranda/slip-gajiku",
  },
  {
    id: 7,
    label: "Dokumen",
    link: "/beranda/dokumen",
  },
  {
    id: 8,
    label: "Feedback",
    link: "/beranda/feedback",
  },
  {
    id: 9,
    label: "Laporan",
    link: "/beranda/laporan",
  },
  {
    id: 10,
    label: "Koperasi",
    link: "/beranda/koperasi",
  },
  {
    id: 11,
    label: "Perubahan Data",
    link: "/profil/edit/riwayat",
  },
  {
    id: 12,
    label: "Pengumuman",
    link: "/beranda/pengumuman",
  },
];

export {
  optionsAgama,
  optionsKategoriCuti,
  optionsKategoriTukarJadwal,
  optionsStatusTukarJadwal,
  optionsStatusKerja,
  optionsJenisKaryawan,
  optionsJenisAktivitasPresensi,
  optionsJenisKelamin,
  optionsInboxType,
  optionsHubunganKeluarga,
};
