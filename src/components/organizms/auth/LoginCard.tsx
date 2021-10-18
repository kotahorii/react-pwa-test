import { VFC, useState, ChangeEvent } from "react";
import { LoginButtons } from "../../molecule/auth/LoginButtons";
import { AccountTextGroup } from "../../molecule/auth/AccountTextGroup";
import { EmailAndPasswordForms } from "../../molecule/auth/EmailAndPasswordForms";
import { Box, Stack } from "@chakra-ui/layout";

type Props = {
  onOpen: () => void;
};

export const LoginCard: VFC<Props> = ({ onOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Box rounded="md" color="gray.600" boxShadow="lg" p="8">
        <Stack spacing="4">
          <EmailAndPasswordForms
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
            isLogin={isLogin}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <AccountTextGroup
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            onOpen={onOpen}
          />
          <LoginButtons
            email={email}
            password={password}
            username={username}
            avatarImage={avatarImage}
            isLogin={isLogin}
          />
        </Stack>
      </Box>
    </>
  );
};
