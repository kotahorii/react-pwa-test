import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  user: { uid: "", photoUrl: "", displayName: "" },
};
type User = typeof initialState.user;

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    updateUserProfile: (state, action: PayloadAction<Omit<User, "uid">>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
