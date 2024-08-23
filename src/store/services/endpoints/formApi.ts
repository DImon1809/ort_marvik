import { serviceApi } from "../servicesApi";

import { IUser } from "../../types";

export const formApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      any,
      {
        userName: string;
        email: string;
        password: string;
        repeatPassword: string;
      }
    >({
      query: (registerData) => ({
        url: "/auth/register",
        method: "post",
        body: {
          userName: registerData.userName,
          email: registerData.email,
          password: registerData.password,
          repeatPassword: registerData.repeatPassword,
        },
      }),
    }),

    confirmCode: builder.mutation<
      any,
      {
        userName: string;
        email: string;
        password: string;
        code: string;
      }
    >({
      query: (codeData) => ({
        url: "/auth/code",
        method: "post",
        body: {
          userName: codeData.userName,
          email: codeData.email,
          password: codeData.password,
          code: codeData.code,
        },
      }),
    }),

    repeatCode: builder.mutation<
      any,
      {
        userName: string;
        email: string;
        code: string;
      }
    >({
      query: (codeData) => ({
        url: "/auth/repeat",
        method: "post",
        body: {
          userName: codeData.userName,
          email: codeData.email,
          code: codeData.code,
        },
      }),
    }),

    auth: builder.mutation<
      { accessToken: string },
      {
        email: string;
        password: string;
      }
    >({
      query: (loginData) => ({
        url: "/auth/login",
        method: "post",
        credentials: "include",
        body: {
          email: loginData.email,
          password: loginData.password,
        },
      }),
    }),

    current: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/current",
        method: "get",
      }),
    }),

    logout: builder.query<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "get",
        credentials: "include",
      }),
    }),

    deleteUser: builder.query<void, void>({
      query: () => ({
        url: "/auth/delete",
        method: "delete",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAuthMutation,
  useRegisterMutation,
  useLazyCurrentQuery,
  useLazyLogoutQuery,
  useLazyDeleteUserQuery,
  useConfirmCodeMutation,
  useRepeatCodeMutation,
} = formApi;
