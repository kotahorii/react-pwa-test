import { VFC, useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../../../firebase";
import { CommentList } from "../../organizms/feed/CommentList";
import { PostProfile } from "../../molecule/feed/PostProfile";
import { PostMainContent } from "./PostMainContent";
import { Comment } from "../../../types/FeedTypes";

type Props = {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
};

export const Post: VFC<Props> = ({
  postId,
  avatar,
  image,
  text,
  timestamp,
  username,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>();
  const [openComments, setOpenComments] = useState(false);

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

  return (
    <>
      <Stack
        w={{ md: "3xl", base: "xs" }}
        borderBottom="0.5px solid"
        borderColor="gray.300"
        pb="3"
      >
        <PostProfile
          avatar={avatar}
          username={username}
          timestamp={timestamp}
        />
        <PostMainContent
          text={text}
          openComments={openComments}
          setOpenComments={setOpenComments}
          image={image}
        />
        <CommentList
          openComments={openComments}
          commentList={commentList}
          postId={postId}
        />
      </Stack>
    </>
  );
};
