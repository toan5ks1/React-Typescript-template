import { generateStudyPlanOneQuery } from "src/squads/syllabus/test-utils/study-plan";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import { StudyPlanStatusKey } from "../../../common/constants";
import StudyPlanAction, { StudyPlanActionProps } from "../StudyPlanAction";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useStudyPlanMutation from "src/squads/syllabus/hooks/useStudyPlanMutation";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useStudyPlanMutation", () => jest.fn());

const mockActiveCourseStudyPlanData = generateStudyPlanOneQuery({});

const mockArchivedCourseStudyPlanData = generateStudyPlanOneQuery({
    statusKey: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
});

describe(StudyPlanAction.name, () => {
    it("should call handleOpenEditStudyPlanDialog function on edit action", () => {
        const defaultProps: StudyPlanActionProps = {
            studyPlan: mockActiveCourseStudyPlanData,
            refetchStudyPlan: () => {},
            handleOpenEditStudyPlanDialog: jest.fn(),
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => ({}));

        const { getByTestId, getByLabelText } = render(
            <CommonTranslationProvider>
                <StudyPlanAction {...defaultProps} />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        userEvent.click(getByTestId("ActionPanel__trigger"));
        expect(getByLabelText("Edit")).toBeEnabled();
        expect(getByLabelText("Archive")).toBeEnabled();

        userEvent.click(getByLabelText("Edit"));

        expect(defaultProps.handleOpenEditStudyPlanDialog).toHaveBeenCalled();
    });

    it("should archive study plan with active status on archive action", () => {
        const mockArchiveStudyPlan = jest.fn();
        const defaultProps: StudyPlanActionProps = {
            studyPlan: mockActiveCourseStudyPlanData,
            refetchStudyPlan: jest.fn(),
            handleOpenEditStudyPlanDialog: () => {},
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return { archiveStudyPlan: mockArchiveStudyPlan };
        });

        const { getByTestId, getByLabelText } = render(
            <CommonTranslationProvider>
                <StudyPlanAction {...defaultProps} />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        userEvent.click(getByTestId("ActionPanel__trigger"));
        expect(getByLabelText("Edit")).toBeEnabled();

        userEvent.click(getByLabelText("Archive"));

        expect(mockArchiveStudyPlan).toHaveBeenCalled();
    });

    it("should activate study plan with archive status on unarchive action", () => {
        const mockActivateStudyPlan = jest.fn();
        const defaultProps: StudyPlanActionProps = {
            studyPlan: mockArchivedCourseStudyPlanData,
            refetchStudyPlan: jest.fn(),
            handleOpenEditStudyPlanDialog: () => {},
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return { activateStudyPlan: mockActivateStudyPlan };
        });

        const { getByTestId, getByLabelText } = render(
            <CommonTranslationProvider>
                <StudyPlanAction {...defaultProps} />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        userEvent.click(getByTestId("ActionPanel__trigger"));
        expect(getByLabelText("Edit")).toHaveAttribute("aria-disabled", "true");

        userEvent.click(getByLabelText("Unarchive"));

        expect(mockActivateStudyPlan).toHaveBeenCalled();
    });
});
