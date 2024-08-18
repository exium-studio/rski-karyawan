import {
  Button,
  HStack,
  Icon,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../constant/colors";
import backOnClose from "../../lib/backOnClose";
import CContainer from "../independent/wrapper/CContainer";
import CustomDrawer from "../independent/wrapper/CustomDrawer";
import DrawerHeader from "./DrawerHeader";

interface Props extends StackProps {
  index?: number;
  data: any;
  icon: RemixiconComponentType;
}

export default function StatistikCutiItem({
  data,
  icon,
  index,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CContainer
        p={4}
        borderRadius={12}
        bg={lightDarkColor}
        minH={"100px"}
        cursor={"pointer"}
        className="clicky"
        onClick={onOpen}
        justify={"center"}
        {...props}
      >
        <Icon
          as={icon}
          mb={2}
          color={`${chartColors[(index as number) % chartColors.length]}`}
        />

        <Text fontWeight={500} mb={2} noOfLines={1}>
          {data.nama}
        </Text>

        <HStack align={"end"} gap={1}>
          <Text fontSize={24} lineHeight={1} fontWeight={600} mt={"auto"}>
            {data.terpakai}
          </Text>
          {data.kuota ? (
            <>
              <Text lineHeight={1.4} opacity={0.4} fontSize={12}>
                /
              </Text>
              <Text lineHeight={1.4} opacity={0.4} fontSize={12}>
                {data.kuota} hari
              </Text>
            </>
          ) : (
            <Text lineHeight={1.4} opacity={0.4} fontSize={12}>
              kali
            </Text>
          )}
        </HStack>
      </CContainer>

      <CustomDrawer
        id="detail-statistik-cuti"
        name={data.nama}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header={<DrawerHeader title={`${data.nama}`} />}
        footer={
          <Button onClick={backOnClose} className="btn-solid clicky">
            Mengerti
          </Button>
        }
      >
        <CContainer px={6}>
          <Text opacity={0.4} mb={4}>
            {data.keterangan}
          </Text>

          <HStack align={"end"} my={2}>
            <Icon
              as={icon}
              color={`${chartColors[(index as number) % chartColors.length]}`}
              fontSize={52}
            />

            <HStack align={"end"} gap={1}>
              <Text fontSize={52} lineHeight={1} fontWeight={600} mt={"auto"}>
                {data.terpakai}
              </Text>

              {data.kuota ? (
                <>
                  <Text fontSize={16} opacity={0.4}>
                    /
                  </Text>
                  <Text fontSize={16} opacity={0.4}>
                    {data.kuota} hari
                  </Text>
                </>
              ) : (
                <Text fontSize={16} opacity={0.4}>
                  kali
                </Text>
              )}
            </HStack>

            <Text ml={"auto"} fontWeight={500}>
              Terpakai
            </Text>
          </HStack>
        </CContainer>
      </CustomDrawer>
    </>
  );
}
