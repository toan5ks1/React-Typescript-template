import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { TestApp } from "src/squads/lesson/test-utils";

import DetailSectionLessonStudents, {
    DetailSectionLessonStudentsProps,
} from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonStudents";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import { UsePaginationOptions } from "src/squads/lesson/hooks/data/usePagination";
import { lessonData } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";

jest.mock(
    "src/squads/lesson/hooks/data/usePagination",
    () => (defaultOption: UsePaginationOptions) => {
        return {
            offset: defaultOption.defaultOffset,
            page: 0,
            limit: defaultOption.defaultLimit,
            rowsPerPage: defaultOption.defaultLimit,
            onPageChange: jest.fn(),
            onRowsPerPageChange: jest.fn(),
        };
    }
);

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

const renderDetailSectionLessonStudents = (props: DetailSectionLessonStudentsProps) =>
    render(
        // TODO: remove TranslationProvider when we clone or share TableBaseBody component
        <TranslationProvider>
            <TestApp>
                <DetailSectionLessonStudents {...props} />
            </TestApp>
        </TranslationProvider>
    );
describe("<DetailSectionLessonStudents /> component renders", () => {
    const props: DetailSectionLessonStudentsProps = {
        lessonMembers: lessonData.lesson_members,
        isLoading: false,
    };

    beforeEach(() => {
        renderDetailSectionLessonStudents(props);
    });

    it("should render title correctly", () => {
        expect(screen.getByTestId("DetailSectionLessonStudents__root")).toBeInTheDocument();
        expect(
            screen.getByText(`Student Info (${props.lessonMembers.length})`)
        ).toBeInTheDocument();
    });

    it("should render correct href", () => {
        const studentNames = screen.getAllByTestId(
            "DetailSectionLessonStudents__columnStudentName"
        );

        studentNames.forEach((studentName, index) => {
            const correctUrl = `/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${lessonData.lesson_members[index].user.user_id}/show`;
            expect(studentName).toHaveAttribute("href", correctUrl);
        });
    });

    it("should render 4 columns correctly", () => {
        expect(screen.getByText("Student Name")).toBeInTheDocument();
        expect(screen.getByText("Grade")).toBeInTheDocument();
        expect(screen.getByText("Course")).toBeInTheDocument();
        expect(screen.getByText("Attendance")).toBeInTheDocument();
    });

    it("should render value at columns correctly ", () => {
        lessonData.lesson_members.forEach((member) => {
            expect(screen.getByText(member.user.name)).toBeInTheDocument();
            expect(screen.getByText(`${member.course?.name}`)).toBeInTheDocument();
            expect(
                screen.getByText(String(member.user.student?.current_grade))
            ).toBeInTheDocument();
        });
        expect(screen.getByText("Attend")).toBeInTheDocument();
        expect(screen.getByText("Late")).toBeInTheDocument();
        expect(screen.getByText("Leave Early")).toBeInTheDocument();
    });

    it("should show number of students correctly", () => {
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(
            lessonData.lesson_members.length
        );
    });
});

describe("<DetailSectionLessonStudents /> component renders loading", () => {
    const props: DetailSectionLessonStudentsProps = {
        lessonMembers: lessonData.lesson_members,
        isLoading: true,
    };

    beforeEach(() => {
        renderDetailSectionLessonStudents(props);
    });

    it("should render loading", () => {
        expect(screen.getAllByTestId("TableSke__item")).toHaveLength(3);
    });
});

describe("<DetailSectionLessonStudents /> component renders no data", () => {
    const props: DetailSectionLessonStudentsProps = {
        lessonMembers: [],
        isLoading: false,
    };

    beforeEach(() => {
        renderDetailSectionLessonStudents(props);
    });

    it("should render no data message", () => {
        expect(screen.getByText("ra.message.noDataInformation")).toBeInTheDocument();
    });
});
