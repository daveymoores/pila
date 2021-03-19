import CustomType from "../../types/CustomType";
import { LearningModuleProps } from "../learning-modules/[learning_module]";

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
            return application.assessmentApplication.uid;
          }),
        };
      })
    : [];

export default parseLearningModules;
