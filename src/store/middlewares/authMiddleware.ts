import { createListenerMiddleware } from "@reduxjs/toolkit";

import { formApi } from "../services/endpoints/formApi";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  matcher: formApi.endpoints.auth.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.accessToken) {
      localStorage.setItem("token", action.payload.accessToken);
    }
  },
});
