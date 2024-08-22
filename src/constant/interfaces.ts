export interface Interface__AttendanceData {
  id: number;
  user_id: number;
  tgl_mulai: Date;
  tgl_selesai: Date;
  shift_id: number;
  created_at: Date;
  updated_at: Date;
  shift: Interface__Shift;
  office_lat: number;
  office_long: number;
  radius: number;
}

export interface Interface__Shift {
  id: number;
  nama: string;
  jam_from: string;
  jam_to: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface Interface__ChartDoughnut {
  labels?: string[];
  datasets: {
    customLabels: string[];
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
    [key: string]: any;
  }[];
  aspectRatio?: number;
  cutout?: string;
}

export interface Interface__StatistikCuti {
  tahunan: number;
  kelahiran: number;
  pribadi: number;
}

export interface Interface__StatistikLembur {
  total_waktu: number;
  total_lembur: number;
}

export interface Interface__Cuti {
  kategori: {
    id: number;
    label: string;
  };
  tanggal_from: Date | string;
  tanggal_to: Date | string;
  durasi: number;
  status_cuti: boolean | null;
}

export interface Interface__Lembur {
  id: number;
  user_id: number;
  shift_id: number;
  tgl_pengajuan: Date | string;
  kompensasi: number;
  tipe: string;
  durasi: number;
  catatan: string;
  status_lembur: string;
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__StaticData {
  id: number;
  label: string;
}

export interface Interface__User {
  id: number;
  nama: string;
  username: string;
  email_verified_at: Date | string | null;
  role_id: number | null;
  foto_profil: string | null;
  data_completion_step: number;
  unit_kerja?: Interface__UnitKerja[];
  status_aktif: number;
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__Jadwal {
  id: number;
  nama: string | null;
  tgl_mulai: Date | string;
  tgl_selesai: Date | string;
  shift: Interface__Shift;
  assignees?: Interface__Karyawan[];
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__TukarJadwal {
  id: number;
  kategori_pengajuan: Interface__StaticData;
  user_ditukar: Interface__User;
  jadwal_ditukar: Interface__Jadwal;
  user_pengajuan: Interface__User;
  jadwal_pengajuan: Interface__Jadwal;
  status_penukaran: boolean | null;
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__FilterCuti {
  date_range?: Interface__DateRange | undefined;
  jenis_cuti?: Interface__SelectOption[] | undefined;
  status_cuti?: Interface__SelectOption[] | undefined;
}

export interface Interface__FilterAktivitas {
  date_range?: Interface__DateRange | undefined;
  jenis_aktivitas?: Interface__SelectOption[] | undefined;
}

export interface Interface__FilterTukarJadwal {
  date_range?: Interface__DateRange | undefined;
  jenis_penukaran?: Interface__SelectOption[] | undefined;
  status_penukaran?: Interface__SelectOption[] | undefined;
}

export interface Interface__FilterKaryawan {
  jenis_karyawan?: Interface__SelectOption[] | undefined;
  status_karyawan?: Interface__SelectOption[] | undefined;
}

export interface Interface__DateRange {
  from: Date;
  to: Date;
}

export interface Interface__Aktivitas {
  type: string;
  timestamp: string;
}

export interface Interface__SelectOption {
  value: any;
  label: string;
  subLabel?: string;
}

export type Interface__ValidStatusKerja = "Kerja" | "Cuti" | "Izin" | "Libur";

export interface Interface__Karyawan {
  id: number;
  user: Interface__User;
  nik: string;
  no_rm: number;
  unit_kerja: Interface__UnitKerja[];
  status_karyawan: string;
  status_kerja?: Interface__ValidStatusKerja;
  jadwals?: Interface__Jadwal[];
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__UnitKerja {
  id: number;
  nama_unit: string;
  jenis_karyawan: number | boolean;

  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface StatusHidup {
  value: boolean;
  label: string;
}

export interface Interface__InputDataKeluarga {
  id: string;
  nama: string;
  hubungan_keluarga: Interface__SelectOption;
  status_hidup: StatusHidup;
  pekerjaan: string;
  telepon: string;
  email: string;
}

export interface Interface__EventDiklat {
  id: number;
  gambar: string | null;
  nama: string;
  jenis: string;
  tanggal: Date | string;
  tempat: string;
  waktu: Date | string;
  penanggung_jawab: Interface__User;
  peserta: Interface__Karyawan[] | null;
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__ConstantTable {
  id: number | boolean | null;
  label: string;
}

export interface Interface__DetailKaryawan {
  id: number;
  user: Interface__User;
  email: string;
  no_rm: number;
  no_manulife: number;
  tgl_masuk: Date | string;
  unit_kerja: Interface__UnitKerja;
  jabatan: Interface__Jabatan;
  kompetensi: Interface__Kompetensi;
  role: Interface__Role[];
  nik: string;
  nik_ktp: string;
  status_karyawan: string;
  tempat_lahir: string;
  tgl_lahir: Date | string;
  kelompok_gaji: Interface__KelompokGaji;
  no_rekening: string;
  tunjangan_jabatan: number;
  tunjangan_fungsional: number;
  tunjangan_khusus: number;
  tunjangan_lainnya: number;
  uang_lembur: number;
  uang_makan: number;
  ptkp: Interface__Ptkp;
  tgl_keluar: Date | string;
  no_kk: string;
  alamat: string;
  gelar_depan: string;
  no_hp: string;
  no_bpjsksh: string;
  no_bpjsktk: string;
  tgl_diangkat: Date | string;
  masa_kerja: number;
  npwp: string;
  jenis_kelamin: Interface__ConstantTable;
  agama: Interface__ConstantTable;
  golongan_darah: Interface__ConstantTable;
  tinggi_badan: number;
  berat_badan: number;
  no_ijazah: string;
  tahun_lulus: number;
  no_str: string;
  masa_berlaku_str: Date | string;
  no_sip: string;
  masa_berlaku_sip: Date | string;
  tgl_berakhir_pks: Date | string;
  masa_diklat: number;
  created_at: Date | string;
  updated_at: Date | string | null;
}

export interface Interface__Jabatan {
  id: number;
  nama_jabatan: string;
  is_struktural: number;
  tunjangan: number;
  created_at: Date;
  updated_at: Date | string | null;
}

export interface Interface__KelompokGaji {
  id: number;
  nama_kelompok: string;
  besaran_gaji: number;
  created_at: Date;
  updated_at: Date | string | null;
}

export interface Interface__Kompetensi {
  id: number;
  nama_kompetensi: string;
  jenis_kompetensi: number;
  total_tunjangan: number;
  created_at: Date;
  updated_at: Date | string | null;
}

export interface Interface__Ptkp {
  id: number;
  kode_ptkp: string;
  kategori_ter_id: number;
  created_at: Date;
  updated_at: Date | string | null;
}

export interface Interface__Role {
  id: number;
  name: string;
  deskripsi: string;
  guard_name: string;
  created_at: Date;
  updated_at: Date | string | null;
  pivot: Interface__Pivot;
}

export interface Interface__Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface Interface__Kuisioner {
  id: number;
  jabatan_id: number | null;
  pertanyaan: string;
  created_at: Date | string;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}
