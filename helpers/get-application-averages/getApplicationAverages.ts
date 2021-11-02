import max from "lodash/max";
import min from "lodash/min";
import sum from "lodash/sum";

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

const difficultyValues = {
  [Difficulty.EASY]: 1,
  [Difficulty.EASY_INTERMEDIATE]: 2,
  [Difficulty.INTERMEDIATE]: 3,
  [Difficulty.INTERMEDIATE_ADVANCED]: 4,
  [Difficulty.ADVANCED]: 5,
};

const getDifficultyValue = (difficulty: Difficulty): number => {
  return difficultyValues[difficulty];
};

const groupApplicationMetrics = (
  applications: CustomType<AssessmentApplicationProps>[]
): MetricGroups[] | [] =>
  applications.reduce((acc: MetricGroups[] | [], application) => {
    if (!application.data?.slices) return acc;

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

const getAverageDifficulty = (difficulties: Difficulty[]): string => {
  const totalDifficultyValue = sum(
    difficulties.map((difficulty: Difficulty) => getDifficultyValue(difficulty))
  );

  const averageDifficultyValue = Math.floor(
    totalDifficultyValue / difficulties.length
  );

  return (
    Object.entries(difficultyValues).find(
      ([, value]) => value === averageDifficultyValue
    ) || []
  ).shift() as string;
};

const getApplicationAverages = (
  applications: CustomType<AssessmentApplicationProps>[]
): ApplicationStats[] | [] => {
  if (!applications.length) return [];
  const metricGroups = groupApplicationMetrics(applications);

  if (!metricGroups) return [];

  return metricGroups
    .filter((group) => group)
    .reduce((acc: ApplicationStats[] | [], group: MetricGroups) => {
      const data = [
        group.difficulties,
        group.minimumAges,
        group.maximumAges,
        group.units,
      ];
      if (!group || data.some((data) => !data)) return acc;

      return [
        ...acc,
        {
          uid: group.uid,
          difficulty: getAverageDifficulty(group.difficulties),
          age: `${min(group.minimumAges)} - ${max(group.maximumAges)}`,
          units: group.units,
        },
      ];
    }, []);
};

export default getApplicationAverages;
