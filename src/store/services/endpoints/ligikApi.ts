import { serviceApi } from "../servicesApi";

export const ligikApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    addBid: builder.query<void, void>({
      query: () => ({
        url: "/bid/add",
        method: "get",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyAddBidQuery } = ligikApi;
