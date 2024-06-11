export interface Profile {
  id: number;
  name: string;
  description: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProfileData {
  name: string;
  description?: string;
}

export interface DetailedProfile {
  id: number;
  name: string;
  description: string | null;
  modules: ModuleDetail[];
}

export interface ProfileModule {
  id: number;
  profile_id: number;
  module_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProfileTransaction {
  id: number;
  profile_id: number;
  transaction_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProfileFunction {
  id: number;
  profile_id: number;
  transaction_id: number;
  function_id: number;
  created_at: Date;
  updated_at: Date;
}

interface ModuleDetail {
  id: number;
  name: string;
  description: string | null;
  transactions: TransactionDetail[];
}

interface TransactionDetail {
  id: number;
  name: string;
  description: string | null;
  functions: FunctionDetail[];
}

interface FunctionDetail {
  id: number;
  name: string;
  description: string | null;
}

export interface CreateModuleProfileData {
  moduleIds: number[];
}

export interface CreateProfileTransactionData {
  transactionIds: number[];
}
