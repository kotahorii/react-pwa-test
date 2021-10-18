import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import mapReducer from "../features/mapSlice";
import postReducer from "../features/postSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    map: mapReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
