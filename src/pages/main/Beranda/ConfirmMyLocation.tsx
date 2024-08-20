import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertOutsidePresenceRadius from "../../../components/dependent/AlertOutsidePresenceRadius";
import LeafletMap from "../../../components/dependent/LeafletMap";
import ComponentSpinner from "../../../components/independent/ComponentSpinner";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../../../constant/colors";
import { Interface__AttendanceData } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import calculateDistance from "../../../lib/calculateDistance";
import formatNumber from "../../../lib/formatNumber";
import getCurrentAddress from "../../../lib/getCurrentAddress";
import getLocation from "../../../lib/getLocation";
import isWithinRadius from "../../../lib/isWithinRadius";
import AmbilFoto from "./AmbilFoto";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  attendanceData: Interface__AttendanceData;
}
export default function ConfirmMyLocation({
  isOpen,
  onOpen,
  onClose,
  data,
  attendanceData,
}: Props) {
  useBackOnClose("confirm-my-location-full-modal", isOpen, onOpen, onClose);

  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [outsideRadius, setOutsideRadius] = useState<boolean>(false);
  const [alertOutsideRadius, setAlertOutsideRadius] = useState<boolean>(false);

  const [myLocation, setMyLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      getLocation()
        .then((myLocation) => {
          setMyLocation(myLocation);
          getCurrentAddress(myLocation.lat, myLocation.long)
            .then((address) => {
              setAddress(address);
              if (
                myLocation &&
                data &&
                isWithinRadius(
                  myLocation.lat,
                  myLocation.long,
                  data.office_lat,
                  data.office_long,
                  data.radius
                )
              ) {
              } else {
                if (myLocation) {
                  setOutsideRadius(true);
                  setAlertOutsideRadius(true);
                  toast({
                    status: "error",
                    title: "Location Info (Debug)",
                    description: `myLat: ${myLocation.lat}, myLong:${
                      myLocation.long
                    }, officeLat: ${data.office_lat}, officeLong: ${
                      data.office_long
                    }, myDistance: ${formatNumber(
                      calculateDistance(
                        myLocation.lat,
                        myLocation.long,
                        data.office_lat,
                        data.office_long
                      )
                    )} meter, preferredDistance: ${data.radius} meter`,
                    duration: 10000,
                    isClosable: true,
                  });
                }
              }
            })
            .catch((error) => {
              setAddress("Error, silahkan refresh");
              console.error(error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Gagal mendapatkan lokasi:", error);
          setLoading(false);
        });
    }
  }, [isOpen, data, toast]);

  // SX
  const bodyColor = useLightDarkColor();

  return (
    <>
      <AlertOutsidePresenceRadius
        isOpen={alertOutsideRadius}
        onOpen={() => {
          setAlertOutsideRadius(true);
        }}
        onClose={() => {
          setAlertOutsideRadius(false);
        }}
      />

      <Modal isOpen={isOpen} onClose={backOnClose} size={"full"}>
        <ModalContent m={0} border={"none"}>
          <ModalBody>
            <CContainer flex={1}>
              {!loading && !myLocation && (
                <VStack justify={"center"} p={6} flex={1}>
                  <Text mb={4}>Error, silahkan kembali dan coba lagi</Text>
                  <Button
                    className="btn-solid clicky"
                    w={"50%"}
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    Kembali
                  </Button>
                </VStack>
              )}

              {loading && <ComponentSpinner m={"auto"} />}

              {!loading && myLocation && attendanceData && address && (
                <>
                  <LeafletMap
                    center={{
                      lat: myLocation.lat,
                      lng: myLocation.long,
                    }}
                    officeCenter={{
                      lat: attendanceData?.office_lat || -7.5626538,
                      lng: attendanceData?.office_long || 110.8018715,
                    }}
                    zoom={20}
                    presence_radius={attendanceData?.radius || 100}
                  />

                  <VStack
                    align={"stretch"}
                    w={"100%"}
                    position={"fixed"}
                    bottom={0}
                    left={0}
                    p={4}
                  >
                    <VStack
                      align={"stretch"}
                      bg={bodyColor}
                      p={6}
                      borderRadius={16}
                      w={"100%"}
                      maxW={"656px"}
                      mx={"auto"}
                    >
                      <HStack justify={"space-between"} opacity={0.4}>
                        <Text fontSize={[12, null, 16]}>Konfirmasi Alamat</Text>
                        <Text fontSize={[12, null, 16]}>
                          Akurat hingga 1.5 km
                        </Text>
                      </HStack>

                      <Text mb={4}>{address}</Text>

                      <ButtonGroup>
                        <Button
                          className="btn-solid clicky"
                          w={"50%"}
                          onClick={() => {
                            window.history.back();
                          }}
                        >
                          Kembali
                        </Button>

                        <AmbilFoto
                          attendanceData={attendanceData}
                          isDisabled={outsideRadius}
                        />
                      </ButtonGroup>
                    </VStack>
                  </VStack>
                </>
              )}
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
