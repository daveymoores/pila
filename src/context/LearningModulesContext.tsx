import React from "react";

import { LearningModule } from "../../slices/PoweredByResearchSection";
import CustomType from "../../types/CustomType";

const LearningModulesContext = React.createContext<
  [] | CustomType<LearningModule>[]
>([]);

export default LearningModulesContext;
