import { Center, CenterProps, Text } from "@chakra-ui/react";

interface Props extends CenterProps {
  data?: number | null;
}

export default function NotifCount({ data, ...props }: Props) {
  return (
    <>
      {data ? (
        <Center
          minW={"15px"}
          h={"15px"}
          px={1}
          bg={"red.400"}
          borderRadius={"full"}
          {...props}
        >
          <Text fontSize={9} color={"white"}>
            {data < 99 ? data : 99}
          </Text>
        </Center>
      ) : (
        ""
      )}
    </>
  );
}
