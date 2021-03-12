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
  modules.map(
    (result): ModuleApplications => {
      return {
        module: result.uid,
        applications: result.data?.applications.map(
          (application: LinkedApplication) => {
            return application.assessment_application.uid;
          }
        ),
      };
    }
  );

export default parseLearningModules;