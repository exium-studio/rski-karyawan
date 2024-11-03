import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  HStack,
  Icon,
  StackProps,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiCloseCircleLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { getWeekOfMonth } from "date-fns";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { Interface__Jadwal } from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import useAuth from "../../global/useAuth";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";
import req from "../../lib/req";
import NotFound from "../independent/NotFound";
import Skeleton from "../independent/Skeleton";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import HorizontalScrollWrapperOnDrawer from "../independent/wrapper/HorizontalScrollWrapperOnDrawer";
import DrawerHeader from "./DrawerHeader";
import JadwalItem from "./JadwalItem";
import Retry from "./Retry";

const TukarButton = ({
  userId,
  jadwalDitukar,
}: {
  userId?: number;
  jadwalDitukar: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Interface__Jadwal | undefined>(
    undefined
  );

  const { error, notFound, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: `/api/get-jadwal/${jadwalDitukar?.id}/ditukar`,
    conditions: isOpen,
    dependencies: [isOpen, jadwalDitukar.id],
  });

  console.log(userId);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const toast = useToast();

  function onConfirm() {
    setLoadingSubmit(true);

    const payload = {
      // user_ditukar: userId,
      jadwal_id_penukar: selected?.id,
      jadwal_id_ditukar: jadwalDitukar?.id,
    };

    req
      .post(`/api/change-schedule`, payload)
      .then((r) => {
        if (r.status === 200) {
          // setRt(!rt);
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
        setLoadingSubmit(false);
      });

    // console.log(payload);
  }

  return (
    <>
      <Button
        colorScheme="ap"
        className="clicky"
        variant={"ghost"}
        onClick={onOpen}
        leftIcon={
          <Icon
            as={RiArrowUpDownLine}
            fontSize={iconSize}
            transform="scaleX(-1)"
          />
        }
        size={"sm"}
        position={"absolute"}
        bottom={3}
        right={3}
      >
        Tukar
      </Button>

      <CustomDrawer
        id="tukar-jadwal-pilih-jadwal-anda"
        name={jadwalDitukar.id.toString()}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title="Tukar Jadwal" />}
        footer={
          <>
            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              w={"100%"}
              isDisabled={!!!selected}
              onClick={onConfirm}
              isLoading={loadingSubmit}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        <Alert
          status="warning"
          alignItems={"start"}
          borderRadius={"0 !important"}
          px={"24px !important"}
        >
          <AlertIcon />
          <AlertDescription>
            Lakukan tindakan ini dengan cermat, karena pengajuan tukar jadwal
            tidak dapat dibatalkan setelah dikirim.
          </AlertDescription>
        </Alert>

        {/* Jadwal Ditukar */}
        <CContainer
          py={5}
          px={6}
          // borderTop={"6px solid var(--divider)"}
        >
          <Text fontWeight={600} mb={4}>
            Jadwal Ditukar
          </Text>

          <HStack
            scrollSnapAlign={"center"}
            borderRadius={8}
            border={"1px solid var(--divider3)"}
            align={"stretch"}
            overflow={"clip"}
            mb={"1px"}
            cursor={"pointer"}
            className="clicky"
            minH={"110px"}
            w={"100%"}
            // minW={`calc(100vw - 48px)`}
            _active={{ opacity: 0.6 }}
            mr={3}
            gap={0}
          >
            <VStack
              // w={"80px"}
              bg={"var(--divider)"}
              justify={"center"}
              px={2}
            >
              <Icon as={RiArrowDownLine} fontSize={32} color={"p.500"} />
            </VStack>

            <JadwalItem
              as={HStack}
              data={jadwalDitukar}
              noArrow
              noAvatars
              className=""
              _active={{ opacity: 1 }}
              flex={1}
            />
          </HStack>
        </CContainer>

        {/* Pilih Jadwal Anda */}
        <CContainer pt={5} borderTop={"6px solid var(--divider)"}>
          <Text fontWeight={600} mb={4} px={6}>
            Pilih Jadwal Anda untuk Ditukar
          </Text>

          <HorizontalScrollWrapperOnDrawer
            flexShrink={0}
            scrollSnapType={"x mandatory"}
          >
            <HStack gap={4} px={6} minW={"100%"} w={"max-content"}>
              {loading && (
                <>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} h={"110px"} minW={"304px"} w={"100%"} />
                  ))}
                </>
              )}

              {!loading && (
                <>
                  {error && (
                    <>
                      {notFound && <NotFound minH={"110px"} />}

                      {!notFound && (
                        <Center minH={"110px"}>
                          <Retry
                            loading={loading}
                            retry={retry}
                            minH={"110px"}
                          />
                        </Center>
                      )}
                    </>
                  )}

                  {!error && (
                    <>
                      {data && data?.length === 0 && (
                        <HStack
                          borderRadius={8}
                          border={"1px solid var(--divider3)"}
                          align={"stretch"}
                          overflow={"clip"}
                          mb={"1px"}
                          cursor={"pointer"}
                          className="clicky"
                          minH={"110px"}
                          w={"100%"}
                          maxW={"calc(100% - 30px)"}
                          // minW={`calc(100vw - 48px)`}
                          _active={{ opacity: 0.6 }}
                          gap={0}
                        >
                          <VStack
                            // w={"80px"}
                            bg={"var(--divider)"}
                            justify={"center"}
                            px={2}
                          >
                            <Icon as={RiCloseCircleLine} fontSize={32} />
                          </VStack>

                          <CContainer flex={1} p={4} justify={"center"}>
                            <Text flexShrink={1}>
                              Jadwal valid untuk ditukar tidak ditemukan
                            </Text>
                          </CContainer>
                        </HStack>
                      )}

                      {data &&
                        data?.length > 0 &&
                        data.map((jadwal: any, i: number) => {
                          return (
                            <HStack
                              key={i}
                              scrollSnapAlign={"center"}
                              borderRadius={8}
                              border={"1px solid var(--divider3)"}
                              borderLeft={
                                selected?.id === jadwal.id
                                  ? "4px solid var(--p500)"
                                  : "1px solid var(--divider3)"
                              }
                              align={"stretch"}
                              overflow={"clip"}
                              mb={"1px"}
                              cursor={"pointer"}
                              className="clicky"
                              minH={"110px"}
                              // w={"calc(100vw - 48px)"}
                              w={"100%"}
                              _active={{ opacity: 0.6 }}
                              // mr={3}
                              gap={0}
                              onClick={() => {
                                setSelected(jadwal);
                              }}
                            >
                              <JadwalItem
                                as={HStack}
                                data={jadwal}
                                noArrow
                                noAvatars
                                className=""
                                _active={{ opacity: 1 }}
                                flex={"1 1 0 !important"}
                                // border={"1px solid red"}
                              />

                              <VStack
                                flexShrink={0}
                                // w={"80px"}
                                px={2}
                                bg={"var(--divider)"}
                                justify={"center"}
                              >
                                <Icon
                                  as={RiArrowUpLine}
                                  fontSize={32}
                                  color={
                                    selected?.id === jadwal.id ? "p.500" : ""
                                  }
                                  opacity={selected?.id === jadwal.id ? 1 : 0.4}
                                />
                                {/* <VStack
                            gap={0}
                            opacity={selected?.id === jadwal.id ? 1 : 0.4}
                          >
                            <Text
                              fontWeight={600}
                              fontSize={12}
                              maxW={"80px"}
                              textAlign={"center"}
                            >
                              Jadwal
                            </Text>
                            <Text
                              fontWeight={600}
                              fontSize={12}
                              maxW={"80px"}
                              textAlign={"center"}
                            >
                              Anda
                            </Text>
                          </VStack> */}
                              </VStack>
                            </HStack>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </HStack>
          </HorizontalScrollWrapperOnDrawer>

          {data?.length > 0 && (
            <CContainer px={6}>
              <Text textAlign={"center"} opacity={0.4} fontSize={12} mt={2}>
                Pilih jadwal yang ingin Anda tukar (geser ke samping)
              </Text>
            </CContainer>
          )}
        </CContainer>

        {/* Jadwal yang Ditukar */}
        {/* <CContainer pt={5} borderTop={"6px solid var(--divider)"}>
          <Text px={6} fontWeight={600}>
            Penukaran Jadwal{" "}
            <span style={{ opacity: 0.3, fontSize: 12, fontWeight: 400 }}>
              ( jadwal anda di kanan )
            </span>
          </Text>

          <CContainer>
            {mySchedules &&
              mySchedules.map((jadwal, i) => {
                return (
                  i < 2 && (
                    <HStack
                      px={6}
                      key={i}
                      py={4}
                      borderBottom={i < 1 ? "2px dashed var(--divider)" : ""}
                    >
                      <JadwalDitukarItem
                        data={jadwalDitukar}
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
                        <Icon
                          as={RiUserLine}
                          color={"p.500"}
                          position={"absolute"}
                          top={0}
                          right={0}
                        />
                        <JadwalDitukarItem
                          data={jadwal}
                          noArrow
                          className=""
                          _active={{ opacity: 1 }}
                          cursor={"auto"}
                        />
                      </CContainer>
                    </HStack>
                  )
                );
              })}
          </CContainer>
        </CContainer> */}
      </CustomDrawer>
    </>
  );
};

interface Props extends StackProps {
  userId?: number;
  data: any;
  forwardRef?: any;
  noAvatars?: boolean;
  detailOnly?: boolean;
}

export default function JadwalKaryawanItem({
  userId,
  data,
  forwardRef,
  noAvatars,
  detailOnly,
  ...props
}: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { jenisKaryawan } = useAuth();

  return (
    <HStack
      ref={forwardRef || null}
      gap={8}
      py={4}
      px={5}
      borderRadius={12}
      bg={lightDarkColor}
      transition={"200ms"}
      cursor={data.tgl_mulai ? "pointer" : ""}
      _active={{ opacity: 0.6 }}
      className="clicky"
      position={"relative"}
      {...props}
    >
      <CContainer gap={2}>
        <Text fontSize={12} opacity={0.4}>{`${
          data.shift?.nama || "Libur"
        } - Minggu ${getWeekOfMonth(data.tgl_mulai)}`}</Text>

        <Text fontWeight={600} opacity={data.shift?.jam_from ? 1 : 0.6}>
          {formatDate(data.tgl_mulai, "long")}
        </Text>

        {data?.shift?.jam_from && data?.shift?.jam_to && (
          <HStack gap={3}>
            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--p500a4)"}>
                <Icon as={RiLoginBoxLine} fontSize={12} color={"p.500"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_from)}</Text>
            </HStack>

            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--reda)"}>
                <Icon as={RiLogoutBoxLine} fontSize={12} color={"red.400"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_to)}</Text>
            </HStack>
          </HStack>
        )}
      </CContainer>

      {!detailOnly && (
        <>
          {jenisKaryawan === 1 && (
            <TukarButton userId={userId} jadwalDitukar={data} />
          )}
        </>
      )}
    </HStack>
  );
}
