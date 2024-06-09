import { ApiResponse } from "../models/types/ApiResponse";
import { ModulesData } from "../models/types/Modules";
import {
  CreateModuleProfileData,
  CreateProfileData,
  DetailedProfile,
  Profile,
  ProfileModule,
} from "../models/types/Profiles";

const getProfiles = async (): Promise<Profile[]> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles`,
    options
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const createProfile = async (
  data: CreateProfileData
): Promise<ApiResponse<Profile>> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const updateProfile = async (id: number, data: any): Promise<Profile> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const deleteProfile = async (id: number): Promise<Profile> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const getProfileById = async (id: number): Promise<DetailedProfile> => {
  const token = `${process.env.TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.API_BASE_URL}/profiles/${id}`,
    options
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const getAvailableModules = async (id: number): Promise<ModulesData[]> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store" as RequestCache,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${id}/modules`,
    options
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const postProfileModule = async (
  profileId: number,
  data: CreateModuleProfileData
): Promise<ProfileModule[]> => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profileId}/modules`,
    options
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

const ProfilesService = {
  getProfiles,
  deleteProfile,
  updateProfile,
  createProfile,
  getProfileById,
  getAvailableModules,
  postProfileModule,
};

export default ProfilesService;
