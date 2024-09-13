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
              {menu === "RFS" && (
                <RFSForm
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.id]: e.target.value })
                  }
                />
              )}
              {menu === "IA" && (
                <IAForm
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.id]: e.target.value })
                  }
                />
              )}
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
              props.onSubmit({ ...props.data, ...formData });
              console.log(formData);
              onClose();
            }}
          >
            <ModalHeader>{menu} 수정</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {menu === "RFS" && (
                <RFSForm
                  data={props.data}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.id]: e.target.value })
                  }
                />
              )}
              {menu === "IA" && (
                <IAForm
                  data={props.data}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.id]: e.target.value })
                  }
                />
              )}
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

export function IAForm(props) {
  const { onChange, data } = props;
  return (
    <>
      <FormControl isRequired>
        <FormLabel>분류</FormLabel>
        <Select
          placeholder="---선택---"
          defaultValue={data?.division}
          id="division"
          onChange={onChange}
        >
          <option value="웹">웹</option>
          <option value="앱">앱</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Depth1</FormLabel>
        <Input
          id="depth1"
          placeholder="Depth1을 입력하세요"
          defaultValue={data?.depth1}
          onChange={onChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Depth2</FormLabel>
        <Input
          id="depth2"
          placeholder="Depth2를 입력하세요"
          defaultValue={data?.depth2}
          onChange={onChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Depth3</FormLabel>
        <Input
          id="depth3"
          placeholder="Depth3을 입력하세요"
          defaultValue={data?.depth3}
          onChange={onChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Page</FormLabel>
        <Input
          id="page"
          placeholder="페이지 경로를 입력하세요."
          defaultValue={data?.page}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>설명</FormLabel>
        <Textarea
          id="description"
          placeholder="아키텍쳐를 설명하세요."
          defaultValue={data?.description}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>상태</FormLabel>
        <Input
          id="state"
          placeholder="진행상태를 입력하세요."
          defaultValue={data?.state}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
}
