import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  isOpenPost: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    setIsOpenPost: (state) => {
      state.isOpenPost = true;
    },
    resetIsOpenPost: (state) => {
      state.isOpenPost = false;
    },
  },
});

export const { setIsOpenPost, resetIsOpenPost } = postSlice.actions;

export const selectIsOpenPost = (state: RootState) => state.post.isOpenPost;

export default postSlice.reducer;
