import { VFC } from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";

import {} from "@firebase/auth";

import { ResetPasswordModal } from "../organizms/auth/ResetPasswordModal";
import { HeadingWithText } from "../molecule/auth/HeadingwithText";
import { LoginCard } from "../organizms/auth/LoginCard";

export const Auth: VFC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack spacing="8" mx="auto" maxW="lg" py="12" px="6">
          <HeadingWithText />
          <LoginCard onOpen={onOpen} />
        </Stack>
      </Flex>
      <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
