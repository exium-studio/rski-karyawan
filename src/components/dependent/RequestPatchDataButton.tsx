import {
  Button,
  Icon,
  IconButton,
  IconButtonProps,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiArrowUpCircleLine } from "@remixicon/react";
import { useState } from "react";
import dataLabels from "../../constant/dataLabels";
import backOnClose from "../../lib/backOnClose";
import req from "../../lib/req";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";

interface Props extends Omit<IconButtonProps, "aria-label"> {
  validator: () => void;
  column: string;
  payload: any;
  url?: string;
}

export default function RequestPatchDataButton({
  validator,
  column,
  payload,
  url = `/api/update-data-personal`,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  function requestPatchData(column: string, payload: any) {
    setLoading(true);
    if (payload) {
      // console.log(column, payload);
      const payloadDikirim = {
        kolom_diubah: column,
        value_diubah: payload,
      };
      req
        .post(url, payloadDikirim)
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
              "Terjadi kendala, silahkan periksa jaringan atau hubungi SIM RS",
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
    // console.log(JSON.stringify(payload));
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
              className="btn-solid divider clicky"
              isDisabled={loading}
              onClick={backOnClose}
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
