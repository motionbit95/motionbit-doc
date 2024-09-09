import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

export function AddModal(props) {
  const menu = window.location.pathname.split("/").pop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  return (
    <>
      <Button onClick={onOpen} colorScheme="purple">
        등록
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(formData);
              onClose();
            }}
          >
            <ModalHeader>{menu} 등록</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RFSForm
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                닫기
              </Button>
              <Button colorScheme="purple" type="submit">
                등록
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function EditModal(props) {
  const menu = window.location.pathname.split("/").pop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="edit"
        icon={<FiEdit />}
        variant={"ghost"}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
              //   onClose();
            }}
          >
            <ModalHeader>{menu} 수정</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RFSForm
                data={props.data}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                닫기
              </Button>
              <Button colorScheme="purple" type="submit">
                수정
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function RFSForm(props) {
  const { onChange, data } = props;
  return (
    <>
      <FormControl isRequired>
        <FormLabel>스프린트</FormLabel>
        <Input
          id="sprint"
          placeholder="스프린트명을 입력하세요"
          onChange={onChange}
          defaultValue={data?.sprint}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>구분</FormLabel>
        <Select
          defaultValue={data?.division}
          id="division"
          placeholder="---선택---"
          onChange={onChange}
        >
          <option value="공통">공통</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Database">Database</option>
          <option value="API">API</option>
        </Select>
        <FormControl isRequired>
          <FormLabel>제목</FormLabel>
          <Input
            id="title"
            defaultValue={data?.title}
            placeholder="제목을 입력하세요"
            onChange={onChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>설명</FormLabel>
          <Textarea
            id="description"
            defaultValue={data?.description}
            placeholder="설명을 입력하세요"
            onChange={onChange}
          />
        </FormControl>
        {data && (
          <FormControl isRequired>
            <FormLabel>진행도</FormLabel>
            <Select
              defaultValue={data?.progress}
              id="division"
              placeholder="---선택---"
              onChange={onChange}
            >
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </Select>
          </FormControl>
        )}
      </FormControl>
    </>
  );
}
