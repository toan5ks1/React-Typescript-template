import { generateSampleStudent } from "src/squads/lesson/test-utils/lesson-management";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";

import FormReportDetailInd, {
    FormReportDetailIndProps,
} from "src/squads/lesson/pages/LessonManagement/components/Forms/FormReportDetailInd";

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

describe("FormReportDetailInd", () => {
    const props: FormReportDetailIndProps = {
        lessonId: "Lesson_Id",
        lessonReportId: "Lesson_Report_Id",
        reportIndex: 0,
        student: generateSampleStudent("1"),
        configSections: mockDataConfig.form_config_data?.sections,
        isVisible: true,
    };

    it("should show student report form", () => {
        render(
            <TestQueryWrapper>
                <TestHookFormProvider>
                    <FormReportDetailInd {...props} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        );

        const studentReportForm = screen.getByTestId(
            `FormReportDetailInd__formDetail.${props.reportIndex}`
        );

        expect(studentReportForm).toHaveStyle("display: block");
    });

    it("should hide student report form", () => {
        render(
            <TestQueryWrapper>
                <TestHookFormProvider>
                    <FormReportDetailInd {...props} isVisible={false} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        );

        const studentReportForm = screen.getByTestId(
            `FormReportDetailInd__formDetail.${props.reportIndex}`
        );

        expect(studentReportForm).toHaveStyle("display: none");
    });
});
