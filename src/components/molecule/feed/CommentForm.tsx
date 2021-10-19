import { VFC, FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/userSlice";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { db } from "../../../firebase";
import { Stack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";

export const CommentForm: VFC<{ postId: string }> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const user = useAppSelector(selectUser);
  const newComment = (e: FormEvent) => {
    e.preventDefault();
    addDoc(collection(db, "posts", postId, "comments"), {
      avatar: user.user.photoUrl,
      text: comment,
      timestamp: serverTimestamp(),
      username: user.user.displayName,
    });
    setComment("");
  };
  const inputSize = useBreakpointValue(["sm", "sm", "md"]);

  return (
    <>
      <form onSubmit={newComment}>
        <Stack direction="row" align="center">
          <Input
            size={inputSize}
            w="200px"
            placeholder="Type New Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            type="submit"
            fontSize="22px"
            color="gray.600"
            _hover={{ color: "gray.700" }}
            variant="unstyled"
            _focus={{ boxShadow: "none" }}
            aria-label="comment send"
            icon={<IoMdSend />}
          />
        </Stack>
      </form>
    </>
  );
};
