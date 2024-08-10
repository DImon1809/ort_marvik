import { configureStore } from "@reduxjs/toolkit";

import { menuSliceReducer } from "./features/menuSlice";

export const store = configureStore({
  reducer: {
    menuSlice: menuSliceReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
