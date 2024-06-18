"use server";

import { UserSignInInfoWithToken } from "@/src/models/types/Auth";
import { cookies } from "next/headers";

const TOKEN_KEY = "access_token";
const USER_INFO_KEY = "user_info";

export const setCookies = async (data: UserSignInInfoWithToken) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  cookies().set(TOKEN_KEY, data.access_token, {
    httpOnly: true,
    expires: Date.now() + oneWeek,
  });
  cookies().set(USER_INFO_KEY, JSON.stringify(data.userInfo), {
    httpOnly: true,
    expires: Date.now() + oneWeek,
  });
};

export const getToken = async () => {
  const hasToken = cookies().has(TOKEN_KEY);
  if (hasToken) {
    return cookies().get(TOKEN_KEY)?.value;
  }

  return;
};

export const deleteCookies = async () => {
  cookies().delete(TOKEN_KEY);
  cookies().delete(USER_INFO_KEY);
};

export const validateCookies = async () => {
  const token = cookies().has(TOKEN_KEY);
  const userInfo = cookies().has(USER_INFO_KEY);

  if (token && userInfo) return true;

  return false;
};
