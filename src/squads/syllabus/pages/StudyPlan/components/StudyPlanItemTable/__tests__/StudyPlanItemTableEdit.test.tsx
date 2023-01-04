import { useState } from "react";

import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import { StudyPlanItemStatusKey } from "../../../common/constants";
import { StudyPlanItemTableEdit, StudyPlanItemTableEditProps } from "../StudyPlanItemTableEdit";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useStudyPlanItemMutation from "src/squads/syllabus/pages/StudyPlan/hooks/useStudyPlanItemMutation";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/pages/StudyPlan/hooks/useStudyPlanItemMutation");

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: false }),
    };
});

const defaultProps: StudyPlanItemTableEditProps = {
    isEditing: true,
    isFetchingStudyPlanItems: false,
    isMasterStudyPlan: true,
    pagination: createFakePagination(),
    submitCount: 0,
    refetchStudyPlanItems: jest.fn(),
    onChangeSubmitCount: jest.fn(),
    onChangeIsEdit: jest.fn(),
    studyPlanId: "studyPlanId",
    studyPlanItems: [],
};

const renderUtil = (overrides: Partial<StudyPlanItemTableEditProps> = {}) => {
    const WrapperComponent = () => {
        const [submitCount, setSubmitCount] = useState(
            overrides.submitCount || defaultProps.submitCount
        );
        const finalProps: StudyPlanItemTableEditProps = {
            ...defaultProps,
            ...overrides,
        };
        return (
            <div>
                <button
                    data-testid="Submit_btn"
                    onClick={() => setSubmitCount((value) => value + 1)}
                >
                    Submit
                </button>
                <StudyPlanItemTableEdit {...finalProps} submitCount={submitCount} />
            </div>
        );
    };

    return render(
        <TestThemeProvider>
            <WrapperComponent />
        </TestThemeProvider>
    );
};

describe(StudyPlanItemTableEdit.name, () => {
    beforeEach(() => {
        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });
    });

    it("should call onChangeSubmitCount with 0 when unmount", () => {
        const onChangeSubmitCountFn = jest.fn();
        const { unmount } = renderUtil({
            onChangeSubmitCount: onChangeSubmitCountFn,
        });

        expect(onChangeSubmitCountFn).not.toBeCalled();

        unmount();

        expect(onChangeSubmitCountFn).toBeCalledWith(0);
    });

    it("shouldn't call submit form when submit count props change and equal with 0", async () => {
        renderUtil({
            submitCount: 0,
        });

        expect(screen.queryByTestId("DialogWithHeaderFooter__dialogTitle")).not.toBeInTheDocument();
    });

    it("should call submit form when submit count props change and not equal with 0", async () => {
        renderUtil({
            submitCount: 2,
        });

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        });
    });

    it("should render an error message if there is any error", async () => {
        renderUtil({
            studyPlanItems: [
                {
                    topicId: "Topic1",
                    topicName: "Topic 1",
                    studyPlanItems: [
                        {
                            study_plan_item_id: "StudyPlanItem1",
                            loName: "Learning Objective",
                            loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                            status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                            available_from: new Date(2010, 10, 10),
                            available_to: new Date(2010, 10, 10),
                            start_date: new Date(2010, 10, 10),
                            end_date: new Date(2010, 10, 12),
                        },
                    ],
                },
            ],
        });

        fireEvent.click(screen.getByTestId("Submit_btn"));

        const alert = await screen.findByRole("alert");

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(
            "resources.courses.studyPlan.error.dateFormatInvalidGeneric"
        );
    });

    it("should show correct dialog title and content for update individual study plan", async () => {
        renderUtil({
            isMasterStudyPlan: false,
        });

        fireEvent.click(screen.getByTestId("Submit_btn"));

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        });

        expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toHaveTextContent(
            "resources.courses.studyPlan.dialog.updateIndividualStudyPlanTitle"
        );

        expect(
            screen.getByText("resources.courses.studyPlan.dialog.updateIndividualStudyPlanMessage")
        ).toBeInTheDocument();
    });

    it("should call refetch study plan item after updateStudyPlanItems success", async () => {
        const refetchStudyPlanItemsFn = jest.fn();
        const updateStudyPlanItemsFn = jest.fn((_, { onSuccess }) => onSuccess());

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsFn,
        });

        renderUtil({
            studyPlanItems: [
                {
                    topicId: "Topic1",
                    topicName: "Topic 1",
                    studyPlanItems: [
                        {
                            study_plan_item_id: "StudyPlanItem1",
                            loName: "Learning Objective",
                            loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                            status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                            available_from: new Date(2010, 10, 10),
                            available_to: new Date(2012, 10, 10),
                            start_date: new Date(2011, 10, 10),
                            end_date: new Date(2011, 12, 12),
                        },
                    ],
                },
            ],
            refetchStudyPlanItems: refetchStudyPlanItemsFn,
            submitCount: 1,
        });

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(refetchStudyPlanItemsFn).toHaveBeenCalled();
        });
    });
});
