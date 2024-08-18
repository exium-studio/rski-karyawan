import { Text, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import formatDurationNumeric from "../../lib/formatDurationNumeric";

interface Props extends TextProps {
  seconds: number;
  isFinishToZero?: (() => void) | "stop";
}

export default function CountDownDurationShort({
  seconds,
  isFinishToZero,
  ...props
}: Props) {
  const [remainingTime, setRemainingTime] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remainingTime < -1) {
      if (isFinishToZero) {
        if (isFinishToZero === "stop") {
          setRemainingTime(0);
        } else {
          isFinishToZero();
        }
      }
    }
  }, [remainingTime, isFinishToZero]);

  return remainingTime === 0 ? (
    <Text mx={"auto"}>-</Text>
  ) : (
    <Text fontSize={[16, null, 18]} className="num" {...props}>
      {formatDurationNumeric(remainingTime)}
    </Text>
  );
}
