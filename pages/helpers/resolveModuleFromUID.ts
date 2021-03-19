import { LearningModule } from "../../slices/PoweredByResearchSection";
import CustomType from "../../types/CustomType";
import { LearningModuleProps } from "../learning-modules/[learning_module]";
import parseLearningModules from "./parseLearningModules";

export const resolveModuleFromUID = (
  uid: string | undefined,
  modules: CustomType<LearningModuleProps>[]
) => {
  const parsedModules = parseLearningModules(modules);
  return parsedModules.find(
    (parsedModule): boolean =>
      !!parsedModule.applications?.find((app) => app === uid)
  )?.module;
};

export default resolveModuleFromUID;
