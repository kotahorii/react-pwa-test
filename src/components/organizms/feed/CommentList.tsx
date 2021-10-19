import { VFC } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Stack, Text } from "@chakra-ui/layout";
import { CommentForm } from "../../molecule/feed/CommentForm";
import { Comment } from "../../../types/FeedTypes";

type Props = {
  openComments: boolean;
  commentList: Comment[] | undefined;
  postId: string;
};

export const CommentList: VFC<Props> = ({
  openComments,
  commentList,
  postId,
}) => {
  return (
    <>
      <Stack px="10" spacing="5">
        {openComments && (
          <>
            {commentList?.map((com) => (
              <Stack key={com.id} direction="row">
                <Avatar src={com.avatar} size="xs" />
                <Text fontWeight="bold" color="gray.600">
                  @{com.username}
                </Text>
                <Text color="gray.600" w={{ md: "xl", base: "auto" }}>
                  {com.text}
                </Text>
                <Text color="gray.500">
                  {new Date(com.timestamp?.toDate()).toLocaleString()}
                </Text>
              </Stack>
            ))}
            <CommentForm postId={postId} />
          </>
        )}
      </Stack>
    </>
  );
};
