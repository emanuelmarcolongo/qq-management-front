import { ModulesData } from "./Modules";

export interface CreateTransaction {
  name: string;
  description?: string;
  module_id: number;
}

export interface TransactionWithModule {
  id: number;
  name: string;
  description: string;
  module_id: number;
  created_at: Date;
  updated_at: Date;
  module: ModulesData;
}
