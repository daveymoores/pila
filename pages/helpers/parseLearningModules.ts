import { LearningModule } from "../../slices/PoweredByResearchSection";
import CustomType from "../../types/CustomType";
import LinkedApplication from "../../types/LinkedApplication";

export interface ModuleApplications {
  module: string | undefined;
  applications: string[];
}

const parseLearningModules = (
  modules: CustomType<LearningModule>[]
): ModuleApplications[] =>
  modules
    ? modules.map(
        (result): ModuleApplications => {
          return {
            module: result.uid,
            applications: result.data?.applications.map(
              (application: LinkedApplication) => {
                return application.assessmentApplication.uid;
              }
            ),
          };
        }
      )
    : [];

export default parseLearningModules;
