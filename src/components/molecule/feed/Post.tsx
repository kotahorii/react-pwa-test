import { Box, Stack } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { VFC } from "react";

type Props = {
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
};

export const Post: VFC<Props> = ({
  avatar,
  image,
  text,
  timestamp,
  username,
}) => {
  return (
    <>
      <Box bg="white" borderRadius="lg" boxShadow="lg" p="5">
        <Stack>
          <Stack direction="row" spacing="3" justify="flex-start">
            <Avatar src={avatar} size="sm" />
            <Text fontWeight="bold" color="gray.600">
              @{username}
            </Text>
            <Text as="span" color="gray.500">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </Text>
          </Stack>
          <Stack direction="column">
            <Text ml="10" color="gray.600">
              {text}
            </Text>
            <Flex h="200" w="full" justify="center">
              <Image src={image} />
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
