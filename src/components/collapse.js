import {
  Box,
  Button,
  Collapse,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown, FiFile } from "react-icons/fi";

export const DocumentCollapse = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Button
        variant="tertiary"
        onClick={onToggle}
        justifyContent="space-between"
        width="full"
      >
        <HStack spacing="3">
          <Icon as={FiFile} />
          <Text as="span">개발문서</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="8" py="1">
          {["RFP", "IA", "WBS", "FRD", "QA"].map((item) => (
            <Button
              onClick={() => props.onChangeMenu("doc/" + item)}
              key={item}
              variant="tertiary"
              justifyContent="start"
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export const PopoverIcon = (props) => {
  const iconStyles = {
    transform: props.isOpen ? "rotate(-180deg)" : undefined,
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
