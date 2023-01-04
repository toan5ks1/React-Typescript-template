import { ModeOpenDialog } from "src/common/constants/enum";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import {
    generateStudyPlanOneQuery,
    mockCourseId,
    mockStudyPlanFormData,
} from "src/squads/syllabus/test-utils/study-plan";

import DialogUpsertStudyplan, { DialogUpsertStudyplanProps } from "../DialogUpsertStudyplan";

import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useStudyPlanMutation from "src/squads/syllabus/hooks/useStudyPlanMutation";
import { defaultStudyPlanFormValues } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference");

jest.mock("src/squads/syllabus/hooks/useStudyPlanMutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const mockActiveCourseStudyPlanData = generateStudyPlanOneQuery({});

describe(DialogUpsertStudyplan.name, () => {
    it("should disable save button when upsert in progress", () => {
        const defaultProps: DialogUpsertStudyplanProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onClose: () => {},
            courseId: mockCourseId,
            defaultValues: mockStudyPlanFormData,
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return {
                isLoadingBookMutation: true,
                isLoadingStudyPlanMutation: false,
            };
        });

        const { getByTestId } = render(<DialogUpsertStudyplan {...defaultProps} />, {
            wrapper: TestAppWithQueryClient,
        });

        expect(getByTestId("FooterDialogConfirm__buttonSave")).toBeDisabled();
    });

    it("should validate book association and study plan name field", async () => {
        const mockCreateStudyPlan = jest.fn();
        const defaultProps: DialogUpsertStudyplanProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onClose: () => {},
            courseId: mockCourseId,
            defaultValues: defaultStudyPlanFormValues,
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return {
                createStudyPlan: mockCreateStudyPlan,
                isLoadingBookMutation: false,
                isLoadingStudyPlanMutation: false,
            };
        });

        const { getByTestId } = render(<DialogUpsertStudyplan {...defaultProps} />, {
            wrapper: TestAppWithQueryClient,
        });

        userEvent.click(
            getByTestId("StudyPlanForm__trackSchoolProgress").querySelector(
                "input"
            ) as HTMLInputElement
        );
        userEvent.click(getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(mockCreateStudyPlan).not.toBeCalled();
        });

        expect(
            within(getByTestId("BooksAutocompleteHF__autocomplete")).getByText(
                "This field is required"
            )
        );
        expect(
            within(getByTestId("StudyPlanForm__studyPlanName")).getByText("This field is required")
        );
    });

    it("should save successfully when editing study plan", async () => {
        const mockUpdateStudyPlan = jest.fn();

        const defaultProps: DialogUpsertStudyplanProps = {
            mode: ModeOpenDialog.EDIT,
            open: true,
            onClose: jest.fn(),
            courseId: String(mockActiveCourseStudyPlanData.course_id),
            studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
            defaultValues: mockStudyPlanFormData,
            refetchStudyPlanInfo: jest.fn(),
        };

        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return {
                updateStudyPlan: mockUpdateStudyPlan,
                isLoadingStudyPlanMutation: false,
            };
        });

        const { getByTestId, getByText } = render(<DialogUpsertStudyplan {...defaultProps} />, {
            wrapper: TestAppWithQueryClient,
        });

        expect(getByText("Edit study plan general information")).toBeInTheDocument();

        userEvent.click(getByTestId("StudyPlanForm__trackSchoolProgress"));
        userEvent.click(getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            getLatestCallParams(mockUpdateStudyPlan)[1].onSuccess();
        });

        expect(defaultProps.refetchStudyPlanInfo).toBeCalled();
        expect(defaultProps.onClose).toBeCalled();
    });

    it("should save successfully without grades and track school progress", async () => {
        const mockCreateStudyPlan = jest.fn();
        const mockExpectedPath = `/syllabus/study_plans/${mockActiveCourseStudyPlanData.study_plan_id}/show?courseId=${mockActiveCourseStudyPlanData.course_id}`;

        const defaultProps: DialogUpsertStudyplanProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onClose: () => {},
            courseId: mockCourseId,
            defaultValues: {
                name: "",
                book: mockStudyPlanFormData.book,
                grades: [],
                trackSchoolProgress: false,
            },
        };

        mockUseNavigation();
        (useStudyPlanMutation as jest.Mock).mockImplementation(() => {
            return {
                createStudyPlan: mockCreateStudyPlan,
                isLoadingBookMutation: false,
                isLoadingStudyPlanMutation: false,
            };
        });

        const { getByTestId, getByText } = render(<DialogUpsertStudyplan {...defaultProps} />, {
            wrapper: TestAppWithQueryClient,
        });

        expect(getByText("Add study plan")).toBeInTheDocument();

        userEvent.type(
            getByTestId("StudyPlanForm__studyPlanName").querySelector(
                "input[name='name']"
            ) as HTMLInputElement,
            mockStudyPlanFormData.name
        );

        userEvent.click(getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            getLatestCallParams(mockCreateStudyPlan)[1].onSuccess({
                studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
            });
        });

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPath);
    });
});
