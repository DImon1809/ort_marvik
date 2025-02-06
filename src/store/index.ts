import { configureStore } from "@reduxjs/toolkit";

import { alertSliceReducer } from "./features/alertSlice";
import { menuSliceReducer } from "./features/menuSlice";
import { userSliceReducer } from "./features/userSlice";
import { authMiddleware } from "./middlewares/authMiddleware";
import { serviceApi } from "./services/servicesApi";

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    menuSlice: menuSliceReducer,
    alertSlice: alertSliceReducer,
    userSlice: userSliceReducer,
  },

  middleware: defaultMiddleware =>
    defaultMiddleware().concat(serviceApi.middleware, authMiddleware.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
