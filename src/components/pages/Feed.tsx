import { Button } from "@chakra-ui/react";
import { signOut } from "@firebase/auth";
import { VFC } from "react";
import { auth } from "../../firebase";

export const Feed: VFC = () => {
  return (
    <>
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </>
  );
};
