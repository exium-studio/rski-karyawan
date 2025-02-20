const optionsAgama = [
  { value: 1, label: "Islam" },
  { value: 2, label: "Kristen" },
  { value: 3, label: "Khatolik" },
  { value: 4, label: "Budha" },
  { value: 5, label: "Hindu" },
  { value: 6, label: "Konghucu" },
];

const optionsHubunganKeluarga = [
  { value: "Suami", label: "Suami" },
  { value: "Istri", label: "Istri" },
  { value: "Anak Ke-1", label: "Anak Ke-1" },
  { value: "Anak Ke-2", label: "Anak Ke-2" },
  { value: "Anak Ke-3", label: "Anak Ke-3" },
  { value: "Anak Ke-4", label: "Anak Ke-4" },
  { value: "Anak Ke-5", label: "Anak Ke-5" },
  { value: "Ibu", label: "Ibu" },
  { value: "Bapak", label: "Bapak" },
  { value: "Ibu Mertua", label: "Ibu Mertua" },
  { value: "Bapak Mertua", label: "Bapak Mertua" },
  // { value: "Nenek", label: "Nenek" },
  // { value: "Kakek", label: "Kakek" },
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

const optionsStatusKaryawan = [
  { value: 1, label: "Tetap" },
  { value: 2, label: "Kontrak" },
  { value: 3, label: "Training" },
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
    value: 0,
    label: "Perempuan",
  },
  {
    value: 1,
    label: "Laki - Laki",
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

const optionsPendidikan = [
  {
    value: 1,
    label: "SD",
  },
  {
    value: 2,
    label: "SMP",
  },
  {
    value: 3,
    label: "SMA",
  },
  {
    value: 4,
    label: "SMK",
  },
  {
    value: 5,
    label: "Diploma 1 (D1)",
  },
  {
    value: 6,
    label: "Diploma 2 (D2)",
  },
  {
    value: 7,
    label: "Diploma 3 (D3)",
  },
  {
    value: 8,
    label: "Diploma 4 (D4) / Sarjana Terapan",
  },
  {
    value: 9,
    label: "Sarjana (S1)",
  },
  {
    value: 10,
    label: "Magister (S2)",
  },
  {
    value: 11,
    label: "Doktor (S3)",
  },
  {
    value: 12,
    label: "Pendidikan Non-Formal",
  },
];

export {
  optionsPendidikan,
  optionsStatusKaryawan,
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
