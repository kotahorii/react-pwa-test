import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  positionData: [{ address: "", latitude: "", longitude: "" }],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,

  reducers: {},
});

export const selectPositionData = (state: RootState) => state.map.positionData;

export default mapSlice.reducer;
