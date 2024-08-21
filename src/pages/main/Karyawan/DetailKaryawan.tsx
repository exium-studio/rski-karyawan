import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../../components/dependent/Header";
import KaryawanItem from "../../../components/dependent/KaryawanItem";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { Interface__Karyawan } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useScrollToTop from "../../../hooks/useScrollToTop";
import backOnClose from "../../../lib/backOnClose";
import getUserData from "../../../lib/getUserData";

interface Props extends StackProps {
  karyawan: Interface__Karyawan;
  listKaryawan: Interface__Karyawan[];
  index: number;
}

export default function DetailKaryawan({
  karyawan,
  listKaryawan,
  index,
}: Props) {
  useScrollToTop();
  const user = getUserData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-jadwal-${karyawan.id}`, isOpen, onOpen, onClose);

  const [activeJadwal, setActiveJadwal] =
    useState<Interface__Karyawan>(karyawan);
  useEffect(() => {
    if (isOpen) {
      if (karyawan) {
        setActiveJadwal(karyawan);
      }
    }
  }, [karyawan, index, isOpen]);

  // SX

  return (
    <>
      <KaryawanItem data={karyawan} onClick={onOpen} />

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        scrollBehavior="inside"
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader>
            <ModalHeader>
              <Header
                left={"back"}
                title="Detail Karyawan"
                borderBottom={"1px solid var(--divider2)"}
              />
            </ModalHeader>
          </ModalHeader>
          <ModalBody>
            <CContainer>
              {/* <VStack
                gap={0}
                align={"stretch"}
                bg={contentBgColor}
                flex={1}
                py={6}
              >
                {error && (
                  <Box my={"auto"}>
                    <Retry loading={loading} retry={retry} />
                  </Box>
                )}

                {!error && (
                  <>
                    <Box
                      ref={containerRef}
                      w={"100%"}
                      overflowX={"auto"}
                      className="noScroll"
                      scrollSnapType={"x mandatory"}
                    >
                      <HStack w={"max-content"} px={6} gap={3}>
                        {loading &&
                          Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} h={"80px"} w={"280px"} />
                          ))}

                        {!loading &&
                          data &&
                          data.length > 0 &&
                          data?.map((karyawan, i) => (
                            <Box
                              key={i}
                              ref={
                                karyawan.id === detailKaryawanId
                                  ? setActiveItemRef
                                  : null
                              }
                              onClick={() => {
                                setIsInit(false);
                                setDetailKaryawanId(karyawan.id);
                                setJadwalKaryawanList(karyawan.jadwals);
                              }}
                            >
                              <KaryawanItem
                                w={"280px"}
                                data={karyawan}
                                borderLeft={
                                  karyawan.id === detailKaryawanId
                                    ? "5px solid var(--p500)"
                                    : ""
                                }
                                scrollSnapAlign={"center"}
                                noArrowIcon
                              />
                            </Box>
                          ))}
                      </HStack>
                    </Box>

                    <Text fontWeight={600} px={6} mt={6} mb={4}>
                      Jadwal Karyawan Minggu Ini
                    </Text>

                    {loading && (
                      <CContainer gap={3} px={5}>
                        {Array.from({ length: 7 }).map((_, i) => (
                          <Skeleton key={i} h={"114px"} />
                        ))}
                      </CContainer>
                    )}

                    {!loading && data && (
                      <ListJadwalKaryawan data={jadwalKaryawanList} px={6} />
                    )}
                  </>
                )}
              </VStack> */}
            </CContainer>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
