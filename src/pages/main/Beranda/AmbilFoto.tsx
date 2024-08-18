import {
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react";
import {
  RiCameraFill,
  RiCameraOffFill,
  RiCameraSwitchFill,
} from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CContainer from "../../../components/independent/wrapper/CContainer";
import FotoResultConfirmationModal from "../../../components/dependent/FotoResultConfirmationModal";
import Header from "../../../components/dependent/Header";

export default function AmbilFoto() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [data, setData] = useState<string | null>(null);
  const navigate = useNavigate();

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
              setData(imageUrl);

              const payload = new FormData();
              payload.append("photo", blob, "photo.jpg");
            }
          },
          "image/jpeg",
          1
        );

        navigate("?foto_checkin_confirmation_modal=1");
      }
    }
  };

  useEffect(() => {
    startCamera();

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
  }, [startCamera, videoRef]);

  // SX

  return (
    <CContainer justify={"space-between"} bg={"dark"} align={"center"}>
      {data && <FotoResultConfirmationModal imageSrc={data} />}

      <Header
        left={"back"}
        title="Ambil Foto"
        px={4}
        bg={"dark"}
        color={"white"}
      />

      <VStack
        aspectRatio={1}
        overflow={"clip"}
        w={"100% !important"}
        maxW={"600px !important"}
        maxH={"600px !important"}
        h={"100% !important"}
        justify={"center"}
        position={"relative"}
      >
        <Image
          src="/vectors/foto_indicator.svg"
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
          icon={<Icon as={RiCameraSwitchFill} fontSize={24} opacity={0.4} />}
          borderRadius={"full"}
          className="btn clicky"
          color={"white"}
          onClick={switchCamera}
        />

        <Center p={1} borderRadius={"full"} border={"1px solid white"}>
          <Center
            w={"50px"}
            h={"50px"}
            borderRadius={"full"}
            bg={"white"}
            cursor={"pointer"}
            className="clicky"
            onClick={takePhoto}
          ></Center>
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
  );
}
