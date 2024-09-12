import {
  Button,
  HStack,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import timeSince from "../../lib/timeSince";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DrawerHeader from "./DrawerHeader";

interface Props extends StackProps {
  data: any;
}

export default function PengumumanItem({ data, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SX
  const lightDarkColor = useLightDarkColor();

  // console.log(new Date(data.created_at));

  return (
    <>
      <CContainer
        cursor={"pointer"}
        className={"clicky"}
        gap={1}
        borderRadius={12}
        p={4}
        bg={lightDarkColor}
        onClick={onOpen}
        {...props}
      >
        <Text fontSize={16} fontWeight={550}>
          {data.judul}
        </Text>
        <Text noOfLines={props.noOfLines || 2}>{data.konten}</Text>
        <HStack mt={"auto"} pt={2} justify={"space-between"}>
          <Text fontSize={12} opacity={0.4}>
            {timeSince(data.created_at)}
          </Text>
          <Text fontSize={12} opacity={0.4}>
            berakhir {formatDate(data.tgl_berakhir)}
          </Text>
        </HStack>
      </CContainer>

      <CustomDrawer
        id={`pengumuman-detail-${data.id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Detail Pengumuman" />}
        footer={
          <>
            <Button className="btn-solid clicky" onClick={backOnClose}>
              Mengerti
            </Button>
          </>
        }
      >
        <CContainer px={6} gap={1}>
          <Text fontWeight={550} fontSize={16}>
            {data.judul}
          </Text>
          <Text>{data.konten}</Text>

          <HStack mt={"auto"} pt={2} justify={"space-between"}>
            <Text fontSize={12} opacity={0.4}>
              {timeSince(data.created_at)}
            </Text>
            <Text fontSize={12} opacity={0.4}>
              berakhir {formatDate(data.tgl_berakhir)}
            </Text>
          </HStack>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
