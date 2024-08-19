export default function calculateDuration(finishTime: string): number {
  // Ambil jam, menit, dan detik dari format waktu hh:mm:ss
  const [jamKeluar, menitKeluar, detikKeluar] = finishTime
    .split(":")
    .map(Number);

  // Ambil waktu sekarang sebagai waktu masuk
  const waktuMasuk = new Date();

  // Buat objek Date untuk waktu keluar dengan tanggal yang sama tapi jam yang sesuai
  const waktuKeluar = new Date(
    waktuMasuk.getFullYear(),
    waktuMasuk.getMonth(),
    waktuMasuk.getDate(),
    jamKeluar,
    menitKeluar,
    detikKeluar
  );

  // Hitung jarak waktu dalam milidetik
  const jarakWaktu: number = waktuKeluar.getTime() - waktuMasuk.getTime();

  // Kembalikan jarak waktu dalam detik
  return jarakWaktu / 1000;
}
