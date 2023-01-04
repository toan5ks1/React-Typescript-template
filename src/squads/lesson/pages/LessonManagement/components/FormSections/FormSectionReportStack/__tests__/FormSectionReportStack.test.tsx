import { generateSampleStudent } from "src/squads/lesson/test-utils/lesson-management";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";

import FormSectionReportStack, {
    FormSectionReportStackProps,
} from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionReportStack";

import { render, screen } from "@testing-library/react";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: () => jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/usePreviousLessonReport", () => {
    return {
        __esModule: true,
        default: () => ({ dynamicValues: {}, attendanceValues: {}, formConfigId: "Id" }),
    };
});

jest.mock("src/squads/lesson/hooks/useGetPartnerFormConfigById", () => {
    return {
        __esModule: true,
        default: () => ({ dataConfig: [] }),
    };
});

describe("FormSectionReportStack", () => {
    const studentsList = [generateSampleStudent("1"), generateSampleStudent("2")];
    const unSelectedStudent = studentsList[0];
    const selectedStudent = studentsList[1];

    const props: FormSectionReportStackProps = {
        lessonId: "Lesson_Id",
        lessonReportId: "Lesson_Report_Id",
        partnerFormConfig: mockDataConfig,
        students: studentsList,
        selectedStudent,
    };

    it("should show selected student form", () => {
        render(
            <TestQueryWrapper>
                <TestHookFormProvider>
                    <FormSectionReportStack {...props} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        );

        const selectedStudentHeading = screen.getByRole("heading", {
            name: selectedStudent.user.name,
        });

        expect(selectedStudentHeading).toBeInTheDocument();

        const unSelectedStudentHeading = screen.queryByRole("heading", {
            name: unSelectedStudent.user.name,
            hidden: true,
        });

        expect(unSelectedStudentHeading).toBeInTheDocument();
    });
});
