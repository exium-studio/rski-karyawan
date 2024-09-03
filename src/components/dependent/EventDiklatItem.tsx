import {
  Button,
  HStack,
  Icon,
  Image,
  StackProps,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiCalendarLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__EventDiklat } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";
import timeSince from "../../lib/timeSince";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";
import DrawerHeader from "./DrawerHeader";
import backOnClose from "../../lib/backOnClose";
import req from "../../lib/req";
import useRenderTrigger from "../../global/useRenderTrigger";
import { useState } from "react";

const KonfirmasiBergabung = ({ data }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();

  function joinDiklat() {
    const payload = {
      diklat_id: data.id,
    };
    req
      .post(`/api/join-diklat`, payload)
      .then((r) => {
        if (r.status === 200) {
          setRt(!rt);
          backOnClose();
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          status: "error",
          title:
            (typeof e?.response?.data?.message === "string" &&
              (e?.response?.data?.message as string)) ||
            "Maaf terjadi kesalahan pada sistem",
          position: "bottom-right",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button w={"100%"} className="btn-ap clicky" colorScheme="ap">
        Bergabung
      </Button>

      <CustomDrawer
        id="konfirmasi-bergabung-diklat"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Konfirmasi Bergabung" />}
        footer={
          <>
            <Button
              className="btn-solid clicky"
              onClick={backOnClose}
              isDisabled={loading}
            >
              Tidak
            </Button>
            <Button
              className="btn-ap clicky"
              colorScheme="ap"
              onClick={joinDiklat}
              isLoading={loading}
            >
              Ya
            </Button>
          </>
        }
      >
        <Text>
          Apakah anda yakin akan bergabung dalam Diklat ini? <b>{data?.nama}</b>
        </Text>
      </CustomDrawer>
    </>
  );
};

interface Props extends StackProps {
  data: Interface__EventDiklat;
}

export default function EventDiklatItem({ data, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CContainer
        flex={0}
        borderRadius={12}
        overflow={"clip"}
        bg={lightDarkColor}
        cursor={"pointer"}
        className={"clicky"}
        onClick={onOpen}
        {...props}
      >
        <Image
          src={data.gambar || "/vectors/noImage.svg"}
          aspectRatio={16 / 10}
          objectFit={"cover"}
        />
        <CContainer p={4} gap={2}>
          <HStack justify={"space-between"}>
            <Text color={"p.500"} fontSize={12} fontWeight={500}>
              {data.jenis}
            </Text>

            <Text fontSize={12} opacity={0.4}>
              {timeSince(data.created_at)}
            </Text>
          </HStack>

          <Text fontWeight={600} noOfLines={2}>
            {data.nama}
          </Text>

          <HStack opacity={0.4}>
            <Icon as={RiCalendarLine} />
            <Text>{formatDate(data.created_at)}</Text>
          </HStack>
        </CContainer>
      </CContainer>

      <CustomDrawer
        id={`diklat-event-diklat-${data.id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Detail Event/Diklat" />}
        footer={
          <>
            <KonfirmasiBergabung data={data} />
          </>
        }
      >
        <Image
          src={data.gambar || "/vectors/noImage.svg"}
          aspectRatio={16 / 10}
          objectFit={"cover"}
          mb={4}
        />
        <CContainer px={6} gap={2}>
          <HStack justify={"space-between"}>
            <Text color={"p.500"} fontSize={12} fontWeight={500}>
              {data.jenis}
            </Text>

            <Text fontSize={12} opacity={0.4}>
              {timeSince(data.created_at)}
            </Text>
          </HStack>

          <Text fontWeight={600} noOfLines={2}>
            {data.nama}
          </Text>

          <HStack opacity={0.4} mb={4}>
            <Icon as={RiCalendarLine} />
            <Text>{formatDate(data.created_at)}</Text>
          </HStack>

          <Text>isi event/diklat</Text>

          <Text fontWeight={500}>Peserta</Text>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
