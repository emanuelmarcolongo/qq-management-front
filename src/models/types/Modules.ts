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
