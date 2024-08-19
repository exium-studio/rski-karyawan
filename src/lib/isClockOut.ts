export default function isClockOut(waktuKeluar: string): boolean {
  const [jam, menit, detik] = waktuKeluar.split(":").map(Number);

  // Buat objek Date dengan tanggal saat ini, tapi gunakan jam, menit, dan detik dari waktuKeluar
  const sekarang = new Date();
  const waktuKeluarObj = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth(),
    sekarang.getDate(),
    jam,
    menit,
    detik
  );

  return sekarang.getTime() > waktuKeluarObj.getTime();
}
