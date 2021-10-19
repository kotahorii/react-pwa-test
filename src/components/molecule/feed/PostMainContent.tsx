import { VFC, Dispatch } from "react";
import { Image } from "@chakra-ui/image";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { CommentToggle } from "./CommentToggle";

type Props = {
  text: string;
  openComments: boolean;
  setOpenComments: Dispatch<React.SetStateAction<boolean>>;
  image: string;
};

export const PostMainContent: VFC<Props> = ({
  text,
  openComments,
  setOpenComments,
  image,
}) => {
  return (
    <>
      <Stack
        direction={{ md: "row", base: "column" }}
        align={{ md: "center", base: "flex-start" }}
      >
        <Flex
          ml="10"
          w={{ md: "400px", base: "auto" }}
          direction="column"
          justify={{ md: "center", base: "flex-start" }}
        >
          <Text
            color="gray.600"
            pr={{ md: "7", base: "none" }}
            w={{ md: "lg", base: "2xs" }}
          >
            {text}
          </Text>
          <Flex h="full" pt="5">
            <CommentToggle
              openComments={openComments}
              setOpenComments={setOpenComments}
            />
          </Flex>
        </Flex>
        <Flex justify={{ md: "center", base: "flex-end" }}>
          <Image
            fit="cover"
            borderRadius="lg"
            src={image}
            maxW="320"
            my="10"
            mr="3"
          />
        </Flex>
      </Stack>
    </>
  );
};
