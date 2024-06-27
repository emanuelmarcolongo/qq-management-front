import {
  FunctionWithModule,
  MappedFunction,
} from "@/src/models/types/Functions";

export const mapFunctionData = (
  funcs: FunctionWithModule[]
): Partial<MappedFunction>[] => {
  return funcs.map(
    ({ id, name, module, module_id, description, created_at }) => ({
      id,
      name,
      module: module.name,
      description,
      module_id,
      created_at,
    })
  );
};
