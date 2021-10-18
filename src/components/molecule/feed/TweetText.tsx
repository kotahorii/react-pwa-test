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
        placeholder="What's happening?"
        w="lg"
        type="text"
        variant="flushed"
        value={tweetMsg}
        onChange={(e) => setTweetMsg(e.target.value)}
      />
    </>
  );
};
