import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formApi } from "../services/endpoints/formApi";
import { ligikApi } from "../services/endpoints/ligikApi";

import { IUser } from "../types";

export interface IinitialState {
  userName: string;
  email: string;
  jwtToken: string;
  isAuth: boolean;
  isBid: boolean;
}

const initialState: IinitialState = {
  userName: "",
  email: "",
  isAuth: false,
  jwtToken: "",
  isBid: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loguot: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        formApi.endpoints.auth.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.isAuth = true;
          state.jwtToken = action.payload.accessToken;
        }
      )
      .addMatcher(
        formApi.endpoints.current.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isAuth = true;
          state.userName = action.payload.userName;
          state.email = action.payload.email;
          state.isBid = action.payload.isBid;
        }
      )
      .addMatcher(ligikApi.endpoints.addBid.matchFulfilled, (state) => {
        state.isBid = true;
      });
  },
});

export const { loguot } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
