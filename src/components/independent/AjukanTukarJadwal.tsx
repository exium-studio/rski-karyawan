import {
  Alert,
  Button,
  Icon,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import DrawerHeader from "../dependent/DrawerHeader";
import CContainer from "./wrapper/CContainer";
import CustomDrawer from "./wrapper/CustomDrawer";

export default function AjukanTukarJadwal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="ajukan cuti button"
        className="btn-ap clicky"
        colorScheme="ap"
        icon={<Icon as={RiAddLine} fontSize={28} />}
        position={"fixed"}
        right={5}
        bottom={8}
        size={"lg"}
        borderRadius={12}
        onClick={onOpen}
        zIndex={3}
      />

      <CustomDrawer
        id="ajukan-cuti-drawer"
        name="ajukan_cuti"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Ajukan Tukar Jadwal" />}
        footer={
          <>
            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              as={Link}
              to={"/karyawan"}
            >
              Lanjutkan
            </Button>
          </>
        }
      >
        <CContainer px={6}>
          <Alert status="info" borderRadius={"8px !important"}>
            <CContainer gap={2}>
              <Text fontWeight={600}>Peraturan Tukar Jadwal</Text>

              <UnorderedList>
                <ListItem>
                  <Text fontSize={14}>
                    <span style={{ fontWeight: 600 }}>Tukar jadwal shift</span>{" "}
                    hanya boleh dilakukan pada tanggal masuk yang sama.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <span style={{ fontWeight: 600 }}>Tukar libur</span> boleh
                    di tanggal berbeda dengan saling menukar jadwal shift pada
                    tanggal libur yang ditukar, jadi terdapat 2 pertukaran
                    jadwal.
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text mt={2} fontWeight={600}>
                Langkah-langkat tukar jadwal
              </Text>

              <UnorderedList>
                <ListItem>
                  <Text fontSize={14}>Pilih karyawan dari menu Karyawan.</Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Pilih jadwal karyawan yang ingin ditukar, lalu klik Tukar.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Pilih jadwal Anda yang valid untuk ditukar. Jika tidak ada
                    yang valid maka tidak bisa melakukan penukaran jadwal.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>Konfirmasi penukaran jadwal.</Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Pengajuan ini harus disetujui terlebih dahulu oleh karyawan
                    yang bersangkutan, kemudian oleh kepala ruang. Setelah itu,
                    status pengajuan akan berubah menjadi Disetujui.
                  </Text>
                </ListItem>
              </UnorderedList>
            </CContainer>
          </Alert>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
