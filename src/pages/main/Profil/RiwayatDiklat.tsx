import { Box, HStack, Text } from "@chakra-ui/react";
import Header from "../../../components/dependent/Header";
import Retry from "../../../components/dependent/Retry";
import StatusApprovalBadge from "../../../components/dependent/StatusApprovalBadge";
import NoData from "../../../components/independent/NoData";
import Skeleton from "../../../components/independent/Skeleton";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useContentBgColor, useLightDarkColor } from "../../../constant/colors";
import useDataState from "../../../hooks/useDataState";
import formatDate from "../../../lib/formatDate";

export default function RiwayatDiklat() {
  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-riwayat-perubahan`,
    dependencies: [],
  });

  // SX
  const contentBgColor = useContentBgColor();
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer flex={1}>
      <Header
        left={"back"}
        title="Riwayat Diklat"
        px={4}
        borderBottom={"1px solid var(--divider2)"}
      />

      <CContainer bg={contentBgColor} p={5} gap={3} flex={1}>
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
                    <CContainer
                      key={i}
                      cursor={"pointer"}
                      className="clicky"
                      flex={0}
                      bg={lightDarkColor}
                      p={4}
                      gap={3}
                      // onClick={onOpen}
                      borderRadius={12}
                    >
                      <HStack justify={"space-between"} align={"start"}>
                        <CContainer gap={1}>
                          <Text opacity={0.4} fontSize={12}>
                            Nama Diklat
                          </Text>
                          <Text fontWeight={500}>Tes</Text>
                        </CContainer>

                        <StatusApprovalBadge data={data.status_perubahan_id} />
                      </HStack>

                      <CContainer gap={1}>
                        <Text opacity={0.4} fontSize={12}>
                          Tanggal
                        </Text>
                        <Text fontWeight={500}>
                          {formatDate(data.created_at)}
                        </Text>
                      </CContainer>

                      <CContainer gap={1}>
                        <Text opacity={0.4} fontSize={12}>
                          Durasi
                        </Text>
                        <Text fontWeight={500}>
                          {formatDate(data.tgl_disetujui)}
                        </Text>
                      </CContainer>
                    </CContainer>
                  ))}
              </>
            )}
          </>
        )}
      </CContainer>
    </CContainer>
  );
}
