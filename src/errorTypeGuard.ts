import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface IDataError {
  error: string;
  message: string[];
  statusCode: number;
  status: number;
}

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error.status === "number";
};

export const handleError = (error: any) => {
  if (isFetchBaseQueryError(error)) return error.data as IDataError;
};
