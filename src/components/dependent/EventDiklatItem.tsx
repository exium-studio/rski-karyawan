import {
  Button,
  HStack,
  Icon,
  Image,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiCalendarLine } from "@remixicon/react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__EventDiklat } from "../../constant/interfaces";
import formatDate from "../../lib/formatDate";
import timeSince from "../../lib/timeSince";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DrawerHeader from "./DrawerHeader";
import backOnClose from "../../lib/backOnClose";

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
            <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button>
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
