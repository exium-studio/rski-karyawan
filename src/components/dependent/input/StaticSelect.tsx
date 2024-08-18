import {
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useBackOnCloseOld from "../../../lib/useBackOnCloseOld";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import { iconSize } from "../../../constant/sizes";

interface Props {
  formik: any;
  name: string;
  placeholder: string;
  options: { value: any; label: string }[];
  selectedValue: any;
  noSearch?: boolean;
}

export default function StaticSelect({
  formik,
  name,
  placeholder,
  options,
  selectedValue,
  noSearch,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnCloseOld(isOpen, onClose);
  const handleOnClose = () => {
    onClose();
    window.history.back();
  };
  const initialRef = useRef(null);
  const [search, setSearch] = useState<string>("");
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );

  // SX
  const selectOnError = useColorModeValue(
    "0 0 0 1px #E53E3E",
    "0 0 0 1px #FC8181"
  );

  console.log(selectedValue);

  return (
    <>
      <HStack
        as={Button}
        className="btn-clear"
        h={"40px"}
        px={"16px !important"}
        border={"1px solid var(--divider3)"}
        boxShadow={formik.errors[name] ? selectOnError : ""}
        borderRadius={8}
        cursor={"pointer"}
        onClick={onOpen}
        justify={"space-between"}
        w={"100%"}
      >
        <Text
          opacity={
            selectedValue !== null &&
            selectedValue !== undefined &&
            selectedValue !== ""
              ? 1
              : 0.3
          }
          fontSize={14}
          fontWeight={400}
        >
          {options[selectedValue]?.label || placeholder}
        </Text>

        <Icon as={RiArrowDownSLine} />
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        scrollBehavior="inside"
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent overflow={"clip"} borderRadius={12}>
          <ModalCloseButton />

          <ModalHeader pr={6}>
            <Text fontSize={20}>{placeholder}</Text>
            {!noSearch && (
              <InputGroup mt={6}>
                <InputLeftElement>
                  <Icon as={RiSearchLine} fontSize={iconSize} />
                </InputLeftElement>

                <Input
                  ref={initialRef}
                  w={"100%"}
                  placeholder={"Pencarian"}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </InputGroup>
            )}
          </ModalHeader>

          <ModalBody className="scrollY">
            <VStack
              align={"stretch"}
              // bg={"blackAlpha.200"}
              borderRadius={8}
              overflow={"clip"}
              // p={2}
            >
              {filteredOptions && filteredOptions?.length > 0 ? (
                filteredOptions?.map((option, i) => (
                  <Button
                    className="btn-outline"
                    // borderRadius={"0"}
                    bg={
                      selectedValue === option.value
                        ? "var(--p500a3) !important"
                        : ""
                    }
                    // color={selectedValue === option.value ? "p.500" : ""}
                    border={"1px solid var(--divider)"}
                    borderColor={selectedValue === option.value ? "p.500" : ""}
                    key={i}
                    onClick={() => {
                      formik.setFieldValue(name, option.value);
                      handleOnClose();
                      setSearch("");
                    }}
                  >
                    <HStack justify={"center"} w={"100%"}>
                      <Text>{option.label}</Text>
                    </HStack>
                  </Button>
                ))
              ) : (
                <Text textAlign={"center"}>Opsi tidak ditemukan</Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter pt={"0 !important"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
