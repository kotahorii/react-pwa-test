import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { VFC } from "react";

type Props = {
  tweetMsg: string;
};

export const SubmitButton: VFC<Props> = ({ tweetMsg }) => {
  const buttonSize = useBreakpointValue(["sm", "sm", "md"]);
  return (
    <>
      <Button
        borderRadius="30"
        size={buttonSize}
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
