import { LearningModule } from "../../slices/PoweredByResearchSection";
import CustomType from "../../types/CustomType";
import parseLearningModules from "./parseLearningModules";

export const resolveModuleFromUID = (
  uid: string | undefined,
  modules: CustomType<LearningModule>[]
) => {
  const parsedModules = parseLearningModules(modules);
  return parsedModules.find(
    (parsedModule): boolean =>
      !!parsedModule.applications.find((app) => app === uid)
  )?.module;
};

export default resolveModuleFromUID;
