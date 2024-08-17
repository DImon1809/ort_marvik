import { configureStore } from "@reduxjs/toolkit";

import { menuSliceReducer } from "./features/menuSlice";
import { alertSliceReducer } from "./features/alertSlice";
import { userSliceReducer } from "./features/userSlice";

import { serviceApi } from "./services/servicesApi";

import { authMiddleware } from "./middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    menuSlice: menuSliceReducer,
    alertSlice: alertSliceReducer,
    userSlice: userSliceReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      serviceApi.middleware,
      authMiddleware.middleware
    ),
});

export type RootType = ReturnType<typeof store.getState>;
