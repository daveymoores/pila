import React from "react";

import { AssessmentApplicationProps } from "../../pages/learning-modules/[learning_module]/[assessment_application]";
import CustomType from "../../types/CustomType";

const AssessmentApplicationContext = React.createContext<
  [] | CustomType<AssessmentApplicationProps>[]
>([]);

export default AssessmentApplicationContext;
