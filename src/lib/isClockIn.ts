export default function isClockIn(waktuMasuk: string): boolean {
  const [jam, menit, detik] = waktuMasuk.split(":").map(Number);
  const sekarang = new Date();
  const waktuMasukObj = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth(),
    sekarang.getDate(),
    jam,
    menit,
    detik
  );

  return sekarang >= waktuMasukObj;

  // Buat objek Date dengan tanggal saat ini, tapi gunakan jam, menit, dan detik dari waktuMasuk
}
