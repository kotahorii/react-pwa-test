import { Input } from "@chakra-ui/input";
import { VFC, Dispatch } from "react";

type Props = {
  tweetMsg: string;
  setTweetMsg: Dispatch<React.SetStateAction<string>>;
};

export const TweetText: VFC<Props> = ({ tweetMsg, setTweetMsg }) => {
  return (
    <>
      <Input
        w={{ base: "2xs", md: "2xl" }}
        placeholder="What's happening?"
        type="text"
        variant="flushed"
        value={tweetMsg}
        onChange={(e) => setTweetMsg(e.target.value)}
      />
    </>
  );
};
