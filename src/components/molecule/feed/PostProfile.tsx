import { VFC } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Stack, Text } from "@chakra-ui/layout";

type Props = {
  avatar: string;
  username: string;
  timestamp: any;
};

export const PostProfile: VFC<Props> = ({ avatar, username, timestamp }) => {
  return (
    <>
      <Stack
        direction="row"
        spacing="3"
        justify={{ md: "flex-start", base: "center" }}
      >
        <Avatar src={avatar} size="sm" />
        <Text fontWeight="bold" color="gray.600">
          @{username}
        </Text>
        <Box w="200">
          <Text as="span" color="gray.500">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </Text>
        </Box>
      </Stack>
    </>
  );
};
