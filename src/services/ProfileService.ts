import { getToken } from "../lib/cookies/auth";
import { Function, ModulesData, Transaction } from "../models/types/Modules";
import {
  CreateModuleProfileData,
  CreateProfileData,
  CreateProfileFunctionData,
  CreateProfileTransactionData,
  DetailedProfile,
  Profile,
  ProfileFunction,
  ProfileModule,
  ProfileTransaction,
} from "../models/types/Profiles";
import createFetchOptions from "./utils/fetchOptions";
import handleResponse from "./utils/responseHandler";

const getProfiles = async (): Promise<Profile[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles`,
    createFetchOptions("GET", token)
  );
  return handleResponse<Profile[]>(response);
};

const createProfile = async (data: CreateProfileData): Promise<Profile> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<Profile>(response);
};

const updateProfile = async (
  id: number,
  data: Partial<Profile>
): Promise<Profile> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}`,
    createFetchOptions("PUT", token, data)
  );
  return handleResponse<Profile>(response);
};

const deleteProfile = async (id: number): Promise<Profile> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}`,
    createFetchOptions("DELETE", token)
  );
  return handleResponse<Profile>(response);
};

const getProfileById = async (id: number): Promise<DetailedProfile> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}`,
    createFetchOptions("GET", token)
  );
  return handleResponse<DetailedProfile>(response);
};

const getAvailableModules = async (id: number): Promise<ModulesData[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}/modules`,
    createFetchOptions("GET", token)
  );
  return handleResponse<ModulesData[]>(response);
};

const getAvailableTransactions = async (
  profileId: number,
  moduleId: number
): Promise<Transaction[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/modules/${moduleId}/transactions`,
    createFetchOptions("GET", token)
  );
  return handleResponse<Transaction[]>(response);
};

const getAvailableFunctions = async (
  profileId: number,
  transactionId: number
): Promise<Function[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/profiles/${profileId}/transactions/${transactionId}`,
    createFetchOptions("GET", token)
  );
  return handleResponse<Function[]>(response);
};

const postProfileModule = async (
  profileId: number,
  data: CreateModuleProfileData
): Promise<ProfileModule[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/modules`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<ProfileModule[]>(response);
};

const deleteProfileModule = async (
  profileId: number,
  moduleId: number
): Promise<void> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/modules/${moduleId}`,
    createFetchOptions("DELETE", token)
  );
  await handleResponse<void>(response);
};

const postProfileTransaction = async (
  profileId: number,
  data: CreateProfileTransactionData
): Promise<ProfileTransaction[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/transaction`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<ProfileTransaction[]>(response);
};

const deleteProfileTransaction = async (
  profileId: number,
  transactionId: number
): Promise<void> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/transactions/${transactionId}`,
    createFetchOptions("DELETE", token)
  );
  await handleResponse<void>(response);
};

const postProfileFunction = async (
  profileId: number,
  transactionId: number,
  data: CreateProfileFunctionData
): Promise<ProfileFunction[]> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/profiles/${profileId}/transactions/${transactionId}`,
    createFetchOptions("POST", token, data)
  );
  return handleResponse<ProfileFunction[]>(response);
};

const deleteProfileFunction = async (
  profileId: number,
  transactionId: number,
  functionId: number
): Promise<void> => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/functions/${functionId}/profile/${profileId}/transaction/${transactionId}`,
    createFetchOptions("DELETE", token)
  );
  await handleResponse<void>(response);
};

const ProfilesService = {
  getProfiles,
  deleteProfile,
  updateProfile,
  createProfile,
  getProfileById,
  getAvailableModules,
  postProfileModule,
  deleteProfileModule,
  deleteProfileTransaction,
  postProfileTransaction,
  getAvailableTransactions,
  getAvailableFunctions,
  deleteProfileFunction,
  postProfileFunction,
};

export default ProfilesService;
