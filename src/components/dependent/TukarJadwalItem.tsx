import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiArrowUpDownLine } from "@remixicon/react";
import { useState } from "react";
import { useErrorAlphaColor, useLightDarkColor } from "../../constant/colors";
import useRenderTrigger from "../../global/useRenderTrigger";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import getUserData from "../../lib/getUserData";
import req from "../../lib/req";
import FlexLine from "../independent/FlexLine";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import DrawerHeader from "./DrawerHeader";
import JadwalDitukarItem from "./JadwalDitukarItem";
import StatusApproval2Badge from "./StatusApproval2Badge";
import BooleanConfirmationDrawerDisclosure from "./BooleanConfirmationDrawerDisclosure";
import StatusTukarJadwalApprovalKaryawanBadge from "./StatusTukarJadwalApprovalKaryawanBadge";

interface Props {
  data: any;
}

// const BatalkanTukarJadwal = ({ data }: Props) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   function batalkan() {
//     //TODO api batalkan penukaran jadawal
//   }

//   return (
//     <>
//       <Button
//         colorScheme="red"
//         variant={"outline"}
//         className="clicky"
//         w={"100%"}
//         onClick={onOpen}
//         isDisabled={data.status_penukaran !== null ? true : false}
//       >
//         Batalkan
//       </Button>

//       <CustomDrawer
//         id={`batalkan-tukar-jadwal-confirmation-${data.id}`}
//         name={`${data.id}`}
//         isOpen={isOpen}
//         onOpen={onOpen}
//         onClose={onClose}
//         header={
//           <Box pt={"18px"} pr={5} pb={5} pl={6}>
//             <HStack justify={"space-between"} align={"start"}>
//               <Text fontSize={20} fontWeight={500}>
//                 Batalkan Tukar Jadwal
//               </Text>

//               <BackOnCloseButton aria-label="back on close button" />
//             </HStack>
//           </Box>
//         }
//         footer={
//           <>
//             <Button
//               className="btn-solid clicky"
//               w={"100%"}
//               onClick={backOnClose}
//             >
//               Tidak
//             </Button>

//             <Button
//               colorScheme="red"
//               className="clicky"
//               w={"100%"}
//               onClick={batalkan}
//             >
//               Ya
//             </Button>
//           </>
//         }
//       >
//         <CContainer px={6}>
//           <Text>Apakah anda yakin akan membatalkan penukaran jadwal ini?</Text>
//         </CContainer>
//       </CustomDrawer>
//     </>
//   );
// };

export default function TukarJadwalItem({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SX
  const lightDarkColor = useLightDarkColor();
  const errorAlphaColor = useErrorAlphaColor();

  const userData = getUserData();
  const userPengajuan = userData.id !== data.user_ditukar.id;

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  function handleKonfirmasiTukar(acc: boolean) {
    setLoading(true);

    const payload = {
      tukar_jadwal_id: data?.id,
      is_acc: acc,
    };

    req
      .post(`/api/acc-swap`, payload)
      .then((r) => {
        if (r.status === 200) {
          setRt(!rt);
          backOnClose();
          toast({
            status: "success",
            title: r?.data?.message,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            (typeof e?.response?.data?.message === "string" &&
              (e?.response?.data?.message as string)) ||
            "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
          position: "top",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <CContainer
        p={4}
        borderRadius={12}
        bg={lightDarkColor}
        className="clicky"
        cursor={"pointer"}
        gap={3}
        onClick={onOpen}
      >
        <HStack justify={"space-between"} align={"start"}>
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Jenis Tukar Jadwal
            </Text>
            <Text fontWeight={500}>{data?.kategori_pengajuan?.label}</Text>
          </CContainer>

          {userPengajuan ? (
            <StatusApproval2Badge data={data?.status_pengajuan} />
          ) : (
            <StatusTukarJadwalApprovalKaryawanBadge
              data={data?.acc_user_ditukar}
            />
          )}
        </HStack>

        <CContainer gap={1}>
          <Text opacity={0.4} fontSize={12}>
            Tanggal Pengajuan
          </Text>
          <Text fontWeight={500}>
            {formatDate(data.created_at, "basicShort")}
          </Text>
        </CContainer>

        <SimpleGrid columns={2} gap={6}>
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              {userPengajuan ? "Karyawan Ditukar" : "Karyawan Pengajuan"}
            </Text>
            <Text fontWeight={500}>
              {userPengajuan
                ? data.user_ditukar.nama
                : data.user_pengajuan.nama}
            </Text>
          </CContainer>
          {/* 
          <CContainer gap={1}>
            <Text opacity={0.4} fontSize={12}>
              Disetujui oleh
            </Text>
            <Text fontWeight={500}>{"-"}</Text>
          </CContainer> */}
        </SimpleGrid>
      </CContainer>

      <CustomDrawer
        id="detail-data-tukar-jadwal"
        name={data.id.toString()}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Detail Tukar Jadwal" />}
      >
        <CContainer>
          <CContainer pb={0}>
            {/* Ditolak admin */}
            {data?.alasan && (
              <Alert
                status="error"
                bg={errorAlphaColor}
                alignItems={"start"}
                borderRadius={"0 !important"}
                px={"24px !important"}
              >
                <AlertIcon />
                <Box>
                  <AlertTitle fontWeight={600}>Tukar Jadwal Ditolak</AlertTitle>
                  <AlertDescription>{data?.alasan}</AlertDescription>
                </Box>
              </Alert>
            )}

            {/* Profil User Ditukar */}
            <CContainer
              bg={lightDarkColor}
              gap={3}
              flex={0}
              px={6}
              py={5}
              borderTop={data?.alasan ? "" : "6px solid var(--divider)"}
            >
              <Text fontWeight={500} mb={4}>
                {userPengajuan ? "Karyawan Ditukar" : "Karyawan Pengajuan"}
              </Text>

              <Avatar
                name={
                  userPengajuan
                    ? data?.user_ditukar?.nama
                    : data?.user_pengajuan?.nama
                }
                src={
                  userPengajuan
                    ? data?.user_ditukar?.foto_profil
                    : data?.user_pengajuan?.foto_profil
                }
                size={"xl"}
                mx={"auto"}
                w={"150px"}
                h={"150px"}
                mb={4}
              />

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Jenis Penukaran</Text>
                <FlexLine />
                <Text fontWeight={500}>{data?.kategori_pengajuan?.label}</Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Nama</Text>
                <FlexLine />
                <Text fontWeight={500}>
                  {userPengajuan
                    ? data.user_ditukar.nama
                    : data.user_pengajuan.nama}
                </Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Tanggal Pengajuan</Text>
                <FlexLine />
                <Text fontWeight={500}>{formatDate(data.created_at)}</Text>
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}> Status Penukaran</Text>
                <FlexLine />
                <StatusApproval2Badge data={data?.status_pengajuan} />
              </HStack>

              <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Disetujui Karyawan</Text>
                <FlexLine />
                <StatusTukarJadwalApprovalKaryawanBadge
                  data={data?.acc_user_ditukar}
                />
              </HStack>

              {/* <HStack gap={1} flex={0}>
                <Text opacity={0.4}>Disetujui oleh</Text>
                <FlexLine />
                <Text fontWeight={500}>-</Text>
              </HStack> */}
            </CContainer>

            {/* Jadwal yang Ditukar */}
            <CContainer pt={5} borderTop={"6px solid var(--divider)"}>
              <Text px={6} fontWeight={500} mb={4}>
                Penukaran Jadwal{" "}
                {/* <span style={{ opacity: 0.3, fontSize: 12, fontWeight: 400 }}>
                  ( jadwal anda di kanan )
                </span> */}
              </Text>

              <HStack w={"100%"} mb={4} px={6} overflow={"clip"}>
                <HStack w={"100%"} overflow={"hidden"}>
                  <AvatarAndNameTableData
                    data={{
                      id: data.user_pengajuan.id,
                      nama: data.user_pengajuan.nama,
                      foto_profil: data.user_pengajuan.foto_profil,
                    }}
                    w={"calc(50% - 50px)"}
                  />

                  <Icon
                    as={RiArrowUpDownLine}
                    transform={"rotate(90deg)"}
                    mx={5}
                    visibility={"hidden"}
                  />

                  <AvatarAndNameTableData
                    data={{
                      id: data.user_ditukar.id,
                      nama: data.user_ditukar.nama,
                      foto_profil: data.user_ditukar.foto_profil,
                    }}
                    w={"calc(50% - 50px)"}
                  />
                </HStack>
              </HStack>

              <CContainer>
                <HStack px={6}>
                  <JadwalDitukarItem
                    data={data.jadwal_pengajuan}
                    noArrow
                    className=""
                    _active={{ opacity: 1 }}
                    cursor={"auto"}
                    flex={1}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  />
                  <Icon
                    as={RiArrowUpDownLine}
                    transform={"rotate(90deg)"}
                    mx={5}
                  />
                  <CContainer
                    position={"relative"}
                    flex={1}
                    borderRadius={12}
                    // p={"14px"}
                    // border={"1px solid var(--divider2)"}
                    // bg={"var(--divider)"}
                  >
                    {/* <Icon
                      as={RiUserLine}
                      color={"p.500"}
                      position={"absolute"}
                      top={0}
                      right={0}
                    /> */}
                    <JadwalDitukarItem
                      data={data.jadwal_ditukar}
                      noArrow
                      className=""
                      _active={{ opacity: 1 }}
                      cursor={"auto"}
                    />
                  </CContainer>
                </HStack>

                {/* <Box h={"1px"} w={"100%"} bg={"var(--divider)"} my={4} /> */}
              </CContainer>
            </CContainer>
          </CContainer>

          {/* Footer */}
          <CContainer
            pb={8}
            gap={2}
            px={6}
            flex={0}
            pt={8}
            // borderTop={"6px solid var(--divider)"}
          >
            {!userPengajuan ? (
              <ButtonGroup>
                <BooleanConfirmationDrawerDisclosure
                  id={"konfirmasi-ditolak-tukar-jadwal"}
                  title="Konfirmasi Ditolak"
                  content={
                    <Text opacity={0.4}>
                      Apakah anda yakin akan menolak Tukar Jadwal ini?
                    </Text>
                  }
                  onConfirm={() => {
                    handleKonfirmasiTukar(false);
                  }}
                  boxProps={{ w: "100%" }}
                  loading={loading}
                >
                  <Button
                    w={"100%"}
                    colorScheme="red"
                    variant={"outline"}
                    className="clicky"
                    isLoading={loading}
                    isDisabled={[2, 3].includes(data?.acc_user_ditukar)}
                  >
                    Tolak
                  </Button>
                </BooleanConfirmationDrawerDisclosure>

                <BooleanConfirmationDrawerDisclosure
                  id={"konfirmasi-disetujui-tukar-jadwal"}
                  title="Konfirmasi Disetujui"
                  content={
                    <Text opacity={0.4}>
                      Apakah anda yakin akan menyetujui Tukar Jadwal ini?
                    </Text>
                  }
                  onConfirm={() => {
                    handleKonfirmasiTukar(true);
                  }}
                  boxProps={{ w: "100%" }}
                  loading={loading}
                >
                  <Button
                    w={"100%"}
                    colorScheme="green"
                    variant={"outline"}
                    className="clicky"
                    isLoading={loading}
                    isDisabled={[2, 3].includes(data?.acc_user_ditukar)}
                  >
                    Setujui
                  </Button>
                </BooleanConfirmationDrawerDisclosure>
              </ButtonGroup>
            ) : (
              <Button className="btn-solid clicky" onClick={backOnClose}>
                Mengerti
              </Button>
            )}
            {/* {data.user_ditukar.id !== 1 && <BatalkanTukarJadwal data={data} />} */}
            {/* <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button> */}
          </CContainer>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
