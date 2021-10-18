import { Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";
import { TweetInput } from "../organizms/feed/TweetInput";
import { TweetList } from "../organizms/feed/TweetList";

export const Feed: VFC = () => {
  return (
    <>
      <Flex justify="center" w="10xl" minH="100vh" bg="gray.50" p="5">
        <Stack spacing="5">
          <TweetInput />
          <TweetList />
        </Stack>
      </Flex>
    </>
  );
};
