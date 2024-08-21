import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiDeleteBinLine } from "@remixicon/react";
import { Interface__InputDataKeluarga } from "../../constant/interfaces";
import backOnClose from "../../lib/backOnClose";
import BackOnCloseButton from "../independent/BackOnCloseButton";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import { iconSize } from "../../constant/sizes";

interface Props {
  index: number;
  data: Interface__InputDataKeluarga;
  onDelete: (index: number) => void;
}

export default function DeleteAnggotaKeluarga({
  index,
  data,
  onDelete,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="edit anggota keluarga"
        icon={<Icon as={RiDeleteBinLine} fontSize={iconSize} />}
        size={"sm"}
        className="clicky"
        colorScheme="red"
        variant={"ghost"}
        onClick={onOpen}
      />

      <CustomDrawer
        id="delete-anggota-keluarga-confirmation"
        name="delete"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Box pt={"18px"} pr={5} pb={5} pl={6}>
          <HStack justify={"space-between"}>
            <Text fontSize={16} fontWeight={600}>
              Delete Data Keluarga
            </Text>
            <BackOnCloseButton aria-label="back on close button" />
          </HStack>
        </Box>

        <Box px={6} overflowY={"auto"} className="scrollY">
          <Text>
            Apakah anda yakin akan menghapus data anggota keluarga ini{" "}
            <b>{data.nama}</b>?
          </Text>
        </Box>

        <VStack p={6} pb={8}>
          <Button onClick={backOnClose} w={"100%"} className="btn-solid clicky">
            Tidak
          </Button>
          <Button
            w={"100%"}
            className="clicky"
            colorScheme="red"
            onClick={() => {
              backOnClose();
              onDelete(index);
            }}
          >
            Ya
          </Button>
        </VStack>
      </CustomDrawer>
    </>
  );
}
