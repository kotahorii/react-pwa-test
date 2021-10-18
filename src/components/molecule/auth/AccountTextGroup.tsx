import { VFC, Dispatch } from "react";
import { Stack, Text } from "@chakra-ui/layout";

type Props = {
  isLogin: boolean;
  onOpen: () => void;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

export const AccountTextGroup: VFC<Props> = ({
  isLogin,
  setIsLogin,
  onOpen,
}) => {
  const handleIsLogin = () => setIsLogin(!isLogin);
  return (
    <>
      <Stack direction="row" justify="space-between">
        <Text fontSize="15" color="blue.400" cursor="pointer" onClick={onOpen}>
          Forgot Password?
        </Text>
        <Text
          fontSize="15"
          color="blue.400"
          cursor="pointer"
          onClick={handleIsLogin}
        >
          {isLogin ? "Create new account?" : "Back to login?"}
        </Text>
      </Stack>
    </>
  );
};
