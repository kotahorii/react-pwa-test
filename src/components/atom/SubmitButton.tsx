import { Button } from "@chakra-ui/button";
import { VFC } from "react";

type Props = {
  tweetMsg: string;
};

export const SubmitButton: VFC<Props> = ({ tweetMsg }) => {
  return (
    <>
      <Button
        borderRadius="30"
        p="5"
        bg="blue.400"
        _hover={{ bg: "blue.500" }}
        color="white"
        type="submit"
        disabled={!tweetMsg}
      >
        Tweet
      </Button>
    </>
  );
};
