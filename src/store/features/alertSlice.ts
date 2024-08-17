import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  isAlert: boolean;
  isDelete: boolean;
  alertText: string;
}

const initialState = {
  isAlert: false,
  isDelete: false,
  alertText: "Внимание!",
};

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    toggleAlert: (
      state,
      action: PayloadAction<{ isAlert: boolean; aletText?: string }>
    ) => {
      state.isAlert = action.payload.isAlert;

      state.alertText = action.payload?.aletText ?? "Внимание!";
    },

    toggleAlertDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
  },
});

export const { toggleAlert, toggleAlertDelete } = alertSlice.actions;
export const alertSliceReducer = alertSlice.reducer;
