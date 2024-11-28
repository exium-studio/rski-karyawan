import {
  Button,
  ButtonProps,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  RiCameraFill,
  RiCameraOffFill,
  RiCameraSwitchFill,
} from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import AlertPresensiSukses from "../../../components/dependent/AlertPresensiSukses";
import DisclosureHeader from "../../../components/dependent/DisclosureHeader";
import Header from "../../../components/dependent/Header";
import CContainer from "../../../components/independent/wrapper/CContainer";
import { Interface__AttendanceData } from "../../../constant/interfaces";
import useBackOnClose from "../../../hooks/useBackOnClose";
import useCallBackOnNavigate from "../../../hooks/useCallBackOnNavigate";
import backOnClose from "../../../lib/backOnClose";
import getLocation from "../../../lib/getLocation";
import req from "../../../lib/req";

interface PhotoConfirmationProps {
  attendanceData: Interface__AttendanceData;
  isTakePhotoPageOpen: boolean;
  startCamera: any;
  stopCamera: any;
  takePhoto: any;
  imageUrl: any;
  imageSrc: any;
}

const PhotoConfirmation = ({
  attendanceData,
  isTakePhotoPageOpen,
  startCamera,
  stopCamera,
  takePhoto,
  imageUrl,
  imageSrc,
}: PhotoConfirmationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("photo-confirmation", isOpen, onOpen, onClose);

  const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const startCameraRef = useRef(startCamera);
  const stopCameraRef = useRef(stopCamera);

  // Update the refs if startCamera or stopCamera changes
  useEffect(() => {
    startCameraRef.current = startCamera;
    stopCameraRef.current = stopCamera;
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (isTakePhotoPageOpen && !isOpen) {
      startCameraRef.current();
    } else {
      stopCameraRef.current();
    }

    return () => {
      stopCameraRef.current();
    };
  }, [isTakePhotoPageOpen, isOpen]);

  useCallBackOnNavigate(() => {
    setTimeout(() => {
      stopCamera();
    }, 50);
  });

  function attendance() {
    setLoading(true);

    getLocation()
      .then(({ lat, long }) => {
        // console.log(lat, long);
        const payload = new FormData();
        payload.append("lat", lat.toString());
        payload.append("long", long.toString());
        payload.append("foto", imageSrc, "photo.jpg");

        // console.log("img Src", imageSrc);

        let url = "";
        if (attendanceData?.aktivitas) {
          url = `/api/check-out-presensi`;
        } else {
          url = `/api/check-in-presensi`;
        }

        req
          .post(url, payload)
          .then((r) => {
            if (r.status === 200) {
              setAlertIsOpen(true);
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
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <AlertPresensiSukses isOpen={alertIsOpen} />

      <Center p={1} borderRadius={"full"}>
        <Center
          w={"50px"}
          h={"50px"}
          borderRadius={"full"}
          bg={"white"}
          cursor={"pointer"}
          className="clicky"
          onClick={() => {
            takePhoto();
            onOpen();
            // stopCamera();
          }}
        ></Center>
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
          // startCamera();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent border={"none"}>
          <ModalHeader>
            <DisclosureHeader
              title="Konfirmasi Foto"
              onClose={() => {
                // startCamera();
              }}
            />
          </ModalHeader>

          <ModalBody p={0}>
            <Image src={imageUrl} borderRadius={"0 !important"} />
          </ModalBody>

          <ModalFooter>
            <CContainer w={"100%"} gap={2}>
              <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={() => {
                  backOnClose();
                  // startCamera();
                }}
              >
                Ambil Ulang
              </Button>
              <Button
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
                isLoading={loading}
                onClick={attendance}
              >
                Konfirmasi
              </Button>
            </CContainer>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface Props extends ButtonProps {
  attendanceData: any;
}

export default function AmbilFoto({ attendanceData, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("ambil-foto-modal", isOpen, onOpen, () => {
    onClose();
    stopCamera();
  });
  useCallBackOnNavigate(() => {
    stopCamera();
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [data, setData] = useState<any>(undefined);
  const [dataUrl, setDataUrl] = useState<any>(undefined);

  const startCamera = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsDisabled(false);
      }
    } catch (error) {
      console.error("Error starting camera:", error);
    }
  }, [isFrontCamera]);

  const stopCamera = () => {
    let videoElement: HTMLVideoElement | undefined;

    if (videoRef.current) {
      videoElement = videoRef.current;
    }

    if (videoElement && videoElement.srcObject) {
      (videoElement.srcObject as MediaStream)
        .getTracks()
        .forEach((track: any) => {
          if (track.readyState === "live") {
            track.stop();
          }
        });
    }
    setIsDisabled(true);
  };

  const switchCamera = () => {
    setIsFrontCamera((prev) => !prev);
    startCamera();
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      const width = video.videoWidth;
      const height = video.videoHeight;

      const smallerDimension = Math.min(width, height);

      canvas.width = smallerDimension;
      canvas.height = smallerDimension;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Menentukan area yang akan diambil dari video
        const x = (width - smallerDimension) / 2;
        const y = (height - smallerDimension) / 2;

        if (isFrontCamera) {
          ctx.translate(smallerDimension, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(
          video,
          x,
          y,
          smallerDimension,
          smallerDimension,
          0,
          0,
          smallerDimension,
          smallerDimension
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const imageUrl = URL.createObjectURL(blob);
              setDataUrl(imageUrl);
              setData(blob);

              // const payload = new FormData();
              // payload.append("photo", blob, "photo.jpg");
            }
          },
          "image/jpeg",
          1
        );
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }

    let videoElement: HTMLVideoElement | undefined;

    if (videoRef.current) {
      videoElement = videoRef.current;
    }

    return () => {
      if (videoElement && videoElement.srcObject) {
        (videoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track: any) => {
            if (track.readyState === "live") {
              track.stop();
            }
          });
      }
    };
  }, [isOpen, startCamera, videoRef]);

  // SX

  return (
    <>
      <Button
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
        {...props}
        // isDisabled={outsideRadius}
      >
        Konfirmasi
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
          stopCamera();
        }}
        isCentered
        blockScrollOnMount={false}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader>
            {/* <DisclosureHeader
              title={"Ambil Foto"}
              onClose={() => {
                stopCamera();
              }}
            /> */}
            <Header
              left={"back"}
              title="Ambil Foto"
              bg={"dark"}
              color={"white"}
            />
          </ModalHeader>
          <ModalBody px={0}>
            <CContainer
              flex={1}
              justify={"space-between"}
              bg={"dark"}
              align={"center"}
            >
              <VStack
                aspectRatio={1}
                overflow={"clip"}
                w={"100% !important"}
                maxW={"600px !important"}
                maxH={"600px !important"}
                h={"100% !important"}
                justify={"center"}
                position={"relative"}
                my={"auto"}
              >
                <Image
                  src="/vectors/photoAlign.svg"
                  position={"absolute"}
                  zIndex={2}
                />

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={isFrontCamera ? "mirror-x" : ""}
                  style={{
                    width: "100%",
                    height: "100%", // Set height to 100% to maintain 1:1 aspect ratio
                    objectFit: "cover",
                  }}
                ></video>
              </VStack>

              <HStack justify={"center"} gap={8} p={6} mb={"80px"}>
                <IconButton
                  aria-label="Switch Camera"
                  icon={
                    <Icon as={RiCameraSwitchFill} fontSize={24} opacity={0.4} />
                  }
                  borderRadius={"full"}
                  className="btn clicky"
                  color={"white"}
                  onClick={switchCamera}
                />

                <Center p={1} borderRadius={"full"} border={"1px solid white"}>
                  <PhotoConfirmation
                    attendanceData={attendanceData}
                    isTakePhotoPageOpen={isOpen}
                    startCamera={startCamera}
                    stopCamera={stopCamera}
                    takePhoto={takePhoto}
                    imageUrl={dataUrl}
                    imageSrc={data}
                  />
                </Center>

                <IconButton
                  aria-label="Disable Camera"
                  icon={
                    <Icon
                      as={isDisabled ? RiCameraFill : RiCameraOffFill}
                      fontSize={24}
                      opacity={0.4}
                    />
                  }
                  borderRadius={"full"}
                  className="btn clicky"
                  color={"white"}
                  onClick={() => {
                    if (isDisabled) {
                      startCamera();
                    } else {
                      stopCamera();
                    }
                  }}
                />
              </HStack>
            </CContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
