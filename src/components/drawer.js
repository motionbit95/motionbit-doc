import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";

function AddFormDrawer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        추가
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <form
          onSubmit={(e) => {
            props.onSubmit(e);
            onClose();
          }}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>데이터 추가</DrawerHeader>

            <DrawerBody>{props.children}</DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                취소
              </Button>
              <Button type="submit" colorScheme="blue">
                완료
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

export default AddFormDrawer;
