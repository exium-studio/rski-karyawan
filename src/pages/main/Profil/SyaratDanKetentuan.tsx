import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";

export default function SyaratDanKetentuan() {
  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header
        left={"back"}
        title="Syarat dan Ketentuan"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5}>
        <Text fontWeight={600} fontSize={18} mb={4}>
          Syarat dan Ketentuan Penggunaan Aplikasi
        </Text>

        <OrderedList fontWeight={600}>
          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Penerimaan Syarat
              </Text>
              <Text fontWeight={400}>
                Dengan mengunduh, mengakses, dan menggunakan aplikasi ini, Anda
                setuju untuk mematuhi syarat dan ketentuan yang ditetapkan di
                bawah ini. Jika Anda tidak setuju dengan syarat dan ketentuan
                ini, harap jangan menggunakan aplikasi ini.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Perubahan Syarat dan Ketentuan
              </Text>
              <Text fontWeight={400}>
                Kami berhak untuk mengubah atau memperbarui syarat dan ketentuan
                ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan
                aplikasi yang terus-menerus setelah perubahan berarti Anda
                menerima perubahan tersebut.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Penggunaan Aplikasi
              </Text>
              <Text fontWeight={400}>
                Anda setuju untuk menggunakan aplikasi ini hanya untuk tujuan
                yang sah dan sesuai dengan semua undang-undang dan peraturan
                yang berlaku. Anda tidak boleh menggunakan aplikasi ini untuk
                melakukan tindakan yang melanggar hukum, menipu, atau merusak.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Perubahan Syarat dan Ketentuan
              </Text>
              <Text fontWeight={400}>
                Kami berhak untuk mengubah atau memperbarui syarat dan ketentuan
                ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan
                aplikasi yang terus-menerus setelah perubahan berarti Anda
                menerima perubahan tersebut.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Privasi
              </Text>
              <Text fontWeight={400}>
                Kami menghargai privasi Anda dan berkomitmen untuk melindungi
                informasi pribadi Anda. Harap tinjau Kebijakan Privasi kami
                untuk informasi lebih lanjut tentang bagaimana kami
                mengumpulkan, menggunakan, dan melindungi data pribadi Anda.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Konten Pengguna
              </Text>
              <Text fontWeight={400}>
                Anda dapat mengunggah, menyimpan, dan berbagi konten melalui
                aplikasi ini. Dengan melakukannya, Anda memberikan kami lisensi
                non-eksklusif, bebas royalti, untuk menggunakan, menampilkan,
                dan mendistribusikan konten tersebut sehubungan dengan
                pengoperasian aplikasi. Anda bertanggung jawab atas konten yang
                Anda unggah dan memastikan bahwa itu tidak melanggar hak pihak
                ketiga.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Pembaruan dan Pemeliharaan
              </Text>
              <Text fontWeight={400}>
                Kami berhak untuk memperbarui, mengubah, atau menghentikan
                aplikasi ini atau bagian dari aplikasi ini kapan saja dengan
                atau tanpa pemberitahuan sebelumnya. Kami tidak bertanggung
                jawab atas kerugian atau kerusakan yang mungkin timbul dari
                pembaruan, perubahan, atau penghentian tersebut.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Pembatasan Tanggung Jawab
              </Text>
              <Text fontWeight={400}>
                Aplikasi ini disediakan "sebagaimana adanya" tanpa jaminan
                apapun. Kami tidak bertanggung jawab atas kerugian atau
                kerusakan yang timbul dari penggunaan atau ketidakmampuan untuk
                menggunakan aplikasi ini, termasuk kehilangan data atau
                keuntungan.
              </Text>
            </Box>
          </ListItem>

          <ListItem mb={4}>
            <Box>
              <Text fontWeight={600} mb={2} fontSize={16}>
                Hukum yang Berlaku
              </Text>
              <Text fontWeight={400}>
                Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan
                hukum yang berlaku di negara tempat perusahaan kami berada.
                Setiap sengketa yang timbul dari atau terkait dengan syarat dan
                ketentuan ini akan diselesaikan di pengadilan yang berwenang di
                yurisdiksi tersebut.
              </Text>
            </Box>
          </ListItem>
        </OrderedList>
      </CContainer>
    </CContainer>
  );
}
