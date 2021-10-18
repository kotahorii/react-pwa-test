import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  isOpenLogin: false,
  isOpenRegister: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    setIsOpenLogin: (state) => {
      state.isOpenLogin = true;
    },
    resetIsOpenLogin: (state) => {
      state.isOpenLogin = false;
    },
    setIsOpenRegister: (state) => {
      state.isOpenRegister = true;
    },
    resetIsOpenRegister: (state) => {
      state.isOpenRegister = false;
    },
  },
});

export const {
  setIsOpenLogin,
  resetIsOpenLogin,
  setIsOpenRegister,
  resetIsOpenRegister,
} = loginSlice.actions;

export const selectIsLogin = (state: RootState) => state.login.isOpenLogin;
export const selectIsRegister = (state: RootState) =>
  state.login.isOpenRegister;

export default loginSlice.reducer;
