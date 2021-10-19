import { Avatar } from "@chakra-ui/avatar";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { VFC, useState, FormEvent } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/userSlice";
import { auth, db, storage } from "../../../firebase";
import { Stack } from "@chakra-ui/layout";
import { signOut } from "@firebase/auth";
import { TweetImageButton } from "../../molecule/feed/TweetImageButton";
import { TweetText } from "../../molecule/feed/TweetText";
import { SubmitButton } from "../../atom/SubmitButton";

export const TweetInput: VFC = () => {
  const user = useAppSelector(selectUser);
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [tweetMsg, setTweetMsg] = useState("");

  const sendTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + tweetImage.name;
      const uploadTweetImg = uploadBytesResumable(
        ref(storage, `images/${fileName}`),
        tweetImage
      );
      uploadTweetImg.on(
        "state_changed",
        () => {},
        (err: any) => {
          alert(err.message);
        },
        async () => {
          await getDownloadURL(ref(storage, `images/${fileName}`)).then(
            async (url) => {
              await addDoc(collection(db, "posts"), {
                avatar: user.user.photoUrl,
                image: url,
                text: tweetMsg,
                timestamp: serverTimestamp(),
                username: user.user.displayName,
              });
            }
          );
        }
      );
    } else {
      try {
        addDoc(collection(db, "posts"), {
          avatar: user.user.photoUrl,
          image: "",
          text: tweetMsg,
          timestamp: serverTimestamp(),
          username: user.user.displayName,
        });
      } catch (err: any) {
        console.log(err.massage);
      }
    }
    setTweetImage(null);
    setTweetMsg("");
  };

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <>
      <form onSubmit={sendTweet}>
        <Stack
          spacing="3"
          direction={{ md: "row", base: "column" }}
          pl="5"
          justify="center"
        >
          <Stack direction="row" justify="center">
            <Avatar src={user.user.photoUrl} onClick={logout} />
            <TweetText tweetMsg={tweetMsg} setTweetMsg={setTweetMsg} />
          </Stack>

          <Stack direction="row" justify="center">
            <TweetImageButton
              tweetImage={tweetImage}
              setTweetImage={setTweetImage}
            />
            <SubmitButton tweetMsg={tweetMsg} />
          </Stack>
        </Stack>
      </form>
    </>
  );
};
