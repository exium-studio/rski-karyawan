import {
  Button,
  Center,
  HStack,
  Icon,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiUserLine,
} from "@remixicon/react";
import { getWeekOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { dummyMySchedules } from "../../constant/dummy";
import { Interface__Jadwal } from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import formatDate from "../../lib/formatDate";
import formatTime from "../../lib/formatTime";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import HorizontalScrollWrapperOnDrawer from "../independent/wrapper/HorizontalScrollWrapperOnDrawer";
import DrawerHeader from "./DrawerHeader";
import JadwalDitukarItem from "./JadwalDitukarItem";
import JadwalItem from "./JadwalItem";

const TukarButton = ({ userId, data }: { userId?: number; data: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mySchedules] = useState<any[] | null>(dummyMySchedules);
  const [selected, setSelected] = useState<Interface__Jadwal | undefined>(
    (mySchedules && mySchedules[0]) || undefined
  );

  useEffect(() => {
    // console.log("Drawer Closed", jadwalDitukarRef);
    if (isOpen) {
      // TODO: post kirim id jadwal ditukar dan get jadwal kita yang available untuk ditukar,
      // entah shift entah libur, untuk shift kemungkinan cuman 1 karna tukar shift hanya bisa di tgl masuk yg sama
    }
  }, [isOpen]);

  function onConfirm() {
    const payload = {
      user_ditukar: userId,
      jadwal_ditukar: data,
      jadwal_pengajuan: selected,
    };
    console.log(payload);
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
        name={data.id.toString()}
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
              isDisabled={false}
              onClick={onConfirm}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        {/* Jadwal Ditukar */}
        <CContainer py={5} px={6} borderTop={"6px solid var(--divider)"}>
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
            minW={`calc(100vw - 48px)`}
            _active={{ opacity: 0.6 }}
            mr={3}
            gap={0}
          >
            <VStack w={"80px"} bg={"var(--divider)"} justify={"center"}>
              <VStack gap={0}>
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
                  Ditukar
                </Text>
              </VStack>
              <Icon as={RiArrowDownLine} fontSize={32} color={"p.500"} />
            </VStack>

            <JadwalItem
              as={HStack}
              data={data}
              noArrow
              noAvatars
              className=""
              _active={{ opacity: 1 }}
              flex={1}
            />
          </HStack>
        </CContainer>

        {/* Pilih Jadwal Anda */}
        <CContainer py={5} borderTop={"6px solid var(--divider)"}>
          <Text fontWeight={600} mb={4} px={6}>
            Pilih Jadwal Anda untuk Ditukar
          </Text>

          <HorizontalScrollWrapperOnDrawer
            flexShrink={0}
            scrollSnapType={"x mandatory"}
          >
            <HStack gap={0} px={6} w={"max-content"}>
              {mySchedules &&
                mySchedules.map((jadwal, i) => {
                  return (
                    i < 2 && (
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
                        minW={`calc(100vw - 48px)`}
                        _active={{ opacity: 0.6 }}
                        mr={3}
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
                          flex={1}
                        />

                        <VStack
                          w={"80px"}
                          bg={"var(--divider)"}
                          justify={"center"}
                        >
                          <Icon
                            as={RiArrowUpLine}
                            fontSize={32}
                            color={selected?.id === jadwal.id ? "p.500" : ""}
                            opacity={selected?.id === jadwal.id ? 1 : 0.4}
                          />
                          <VStack
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
                          </VStack>
                        </VStack>
                      </HStack>
                    )
                  );
                })}
            </HStack>
          </HorizontalScrollWrapperOnDrawer>

          {mySchedules && mySchedules.length > 1 && (
            <Text textAlign={"center"} opacity={0.4} fontSize={12} mt={2}>
              Geser untuk pilih jadwal anda
            </Text>
          )}
        </CContainer>

        {/* Jadwal yang Ditukar */}
        <CContainer pt={5} borderTop={"6px solid var(--divider)"}>
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
                        data={data}
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
        </CContainer>
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
          {formatDate(data.tgl_mulai)}
        </Text>

        {data?.shift?.jam_from && data?.shift?.jam_to && (
          <HStack gap={3}>
            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--p500a4)"}>
                <Icon as={RiLoginBoxLine} fontSize={10} color={"p.500"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_from)}</Text>
            </HStack>

            <HStack gap={1}>
              <Center p={1} borderRadius={"full"} bg={"var(--reda)"}>
                <Icon as={RiLogoutBoxLine} fontSize={10} color={"red.400"} />
              </Center>
              <Text fontSize={13}>{formatTime(data?.shift?.jam_to)}</Text>
            </HStack>
          </HStack>
        )}
      </CContainer>

      {!detailOnly && <TukarButton userId={userId} data={data} />}
    </HStack>
  );
}
