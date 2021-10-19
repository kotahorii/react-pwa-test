import { VFC, Dispatch } from "react";
import { Icon } from "@chakra-ui/icon";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";

type Props = {
  openComments: boolean;
  setOpenComments: Dispatch<React.SetStateAction<boolean>>;
};

export const CommentToggle: VFC<Props> = ({
  setOpenComments,
  openComments,
}) => {
  return (
    <>
      <Icon
        cursor="pointer"
        onClick={() => setOpenComments(!openComments)}
        fontSize="22px"
        color="gray.400"
        _hover={{ color: "gray.600" }}
        as={openComments ? AiFillMessage : AiOutlineMessage}
      />
    </>
  );
};
