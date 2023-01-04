import { ProviderTypes } from "src/common/constants/enum";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getCallParamsAt, getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import {
    generateStudyPlanOneQuery,
    generateStudyPlanPayload,
    mockCourseId,
    mockStudyPlanFormData,
} from "src/squads/syllabus/test-utils/study-plan";

import { StudyPlanStatusKey } from "../../../pages/StudyPlan/common/constants";
import useStudyPlanMutation, { UseStudyPlanMutationReturn } from "../useStudyPlanMutation";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("../../useShowSnackbar");
jest.mock("../../useBasicContent");
jest.mock("src/squads/syllabus/services/infer-mutation");

const mockActiveCourseStudyPlanData = generateStudyPlanOneQuery({});

const mockArchivedCourseStudyPlanData = generateStudyPlanOneQuery({
    statusKey: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
});

const mockStudyPlanMutation = jest.fn();
const mockBookMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        studyPlan: mockStudyPlanMutation,
        book: mockBookMutation,
    });
};

describe(useStudyPlanMutation.name, () => {
    const mockStudyPlanMutate = jest.fn();
    const mockBookMutate = jest.fn();

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        mockStudyPlanMutation.mockReturnValue({
            mutate: mockStudyPlanMutate,
        });
        mockBookMutation.mockReturnValue({
            mutate: mockBookMutate,
        });
    });
    it("should add book to course before creating study plan", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useStudyPlanMutation({
                action: ProviderTypes.CREATE,
                courseId: mockCourseId,
                studyPlanId: undefined,
            })
        );

        const { createStudyPlan } = current;

        const formData: Parameters<UseStudyPlanMutationReturn["createStudyPlan"]>[0] =
            mockStudyPlanFormData;

        createStudyPlan(formData, {});

        expect(mockBookMutate).toBeCalled();

        const expectedPayload: NsSyllabus_Yasuo_CoursesService.AddBooksToCourse = {
            courseId: mockCourseId,
            bookIdsList: [mockStudyPlanFormData.book!.book_id],
        };

        expect(getCallParamsAt(mockBookMutate, 0)[0]).toEqual(expectedPayload);
    });

    it("should create a study plan with active status", () => {
        const expectedPayload = generateStudyPlanPayload({});

        const {
            result: { current },
        } = renderHook(() =>
            useStudyPlanMutation({
                action: ProviderTypes.CREATE,
                courseId: mockCourseId,
                studyPlanId: undefined,
            })
        );

        const { createStudyPlan } = current;

        const formData: Parameters<UseStudyPlanMutationReturn["createStudyPlan"]>[0] =
            mockStudyPlanFormData;

        createStudyPlan(formData, {});

        const options = getCallParamsAt(mockBookMutate, 0)[1];

        options.onSuccess();

        expect(getLatestCallParams(mockStudyPlanMutate)[0]).toEqual(expectedPayload);
    });

    it("should edit a study plan with active status", () => {
        const expectedPayload = generateStudyPlanPayload({
            studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
        });

        const {
            result: { current },
        } = renderHook(() =>
            useStudyPlanMutation({
                action: ProviderTypes.UPDATE,
                courseId: String(mockActiveCourseStudyPlanData.course_id),
                studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
            })
        );

        const { updateStudyPlan } = current;

        updateStudyPlan(mockStudyPlanFormData, {});

        expect(getLatestCallParams(mockStudyPlanMutate)[0]).toEqual(expectedPayload);
    });

    it("should archive a study plan with archived status", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useStudyPlanMutation({
                action: ProviderTypes.UPDATE,
                courseId: String(mockActiveCourseStudyPlanData.course_id),
                studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
            })
        );

        const { archiveStudyPlan } = current;

        archiveStudyPlan(
            {
                ...mockActiveCourseStudyPlanData,
                status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
            },
            {}
        );

        const expectedPayload = generateStudyPlanPayload({
            studyPlanId: mockActiveCourseStudyPlanData.study_plan_id,
            statusKey: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
        });

        expect(getLatestCallParams(mockStudyPlanMutate)[0]).toEqual(expectedPayload);
    });

    it("should activate a study plan with active status", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useStudyPlanMutation({
                action: ProviderTypes.UPDATE,
                courseId: String(mockArchivedCourseStudyPlanData.course_id),
                studyPlanId: mockArchivedCourseStudyPlanData.study_plan_id,
            })
        );

        const { activateStudyPlan } = current;

        activateStudyPlan(
            {
                ...mockArchivedCourseStudyPlanData,
                status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
            },
            {}
        );

        const expectedPayload = generateStudyPlanPayload({
            studyPlanId: mockArchivedCourseStudyPlanData.study_plan_id,
            statusKey: "STUDY_PLAN_STATUS_ACTIVE",
        });

        expect(getLatestCallParams(mockStudyPlanMutate)[0]).toEqual(expectedPayload);
    });
});
