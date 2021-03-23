import React from "react";

import { LearningModuleProps } from "../../pages/learning-modules/[learning_module]";
import CustomType from "../../types/CustomType";

const LearningModulesContext = React.createContext<
  CustomType<LearningModuleProps>[]
>([]);

export default LearningModulesContext;
