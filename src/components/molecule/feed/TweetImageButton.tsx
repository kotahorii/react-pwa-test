import { VFC, ChangeEvent, Dispatch } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IconButton } from "@chakra-ui/button";

type Props = {
  tweetImage: File | null;
  setTweetImage: Dispatch<React.SetStateAction<File | null>>;
};

export const TweetImageButton: VFC<Props> = ({ tweetImage, setTweetImage }) => {
  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleTweetImage = () => {
    const inputImage = document.getElementById("imageInput");
    inputImage?.click();
  };
  return (
    <>
      <input
        type="file"
        hidden={true}
        id="imageInput"
        onChange={onChangeImageHandler}
      />
      <IconButton
        aria-label="addPhoto"
        variant="flushed"
        fontSize="30px"
        color="gray.500"
        _focus={{ boxShadow: "none" }}
        onClick={handleTweetImage}
        icon={
          tweetImage?.name ? (
            <MdAddPhotoAlternate />
          ) : (
            <MdOutlineAddPhotoAlternate />
          )
        }
      />
    </>
  );
};
