import { VFC, useState, MouseEvent } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  Input,
  FormControl,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import { IoMdSend } from "react-icons/io";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ResetPasswordModal: VFC<Props> = ({ isOpen, onClose }) => {
  const [resetEmail, setResetEmail] = useState("");

  const sendResetEmail = async (e: MouseEvent<HTMLElement>) => {
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        onClose();
        setResetEmail("");
      })
      .catch((err: any) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px="7">
          <ModalHeader textAlign="center">Reset Email</ModalHeader>
          <ModalBody pb={6}>
            <Stack direction="row" spacing="5" align="center">
              <FormControl>
                <Input
                  placeholder="Email"
                  variant="flushed"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </FormControl>
              <Button
                disabled={!resetEmail}
                _focus={{ boxShadow: "none" }}
                variant="nonstyle"
                onClick={sendResetEmail}
              >
                <Icon as={IoMdSend} fontSize="20" />
              </Button>
            </Stack>

            <FormControl mt={4}></FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
