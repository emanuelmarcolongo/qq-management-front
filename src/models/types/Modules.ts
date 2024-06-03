export interface ModulesData {
  id: number;
  name: string;
  description?: string;
  text_color: string;
  background_color: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateModuleData {
  name: string;
  description?: string;
  text_color?: string;
  background_color?: string;
}

export interface Function {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
}

export interface Transaction {
  id: number;
  name: string;
  description: string;
  created_at: Date;
}

export interface DetailedModule extends ModulesData {
  functions: Function[];
  transactions: Transaction[];
}
