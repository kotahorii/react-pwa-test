import { VFC } from "react";
import { Stack, Heading, Text } from "@chakra-ui/layout";

export const HeadingWithText: VFC = () => {
  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">Sign in to your account</Heading>
        <Text fontSize="lg" color="gray.600">
          to enjoy this app
        </Text>
      </Stack>
    </>
  );
};
