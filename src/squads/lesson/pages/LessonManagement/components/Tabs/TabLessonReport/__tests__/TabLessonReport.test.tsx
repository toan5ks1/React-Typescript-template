import { LessonReportBusinessRuleFieldIds, DynamicSection } from "src/squads/lesson/common/types";
import {
    testDynamicValueOnLessonReportDetailComponents,
    createMockPartnerDomain,
    createMockUsePreviousLessonReport,
    createMockUseGetPartnerFormConfigById,
} from "src/squads/lesson/test-utils/lesson-management";
import { createMockStudentLists } from "src/squads/lesson/test-utils/lesson-report";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import TabLessonReport, {
    TabLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonReport";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, fireEvent, within, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useLocale from "src/squads/lesson/hooks/useLocale";
import {
    lessonData,
    lessonReports,
} from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import useMutationLessonIndividualReport, {
    DeleteLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

const mockLessonData = lessonData;
const mockLessonReports = lessonReports[0];
const mockStudentList = createMockStudentLists();
const mockPartnerDomain = createMockPartnerDomain();
const mockPreviousReport = createMockUsePreviousLessonReport();
const mockGetPartnerFormConfig = createMockUseGetPartnerFormConfigById();

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails", () => {
    return () => ({
        lessonData: mockLessonData,
        lessonReports: mockLessonReports,
    });
});

jest.mock("src/squads/lesson/hooks/useCreateViewStudyPlanLink", () => {
    return () => mockPartnerDomain;
});

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

jest.mock("src/squads/lesson/hooks/usePreviousLessonReport", () => {
    return () => mockPreviousReport;
});

jest.mock("src/squads/lesson/hooks/useGetPartnerFormConfigById", () => {
    return () => mockGetPartnerFormConfig;
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport", () =>
    jest.fn()
);

const props: TabLessonReportProps = {
    isInLessonManagement: true,
    lessonData: mockLessonData,
    isLoading: false,
    lessonReports: mockLessonReports,
    onEditLessonReport: jest.fn(),
};

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const mockUseMutationLessonReport = () => {
    (useMutationLessonIndividualReport as jest.Mock).mockImplementation(() => {
        return {
            onDeleteLessonReport: (param: DeleteLessonReportProps) => {
                param.onSuccess?.();
            },
        };
    });
};

const renderTabLessonReportWrapper = () => {
    return render(
        <TestThemeProvider>
            <TestQueryWrapper>
                <TranslationProvider>
                    <TabLessonReport {...props} />
                </TranslationProvider>
            </TestQueryWrapper>
        </TestThemeProvider>
    );
};

describe("<TabLessonReport /> show content", () => {
    beforeEach(() => {
        mockUseMutationLessonReport();
        renderTabLessonReportWrapper();
    });

    it("should render submitting status is Submitted and title Report Detail", () => {
        const submittedStatus = screen.getByText("Submitted");
        const reportDetail = screen.getByText("Report Detail");

        expect(submittedStatus).toBeInTheDocument();
        expect(reportDetail).toBeInTheDocument();
    });

    it("should render 3 student name in students list", () => {
        const studentsList = screen.getByTestId("ListStudent__root");

        expect(studentsList).toBeInTheDocument();
        expect(screen.getAllByTestId("ListStudent__listItem")).toHaveLength(
            props.lessonData.lesson_members.length
        );

        expect(props.lessonData.lesson_members).toHaveLength(3);
        props.lessonData.lesson_members.forEach((student) => {
            expect(within(studentsList).getByText(student.user.name)).toBeInTheDocument();
        });
    });
});

const testRenderAllStudentsWithLabelBasedOnLanguage = (
    wrapper: RenderResult,
    language: LanguageEnums
) => {
    const mockSections = mockLessonReports.partner_form_config?.form_config_data.sections;
    const mockAttendanceStatusValues = ["Attend", "Late", "Leave Early"];

    expect(mockSections.length).toBeGreaterThan(0);
    mockSections.forEach((section: DynamicSection) => {
        section.fields.forEach((field) => {
            testDynamicValueOnLessonReportDetailComponents(wrapper, language, field);
        });
    });

    expect(mockStudentList).toHaveLength(3);
    mockStudentList.forEach((student, index) => {
        const currentStudent = screen.getAllByTestId("ListStudent__listItem")[index];

        fireEvent.click(currentStudent);
        student.dynamicLessonReportData.forEach((data) => {
            if (data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS) {
                const attendanceStatusValue = screen.getByText(mockAttendanceStatusValues[index]);

                expect(attendanceStatusValue).toBeInTheDocument();
                return;
            }

            expect(screen.getByText(data.value)).toBeInTheDocument();
        });
    });
};

describe("<TabLessonReport /> show content based on language mode", () => {
    beforeEach(() => {
        mockUseMutationLessonReport();
    });

    it("should render all students with labels and corresponding values in the fields of the form config in English", () => {
        const language = LanguageEnums.EN;
        mockLanguageMode(language);
        const wrapper = renderTabLessonReportWrapper();

        testRenderAllStudentsWithLabelBasedOnLanguage(wrapper, language);
    });

    it("should render all students with labels and corresponding values in the fields of the form config in Japanese", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);
        const wrapper = renderTabLessonReportWrapper();

        testRenderAllStudentsWithLabelBasedOnLanguage(wrapper, language);
    });
});

describe("<TabLessonReport /> editable", () => {
    beforeEach(() => {
        mockLanguageMode(LanguageEnums.EN);
        mockUseMutationLessonReport();
    });

    it("should open upsert dialog when clicking edit button", () => {
        const wrapper = renderTabLessonReportWrapper();

        const editButton = wrapper.getByTestId("DetailSectionReportHeaderInd__buttonEdit");
        expect(editButton).toBeInTheDocument();

        userEvent.click(editButton);
        expect(props.onEditLessonReport).toBeCalled();
    });
});

// Currently all our customers don't need Delete Report feature
// https://manabie.atlassian.net/browse/LT-8942
describe.skip("<TabLessonReport /> delete lesson report ", () => {
    beforeEach(() => {
        mockLanguageMode(LanguageEnums.EN);
        mockUseMutationLessonReport();
    });

    it("should delete lesson report", async () => {
        const wrapper = renderTabLessonReportWrapper();

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        const actionPanelPopover = screen.getByTestId("ActionPanel__popover--open");
        const deleteButton = actionPanelPopover.querySelector("button:last-child")!;

        expect(deleteButton).toBeVisible();
        userEvent.click(deleteButton);

        const confirmButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmButton);

        await waitFor(() => {
            expect(props.onDeleteSuccess).toBeCalled();
        });
    });
});
