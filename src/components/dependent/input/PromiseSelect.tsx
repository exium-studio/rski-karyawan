import {
  Alert,
  AlertIcon,
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
import { useEffect, useRef, useState } from "react";
import useBackOnCloseOld from "../../../lib/useBackOnCloseOld";
import { iconSize } from "../../../constant/sizes";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";

type Props = {
  name: string;
  formik: any;
  placeholder: string;
  options?: { value: any; label: string; original: any }[];
  loading: boolean;
  getData: () => void;
  alert?: string;
  dependencies?: any;
  resetOnSelect?: string[];
  selectedValue: any;
};

export default function PromiseSelect({
  name,
  formik,
  placeholder,
  options,
  loading,
  getData,
  alert,
  dependencies,
  resetOnSelect,
  selectedValue,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnCloseOld(isOpen, onClose);
  const handleOnClose = () => {
    onClose();
    window.history.back();
  };

  const selectOnError = useColorModeValue(
    "0 0 0 1px #E53E3E",
    "0 0 0 1px #FC8181"
  );

  const initialRef = useRef(null);
  const [search, setSearch] = useState<string>("");

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    if (isOpen && !alert) {
      getData();
    }
  }, [isOpen, getData, alert, dependencies]);

  return (
    <>
      <HStack
        as={Button}
        className="btn-clear"
        h={"40px"}
        px={4}
        border={"1px solid var(--divider3)"}
        boxShadow={formik.errors[name] ? selectOnError : ""}
        borderRadius={8}
        cursor={"pointer"}
        onClick={onOpen}
        justify={"space-between"}
        w={"100%"}
      >
        <Text
          opacity={formik.values[name] ? 1 : 0.3}
          fontSize={formik.values[name] ? [14, null, 16] : 14}
        >
          {formik.values[name]?.name || placeholder}
        </Text>

        <Icon as={RiArrowDownSLine} />
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        scrollBehavior="inside"
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent overflow={"clip"}>
          <ModalCloseButton />
          <ModalHeader pr={6}>
            <Text>{placeholder}</Text>
            {!alert && (
              <InputGroup mt={4}>
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
            {!loading && options && !alert && (
              <VStack align={"stretch"} py={1}>
                {filteredOptions && filteredOptions?.length > 0 ? (
                  filteredOptions?.map((option, i) => (
                    <Button
                      className="btn"
                      bg={
                        formik.values[name] && selectedValue === option.value
                          ? "var(--p500a3) !important"
                          : ""
                      }
                      key={i}
                      onClick={() => {
                        formik.setFieldValue(name, option.original);
                        if (resetOnSelect) {
                          resetOnSelect.forEach((resetName) => {
                            formik.setFieldValue(resetName, null);
                          });
                        }
                        handleOnClose();
                        setSearch("");
                      }}
                    >
                      <HStack justify={"flex-start"} w={"100%"}>
                        <Text>{option.label}</Text>
                      </HStack>
                    </Button>
                  ))
                ) : (
                  <Text textAlign={"center"}>Opsi tidak ditemukan</Text>
                )}
              </VStack>
            )}

            {loading && <p>Loading...</p>}

            {!loading && !options && !alert && (
              <HStack>
                <Button
                  mx={"auto"}
                  colorScheme="ap"
                  variant={"outline"}
                  onClick={() => {
                    getData();
                  }}
                >
                  Muat Ulang
                </Button>
              </HStack>
            )}

            {alert && (
              <Alert status="warning" variant="left-accent" borderRadius={8}>
                <AlertIcon />
                {alert}
              </Alert>
            )}
          </ModalBody>

          <ModalFooter pt={"0 !important"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
