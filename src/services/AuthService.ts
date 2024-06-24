import {
  IRequestPasswordReset,
  IResetPassword,
  PostUserSignInInfo,
  UserSignInInfoWithToken,
} from "../models/types/Auth";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const userLogin = async (
  data: PostUserSignInInfo
): Promise<UserSignInInfoWithToken> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    createFetchOptions("POST", "", data)
  );
  return handleResponse<UserSignInInfoWithToken>(response);
};

const requestPasswordReset = async (
  data: IRequestPasswordReset
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-password-reset`,
    createFetchOptions("POST", "", data)
  );
  return handleResponse<{ message: string }>(response);
};

const validatePasswordReset = async (token: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-token/${token}`,
    createFetchOptions("GET", "")
  );
  return handleResponse<any>(response);
};

const resetPassword = async (
  data: IResetPassword
): Promise<{ message: string }> => {
  console.log(data.token);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
    createFetchOptions("POST", "", data)
  );
  return handleResponse<{ message: string }>(response);
};

const authService = {
  userLogin,
  validatePasswordReset,
  resetPassword,
  requestPasswordReset,
};

export default authService;
