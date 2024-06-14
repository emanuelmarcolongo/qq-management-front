import { Function, ModulesData } from "./Modules";

export interface CreateFunction {
  name: string;
  description?: string;
  module_id: number;
}

export interface UpdateFunction {
  name: string;
  description?: string;
}

export interface FunctionWithModule {
  id: number;
  name: string;
  description: string;
  module_id: number;
  created_at: Date;
  updated_at: Date;
  module: ModulesData;
}
