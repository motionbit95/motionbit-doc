import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiBookmark,
  FiClock,
  FiGrid,
  FiHelpCircle,
  FiMoreVertical,
  FiPieChart,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { DocumentCollapse } from "../components/collapse";
import { Logo } from "../components/logo";
import { SidebarButton } from "../components/buttons";

export const Sidebar = (props) => {
  return (
    <Flex
      as="section"
      minH="100vh"
      bgColor={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        flex="1"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
        bg="bg.surface"
        borderRightWidth="1px"
        justifyContent="space-between"
      >
        <Stack spacing="8">
          <Logo alignSelf="start" />
          <Stack spacing="1">
            <SidebarButton
              onClick={() => props.onChangeMenu("dashboard")}
              leftIcon={<FiGrid />}
            >
              대시보드
            </SidebarButton>
            <SidebarButton
              onClick={() => props.onChangeMenu("database")}
              leftIcon={<FiPieChart />}
            >
              데이터베이스
            </SidebarButton>
            <DocumentCollapse
              onChangeMenu={(value) => props.onChangeMenu(value)}
            />
            <SidebarButton
              onClick={() => props.onChangeMenu("history")}
              leftIcon={<FiClock />}
            >
              업무일지
            </SidebarButton>
            <SidebarButton
              onClick={() => props.onChangeMenu("request")}
              leftIcon={<FiBookmark />}
            >
              요청사항
            </SidebarButton>
          </Stack>
        </Stack>
        <Stack spacing="4" divider={<StackDivider />}>
          <Box />
          <Stack spacing="1">
            <SidebarButton
              onClick={() => props.onChangeMenu("help")}
              leftIcon={<FiHelpCircle />}
            >
              공지사항
            </SidebarButton>
            <SidebarButton
              onClick={() => props.onChangeMenu("setting")}
              leftIcon={<FiSettings />}
            >
              설정
            </SidebarButton>
          </Stack>
          <HStack spacing="3" justify="space-between">
            <HStack spacing="3">
              <Avatar boxSize="10" /*src="https://i.pravatar.cc/300"*/ />
              <Box>
                <Text textStyle="sm" fontWeight="medium">
                  박대수
                </Text>
                <Text textStyle="sm" color="fg.muted">
                  procos@hanmail.net
                </Text>
              </Box>
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                variant="tertiary"
                rightIcon={<FiMoreVertical />}
                aria-label="Open Menu"
              />
              <MenuList>
                <MenuItem>로그아웃</MenuItem>
                <MenuItem>비밀번호 변경</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Stack>
      </Stack>
    </Flex>
  );
};
