import max from "lodash/max";
import min from "lodash/min";

import {
  AssessmentApplicationProps,
  Difficulty,
  Task,
} from "../../pages/learning-modules/[learning_module]/[assessment_application]";
import CustomType from "../../types/CustomType";

interface MetricGroups {
  uid: string;
  difficulties: Difficulty[];
  minimumAges: number[];
  maximumAges: number[];
  units: number;
}

export interface ApplicationStats {
  uid: string;
  difficulty: string;
  age: string;
  units: number;
}

const groupApplicationMetrics = (
  applications: CustomType<AssessmentApplicationProps>[]
): MetricGroups[] | [] =>
  applications.reduce((acc: MetricGroups[] | [], application) => {
    if (!application.data) return acc;

    return [
      ...acc,
      application.data?.slices.reduce(
        (acc: MetricGroups, { primary }: Task, index, array) => {
          return {
            ...acc,
            difficulties: [...acc.difficulties, primary.taskDifficulty],
            minimumAges: [...acc.minimumAges, primary.minimumAge],
            maximumAges: [...acc.maximumAges, primary.maximumAge],
            units: array.length,
          };
        },
        {
          uid: application.uid,
          difficulties: [],
          minimumAges: [],
          maximumAges: [],
          units: 0,
        }
      ),
    ];
  }, []);

const getApplicationAverages = (
  applications: CustomType<AssessmentApplicationProps>[]
): ApplicationStats[] | [] => {
  if (!applications.length) return [];
  const metricGroups = groupApplicationMetrics(applications);

  if (!metricGroups) return [];

  return metricGroups
    .filter((group) => group)
    .reduce((acc: ApplicationStats[] | [], group: MetricGroups) => {
      if (!group) return acc;
      return [
        ...acc,
        {
          uid: group.uid,
          difficulty: group.difficulties[0], // TODO - get the average difficulty here
          age: `${min(group.minimumAges)} - ${max(group.maximumAges)}`,
          units: group.units,
        },
      ];
    }, []);
};

export default getApplicationAverages;
