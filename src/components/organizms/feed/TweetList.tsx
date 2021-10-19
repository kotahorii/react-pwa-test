import { VFC, useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../../../firebase";
import { Post } from "../../molecule/feed/Post";
import { Stack } from "@chakra-ui/layout";

export const TweetList: VFC = () => {
  const [posts, setPosts] = useState([
    { id: "", avatar: "", image: "", text: "", timestamp: null, username: "" },
  ]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          avatar: doc.data().avatar,
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <>
      <Stack spacing="5">
        {posts[0]?.id &&
          posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
      </Stack>
    </>
  );
};
