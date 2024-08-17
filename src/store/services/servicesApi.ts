import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";

import { RootType } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:4000`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootType).userSlice.jwtToken ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const retryQuery = retry(baseQuery, { maxRetries: 0 });

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: retryQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
