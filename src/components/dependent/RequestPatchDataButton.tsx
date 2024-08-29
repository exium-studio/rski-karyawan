import {
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  IconButtonProps,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiArrowUpCircleLine } from "@remixicon/react";
import { useState } from "react";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";
import CContainer from "../independent/wrapper/CContainer";
import dataLabels from "../../constant/dataLabels";
import req from "../../lib/req";
import backOnClose from "../../lib/backOnClose";

interface Props extends Omit<IconButtonProps, "aria-label"> {
  validator: () => void;
  column: string;
  payload: any;
}

export default function RequestPatchDataButton({
  validator,
  column,
  payload,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  function requestPatchData(column: string, payload: any) {
    setLoading(true);
    if (payload) {
      console.log(column, payload);
      const payloadDikirim = {
        kolom_diubah: column,
        value_diubah: payload,
      };

      req
        .post(`/api/update-data-personal`, payloadDikirim)
        .then((r) => {
          if (r.status === 200) {
            backOnClose();
            toast({
              status: "success",
              title: r.data.message,
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
              "Maaf terjadi kesalahan pada sistem",
            position: "top",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <IconButton
        isLoading={loading}
        borderRadius={"full"}
        aria-label={`Request update for ${column}`}
        icon={<Icon as={RiArrowUpCircleLine} fontSize={28} color={"p.500"} />}
        className="btn-solid clicky"
        onClick={onOpen}
        {...props}
      />

      <CustomDrawer
        id={`konfirmasi-request-${column}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Konfirmasi Ajukan Perubahan" />}
        footer={
          <CContainer gap={2}>
            <Button
              w={"100%"}
              className="btn-divider clicky"
              isDisabled={loading}
            >
              Tidak
            </Button>
            <Button
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
              onClick={async () => {
                validator();
                requestPatchData(column, payload);
              }}
              isLoading={loading}
            >
              Ya
            </Button>
          </CContainer>
        }
      >
        <CContainer px={6}>
          <Text opacity={0.4}>
            Apakah anda yakin akan mengajukan perubahan data ini?{" "}
            <b>
              {dataLabels[column]}
              {/* {column} */}
            </b>
          </Text>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
