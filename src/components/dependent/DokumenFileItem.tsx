import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  RiDeleteBinLine,
  RiDownload2Line,
  RiMore2Fill,
  RiVerifiedBadgeFill,
} from "@remixicon/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useErrorColor, useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useRenderTrigger from "../../global/useRenderTrigger";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import formatBytes from "../../lib/formatBytes";
import formatDate from "../../lib/formatDate";
import req from "../../lib/req";
import RequiredForm from "../form/RequiredForm";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DisclosureHeader from "./DisclosureHeader";
import DrawerHeader from "./DrawerHeader";
import FileTypeIcon from "./FileTypeIcon";
import FileViewer from "./FileViewer";
import StringInput from "./input/StringInput";

const DeleteConfirmation = ({ data }: any) => {
  // SX
  const errorColor = useErrorColor();

  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Utils
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { rt, setRt } = useRenderTrigger();
  function onDelete() {
    setLoading(true);
    const url = `/api/delete-berkas`;
    const payload = {
      berkas_id: data?.id,
    };
    req
      .post(url, payload)
      .then((r) => {
        if (r.status === 200) {
          setRt(!rt);
          backOnClose();
          toast({
            status: "success",
            title: r?.data?.message,
            position: "bottom-right",
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
      <MenuItem onClick={onOpen}>
        <HStack w={"100%"} justify={"space-between"} color={errorColor}>
          <Text fontWeight={500}>Delete</Text>
          <Icon as={RiDeleteBinLine} fontSize={iconSize} />
        </HStack>
      </MenuItem>

      <CustomDrawer
        id={`delete-berkas-confirmation-${data?.id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DisclosureHeader title="Delete Berkas" />}
        footer={
          <CContainer gap={2}>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={backOnClose}
              isDisabled={loading}
            >
              Tidak
            </Button>
            <Button
              w={"100%"}
              colorScheme="red"
              className="clicky"
              onClick={onDelete}
              isLoading={loading}
            >
              Ya
            </Button>
          </CContainer>
        }
      >
        <CContainer px={6}>
          <Text>
            Apakah anda yakin akan menghapus berkas ini <b>{data?.label}</b>?
          </Text>
        </CContainer>
      </CustomDrawer>
    </>
  );
};

interface Props {
  data: any;
  noOptions?: boolean;
  title?: string;
}

const MoreOptions = ({ data }: Props) => {
  // Children
  const RenameDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const { rt, setRt } = useRenderTrigger();

    const formik = useFormik({
      validateOnChange: false,
      initialValues: { nama: data.label },
      validationSchema: yup
        .object()
        .shape({ nama: yup.string().required("Harus diisi") }),
      onSubmit: (values, { resetForm }) => {
        setLoading(true);

        const payload = {
          file_id: data.id,
          nama: values.nama,
        };

        req
          .post(`/api/rename-berkas-karyawan`, payload)
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
      },
    });

    return (
      <>
        <MenuItem onClick={onOpen}>
          <HStack w={"100%"} justify={"space-between"}>
            <Text fontWeight={500}>Rename</Text>
          </HStack>
        </MenuItem>

        <CustomDrawer
          id={`rename-drawer-${data.id}`}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          header={<DrawerHeader title="Rename" />}
          footer={
            <>
              <Button
                className="btn-ap clicky"
                colorScheme="ap"
                type="submit"
                form="renameForm"
                isLoading={loading}
              >
                Simpan
              </Button>
            </>
          }
        >
          <CContainer px={6}>
            <form id="renameForm" onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={!!formik.errors.nama}>
                <FormLabel>
                  Nama File
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="nama"
                  placeholder="File Berharga"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("nama", input);
                  }}
                  inputValue={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </CContainer>
        </CustomDrawer>
      </>
    );
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="more options"
        icon={<Icon as={RiMore2Fill} />}
        borderRadius={"full"}
        size={"sm"}
        className="btn-clear"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></MenuButton>

      <Portal>
        <MenuList
          minW={"150px"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <RenameDrawer />

          <MenuItem as={Link} to={data?.path} target="_blank">
            <HStack w={"100%"} justify={"space-between"}>
              <Text fontWeight={500}>Download</Text>
              <Icon as={RiDownload2Line} fontSize={iconSize} />
            </HStack>
          </MenuItem>

          <MenuDivider />

          <DeleteConfirmation data={data} />
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default function DokumenFileItem({
  data,
  noOptions = false,
  title,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  useBackOnClose(`file-viewer-${data?.path}`, isOpen, onOpen, onClose);

  // const dataType = data.path.split(".").pop().toLowerCase();
  const dataType = data?.ext;

  const statusColor =
    data?.status_berkas?.id === 1
      ? "yellow.400"
      : data?.status_berkas?.id === 2
      ? "green.400"
      : "red.400";

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CContainer
        flex={0}
        bg={lightDarkColor}
        borderRadius={12}
        onClick={onOpen}
        cursor={"pointer"}
        position={"relative"}
        overflow={"clip"}
      >
        <HStack justify={"space-between"} pl={3} pr={0} py={1}>
          <HStack h={"32px"}>
            <Icon
              as={RiVerifiedBadgeFill}
              color={statusColor}
              fontSize={iconSize}
            />
            <Text fontSize={12} fontWeight={500} noOfLines={1}>
              {title || data?.label || data?.nama}
            </Text>
          </HStack>

          {!noOptions && <MoreOptions data={data} />}
        </HStack>

        <CContainer align={"center"} py={2} px={4} gap={1}>
          <FileTypeIcon type={dataType} fontSize={52} mb={2} />
        </CContainer>

        <HStack opacity={0.4} p={2} justify={"space-between"}>
          <Text fontSize={11} opacity={0.4}>
            {formatBytes(data?.size.split(" ")[0])}
          </Text>
          <Tooltip
            label={`Diunggah pada ${formatDate(data.tgl_upload)}`}
            openDelay={500}
          >
            <Text fontSize={11}>{formatDate(data.tgl_upload, "short")}</Text>
          </Tooltip>
        </HStack>
      </CContainer>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        size={"full"}
        allowPinchZoom
      >
        <ModalOverlay />
        <ModalContent m={0} border={"none"}>
          <ModalHeader ref={initialRef}>
            <HStack justify={"space-between"}>
              <DisclosureHeader title="Pratinjau" />
            </HStack>
          </ModalHeader>

          <ModalBody>
            <Text mb={4} textAlign={"center"} opacity={0.4}>
              {title || data?.label || data?.nama}
            </Text>
            <CContainer my={"auto"} flex={1} justify={"center"}>
              <FileViewer fileUrl={data?.path} fileType={dataType} />
            </CContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              as={Link}
              to={data?.path}
              target="_blank"
              w={"100%"}
              colorScheme="ap"
              variant={"ghost"}
              leftIcon={<Icon as={RiDownload2Line} fontSize={iconSize} />}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
