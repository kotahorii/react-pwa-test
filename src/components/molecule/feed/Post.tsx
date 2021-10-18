import { VFC, useEffect, useState, FormEvent } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { IoMdSend } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/userSlice";

type Props = {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
};

type Comment = {
  id: string;
  avatar: string;
  text: string;
  username: string;
  timestamp: any;
};

export const Post: VFC<Props> = ({
  postId,
  avatar,
  image,
  text,
  timestamp,
  username,
}) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>();
  const [openComments, setOpenComments] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timestamp", "desc")
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setCommentList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          avatar: doc.data().avatar,
          text: doc.data().text,
          username: doc.data().username,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, [postId]);

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
  return (
    <>
      <Box p="5" borderBottom="0.5px solid" borderColor="gray.300">
        <Stack>
          <Stack direction="row" spacing="3" justify="flex-start">
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
          <Stack direction="row">
            <Flex ml="10" w="400px" direction="column">
              <Text color="gray.600" pr="7">
                {text}
              </Text>
              <Flex h="full" pt="5">
                <Icon
                  cursor="pointer"
                  onClick={() => setOpenComments(!openComments)}
                  fontSize="22px"
                  color="gray.400"
                  _hover={{ color: "gray.600" }}
                  as={openComments ? AiFillMessage : AiOutlineMessage}
                />
              </Flex>
            </Flex>
            <Flex justify="center">
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

          <Stack px="10" spacing="5">
            {openComments && (
              <>
                {commentList?.map((com) => (
                  <Stack key={com.id} direction="row">
                    <Avatar src={com.avatar} size="xs" />
                    <Text fontWeight="bold" color="gray.600">
                      @{com.username}
                    </Text>
                    <Text color="gray.600">{com.text}</Text>
                    <Text color="gray.500">
                      {new Date(com.timestamp?.toDate()).toLocaleString()}
                    </Text>
                  </Stack>
                ))}

                <form onSubmit={newComment}>
                  <Stack direction="row" align="center">
                    <Input
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
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
