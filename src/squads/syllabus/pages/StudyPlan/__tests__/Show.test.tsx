import { PropsWithChildren } from "react";

import { KeyStudyPlanTypes } from "src/squads/syllabus/common/constants/const";
import { PaginationWithTotal } from "src/squads/syllabus/services/service-creator";
import { generateStudyPlanOneQuery } from "src/squads/syllabus/test-utils/study-plan";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import Show from "../Show";
import { StudyPlanStatusKey } from "../common/constants";
import useStudyPlanQuery from "../hooks/useStudyPlanQuery";

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockBookGetTitleData } from "src/squads/syllabus/services/eureka/book-service/__mocks__/book-service-query";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const defaultPagination: PaginationWithTotal = {
    count: -1,
    limit: 10,
    offset: 0,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
    page: 0,
    rowsPerPage: 10,
};

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference");
jest.mock("../../../hooks/useBasicContent");
jest.mock("../hooks/useStudyPlanQuery", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useConvertGrade", () => ({
    __esModule: true,
    default: () => ({
        convertGradeToString: () => [],
        convertGradesToArrayGradeObject: () => [],
    }),
}));
jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: () => () => ({
            data: mockBookGetTitleData(),
        }),
    };
});

const mockBookTitle = mockBookGetTitleData();

const mockActiveCourseStudyPlanData = generateStudyPlanOneQuery({});

const mockActiveStudentStudyPlanData = generateStudyPlanOneQuery({
    studyPlanTypeKey: KeyStudyPlanTypes.STUDY_PLAN_TYPE_INDIVIDUAL,
});

const mockArchivedCourseStudyPlanData = generateStudyPlanOneQuery({
    statusKey: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
});

const CustomTestApp = ({ children }: PropsWithChildren<{}>) => (
    <TestAppWithQueryClient>
        <CommonTranslationProvider>{children}</CommonTranslationProvider>
    </TestAppWithQueryClient>
);

describe(Show.name, () => {
    it("should render book name correctly", () => {
        const useStudyPlanQueryMock = useStudyPlanQuery as jest.Mock;

        useStudyPlanQueryMock.mockImplementation(() => ({
            studyPlan: mockActiveCourseStudyPlanData,
            pagination: defaultPagination,
            studyPlanItemsByTopic: [],
        }));

        let wrapper = render(<Show />, { wrapper: CustomTestApp });

        expect(wrapper.getByTestId("StudyPlanInfo__bookLink")).toHaveTextContent(
            mockBookTitle.name
        );
    });

    it("should render controls correctly based on study plan status", () => {
        const useStudyPlanQueryMock = useStudyPlanQuery as jest.Mock;

        useStudyPlanQueryMock.mockImplementation(() => ({
            studyPlan: mockActiveCourseStudyPlanData,
            pagination: defaultPagination,
            studyPlanItemsByTopic: [],
        }));

        let wrapper = render(<Show />, { wrapper: CustomTestApp });

        expect(wrapper.getByTestId("ActionPanel__root")).toBeInTheDocument();

        wrapper.unmount();

        useStudyPlanQueryMock.mockImplementation(() => ({
            studyPlan: mockActiveStudentStudyPlanData,
            pagination: defaultPagination,
            studyPlanItemsByTopic: [],
        }));

        wrapper = render(<Show />, { wrapper: CustomTestApp });

        expect(wrapper.queryByTestId("ActionPanel__root")).toBeNull();
    });

    it("should render loading progress when it is still querying", () => {
        (useStudyPlanQuery as jest.Mock).mockReturnValue({
            isFetching: true,
            pagination: defaultPagination,
            studyPlanItemsByTopic: [],
        });

        const { getByRole } = render(<Show />, { wrapper: CustomTestApp });

        expect(getByRole("progressbar")).toBeInTheDocument();
    });

    it("should render nothing when study plan cannot be found", () => {
        (useStudyPlanQuery as jest.Mock).mockReturnValue({
            isFetching: false,
            pagination: defaultPagination,
        });

        const { container } = render(<Show />, { wrapper: CustomTestApp });

        expect(container).toBeEmptyDOMElement();
    });

    it("should open edit dialog with active master study plan", () => {
        (useStudyPlanQuery as jest.Mock).mockImplementation(() => ({
            studyPlan: mockActiveCourseStudyPlanData,
            pagination: defaultPagination,
            studyPlanItemsByTopic: [],
        }));

        const { getByTestId, getByText } = render(<Show />, { wrapper: CustomTestApp });

        userEvent.click(getByTestId("ActionPanel__trigger"));

        const editButton = within(getByTestId("ActionPanel__menuList")).getByLabelText("Edit");
        expect(editButton).toBeEnabled();
        userEvent.click(editButton);

        expect(getByText("Edit study plan general information")).toBeInTheDocument();
    });

    it("should disable edit study plan item with archived master study plan", () => {
        const mockRefetchStudyPlan = jest.fn();

        (useStudyPlanQuery as jest.Mock).mockImplementation(() => ({
            studyPlan: mockArchivedCourseStudyPlanData,
            pagination: defaultPagination,
            refetchStudyPlan: mockRefetchStudyPlan,
            studyPlanItemsByTopic: [],
        }));

        const { getByTestId } = render(<Show />, { wrapper: CustomTestApp });

        expect(
            within(getByTestId("StudyPlanItemTableAction__root")).getByRole("checkbox")
        ).toBeDisabled();
        expect(
            within(getByTestId("StudyPlanItemTableAction__root")).getByLabelText("Edit")
        ).toBeDisabled();
    });
});
