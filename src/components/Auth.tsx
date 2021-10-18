import { VFC, useState, ChangeEvent } from "react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { auth, provider, storage } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { Icon } from "@chakra-ui/icon";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useAppDispatch } from "../app/hooks";
import { updateUserProfile } from "../features/userSlice";

export const Auth: VFC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const onChangeImageHandker = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = () => setIsLogin(!isLogin);

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
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack spacing="8" mx="auto" maxW="lg" py="12" px="6">
          <Stack align="center">
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy this app
            </Text>
          </Stack>
          <Box rounded="md" color="gray.600" boxShadow="lg" p="8">
            <Stack spacing="4">
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
              <Stack direction="row" justify="space-between">
                <Text fontSize="15" color="blue.400" cursor="pointer">
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
              <Stack spacing="6">
                <Button
                  size="sm"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  onClick={isLogin ? signIn : register}
                >
                  {isLogin ? "Login" : " Register"}
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
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
