import { VFC } from "react";
import { Stack, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { auth, provider, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { updateUserProfile } from "../../../features/userSlice";
import { useAppDispatch } from "../../../app/hooks";

type Props = {
  email: string;
  password: string;
  username: string;
  avatarImage: File | null;
  isLogin: boolean;
};

export const LoginButtons: VFC<Props> = ({
  email,
  password,
  username,
  avatarImage,
  isLogin,
}) => {
  const dispatch = useAppDispatch();

  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const signUpEmail = async () => {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;

      await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage);
      url = await getDownloadURL(ref(storage, `avatars/${fileName}`));
    }
    if (authUser.user) {
      await updateProfile(authUser.user, {
        displayName: username,
        photoURL: url,
      });
      dispatch(
        updateUserProfile({
          displayName: username,
          photoUrl: url,
        })
      );
    }
  };
  const signIn = async () => {
    try {
      await signInEmail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const register = async () => {
    try {
      await signUpEmail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <>
      <Stack spacing="6">
        <Button
          disabled={
            isLogin
              ? !email || password.length < 6
              : !username || !email || password.length < 6 || !avatarImage?.name
          }
          size="sm"
          bg="blue.400"
          color="white"
          _hover={{ bg: "blue.500" }}
          onClick={isLogin ? signIn : register}
        >
          {isLogin ? "Login" : " Register"}
          <Text as="span" ml="2">
            <Icon as={IoMdMail} fontSize="18" />
          </Text>
        </Button>
        <Button
          onClick={signInGoogle}
          size="sm"
          bg="gray.300"
          color="white"
          _hover={{ bg: "gray.400" }}
        >
          {isLogin ? "Login with Google" : " Register with Google"}
          <Text as="span" ml="2">
            <Icon as={FcGoogle} fontSize="18" />
          </Text>
        </Button>
      </Stack>
    </>
  );
};
