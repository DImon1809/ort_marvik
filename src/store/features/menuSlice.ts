import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  isOpenMenu: boolean;
}

const initialState: IinitialState = {
  isOpenMenu: false,
};

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    toggleGlobalWrapper: (state, action: PayloadAction<boolean>) => {
      state.isOpenMenu = action.payload;
    },
  },
});

export const { toggleGlobalWrapper } = menuSlice.actions;
export const menuSliceReducer = menuSlice.reducer;
