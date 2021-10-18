import { VFC, ChangeEvent, Dispatch } from "react";
import { FormControl, Input, Flex } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";

type Props = {
  avatarImage: File | null;
  setAvatarImage: Dispatch<React.SetStateAction<File | null>>;
  isLogin: boolean;
  username: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
};

export const EmailAndPasswordForms: VFC<Props> = ({
  avatarImage,
  setAvatarImage,
  isLogin,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleAvatarImage = () => {
    const inputImage = document.getElementById("imageInput");
    inputImage?.click();
  };

  return (
    <>
      {!isLogin && (
        <>
          <FormControl>
            <Input
              type="text"
              placeholder="Username"
              variant="flushed"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <input
            type="file"
            hidden={true}
            id="imageInput"
            onChange={onChangeImageHandler}
          />
          <Flex align="center" justify="center">
            <Icon
              cursor="pointer"
              as={avatarImage ? FaUserCircle : FaRegUserCircle}
              fontSize="30"
              onClick={handleAvatarImage}
            />
          </Flex>
        </>
      )}
      <FormControl>
        <Input
          type="email"
          placeholder="Email address"
          variant="flushed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Input
          type="password"
          placeholder="Password"
          variant="flushed"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
    </>
  );
};
