import { LearningModuleProps } from "../../pages/learning-modules/[learning_module]";
import CustomType from "../../types/CustomType";
import parseLearningModules from "../parse-learning-modules/parseLearningModules";

export const resolveModuleFromUID = (
  uid: string | undefined,
  modules: CustomType<LearningModuleProps>[]
): string | undefined => {
  const parsedModules = parseLearningModules(modules);
  return parsedModules.find(
    (parsedModule): boolean =>
      !!parsedModule.applications?.find((app) => app === uid)
  )?.module;
};

export default resolveModuleFromUID;
