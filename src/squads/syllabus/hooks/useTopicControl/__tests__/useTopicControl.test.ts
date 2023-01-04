import { Features } from "src/common/constants/enum";

import { ActionTypes } from "..";
import useTopicControl from "../useTopicControl";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => jest.fn());

interface FeatureFlagTestCases {
    name: string;
    flag: Features;
    key: ActionTypes;
}

const featureFlagTestCases: FeatureFlagTestCases[] = [
    {
        name: "exam LO",
        flag: Features.EXAM_LO_MANAGEMENT,
        key: ActionTypes.EXAM_LO,
    },
    {
        name: "offline study plan",
        flag: Features.OFFLINE_STUDY_MANAGEMENT,
        key: ActionTypes.OFFLINE_STUDY,
    },
    {
        name: "assignment",
        flag: Features.ASSIGNMENT_MANAGEMENT,
        key: ActionTypes.ASSIGNMENT,
    },
    {
        name: "flashcard",
        flag: Features.FLASHCARD_MANAGEMENT,
        key: ActionTypes.FLASH_CARD,
    },
    {
        name: "task_assignment",
        flag: Features.TASK_ASSIGNMENT_MANAGEMENT,
        key: ActionTypes.TASK_ASSIGNMENT,
    },
];

describe(useTopicControl.name, () => {
    it("should always enable for learning objective", () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({
            isEnabled: false,
        });

        const {
            result: { current },
        } = renderHook(() => useTopicControl());

        expect(current.configKeys["LO"]).toEqual(true);
    });

    featureFlagTestCases.forEach(({ flag, key, name }) => {
        it(`should disable ${name} when feature flag ${flag} is disabled`, () => {
            (useFeatureToggle as jest.Mock).mockReturnValue({
                isEnabled: false,
            });

            const {
                result: { current },
            } = renderHook(() => useTopicControl());

            expect(current.configKeys[key]).toEqual(false);
        });

        it(`should enable ${name} when feature flag ${flag} is enable`, () => {
            (useFeatureToggle as jest.Mock).mockImplementation(
                (...params: Parameters<typeof useFeatureToggle>) => {
                    const [featureFlag] = params;
                    if (flag === featureFlag)
                        return {
                            isEnabled: true,
                        };
                    return {
                        isEnabled: false,
                    };
                }
            );

            const {
                result: { current },
            } = renderHook(() => useTopicControl());

            expect(current.configKeys[key]).toEqual(true);
        });
    });
});
