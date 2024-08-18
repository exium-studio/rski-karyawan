import { Box } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import RiwayatPerubahanDataItem from "../../../components/dependent/RiwayatPerubahanDataItem";
import NoData from "../../../components/independent/NoData";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";

export default function RiwayatPerubahanData() {
  const dummy = [
    {
      id: 1,
      kolom: "tgl_lahir",
      original_data: "2001-11-01",
      updated_data: "2001-11-05",
      status_perubahan: null,
      tgl_disetujui: "2024-07-11",
      created_at: "2024-07-10",
      updated_at: null,
    },
    {
      id: 2,
      kolom: "foto_profil",
      original_data: "/images/reza.jpg",
      updated_data: "/images/gear5.jpg",
      status_perubahan: false,
      tgl_disetujui: "2024-07-11",
      created_at: "2024-07-10",
      updated_at: null,
    },
    {
      id: 3,
      kolom: "tinggi_badan",
      original_data: 170,
      updated_data: 172,
      status_perubahan: true,
      tgl_disetujui: "2024-07-11",
      created_at: "2024-07-10",
      updated_at: null,
    },
    {
      id: 5,
      kolom: "agama",
      original_data: { id: 1, label: "Islam" },
      updated_data: { id: 2, label: "Kristen" },
      status_perubahan: true,
      tgl_disetujui: "2024-07-11",
      created_at: "2024-07-10",
      updated_at: null,
    },
    {
      id: 4,
      kolom: "ktp",
      original_data: "/images/gear5.jpg",
      updated_data: "/images/gear5.jpg",
      status_perubahan: true,
      tgl_disetujui: "2024-07-11",
      created_at: "2024-07-10",
      updated_at: null,
    },
  ];

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();

  return (
    <CContainer>
      <Header
        left={"back"}
        title="Riwayat Perubahan Data"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5} gap={3}>
        {error && (
          <Box my={"auto"}>
            <Retry loading={loading} retry={retry} />
          </Box>
        )}

        {!error && (
          <>
            {loading && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} h={"185px"} />
                ))}
              </>
            )}

            {!loading && (
              <>
                {(!data || (data && data.length === 0)) && (
                  <NoData label="Tidak ada riwayat" />
                )}

                {(data || (data && data.length > 0)) &&
                  data.map((riwayat: any, i: number) => (
                    <RiwayatPerubahanDataItem key={i} data={riwayat} />
                  ))}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
