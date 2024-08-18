import { Text, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import formatTimeFromDate from "../../lib/formatTimeFromDate";

export default function DigitalClock(props: TextProps) {
  const [clock, setClock] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentTime() {
    const today = new Date();
    return formatTimeFromDate(today);
  }

  return (
    <Text fontWeight={600} {...props}>
      {clock}
    </Text>
  );
}
