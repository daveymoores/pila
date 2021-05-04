import { LearningModuleProps } from "../../pages/learning-modules/[learning_module]";
import CustomType from "../../types/CustomType";

export interface ModuleApplications {
  module: string | undefined;
  applications: undefined | string[];
}

const parseLearningModules = (
  modules: CustomType<LearningModuleProps>[]
): ModuleApplications[] =>
  modules
    ? modules.map((result) => {
        return {
          module: result.uid,
          applications: result.data?.applications.map((application) => {
            return application.uid;
          }),
        };
      })
    : [];

export default parseLearningModules;
