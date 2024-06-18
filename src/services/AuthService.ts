import {
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

const authService = {
  userLogin,
};

export default authService;
