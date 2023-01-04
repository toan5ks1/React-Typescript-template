import { LessonReportBusinessRuleFieldIds } from "src/squads/lesson/common/types";
import {
    testDynamicValueOnLessonReportDetailComponents,
    createMockPartnerDomain,
    createMockUsePreviousLessonReport,
    createMockUseGetPartnerFormConfigById,
} from "src/squads/lesson/test-utils/lesson-management";
import {
    createMockPreviousReportDataConfig,
    createMockStudentLists,
} from "src/squads/lesson/test-utils/lesson-report";

import DetailSectionReportContentInd, {
    DetailSectionReportContentIndProps,
} from "src/squads/lesson/components/DetailSections/DetailSectionReportContentInd";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, RenderResult, screen } from "@testing-library/react";
import useLocale from "src/squads/lesson/hooks/useLocale";
import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

const mockLessonReports = lessonReports[0];
const mockPreviousReportDataConfig = createMockPreviousReportDataConfig();
const mockPartnerDomain = createMockPartnerDomain();
const mockPreviousReport = createMockUsePreviousLessonReport();
const mockGetPartnerFormConfig = createMockUseGetPartnerFormConfigById();

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails", () => {
    return () => ({
        previousReportDataConfig: mockPreviousReportDataConfig,
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

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const props: DetailSectionReportContentIndProps = {
    lessonReportDetailOfStudent: createMockStudentLists()[0],
    dataConfig: mockLessonReports.partner_form_config?.form_config_data,
    hasGeneralInfo: true,
    reportId: "report_id_1",
    lessonId: "lesson_id_1",
};

const testRenderAllLabelsWithValuesBasedOnLanguage = (
    wrapper: RenderResult,
    language: LanguageEnums
) => {
    expect(props.dataConfig.sections).toHaveLength(4);
    expect(props.lessonReportDetailOfStudent.dynamicLessonReportData).toHaveLength(6);

    const { dynamicLessonReportData } = props.lessonReportDetailOfStudent;

    props.dataConfig.sections.forEach((section) => {
        section.fields.forEach((field) => {
            testDynamicValueOnLessonReportDetailComponents(wrapper, language, field);
        });
    });

    dynamicLessonReportData.forEach((data) => {
        if (data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS) {
            const attendanceStatusValue = screen.getByText("Attend");

            expect(attendanceStatusValue).toBeInTheDocument();
            return;
        }

        expect(screen.getByText(data.value)).toBeInTheDocument();
    });
};

describe("<DetailSectionReportContentInd /> show content", () => {
    it("should render all labels with corresponding values in the fields of the form config in English", () => {
        const language = LanguageEnums.EN;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportContentInd {...props} />
            </TranslationProvider>
        );

        testRenderAllLabelsWithValuesBasedOnLanguage(wrapper, language);
    });

    it("should render all labels with corresponding values in the fields of the form config in Japanese", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportContentInd {...props} />
            </TranslationProvider>
        );

        testRenderAllLabelsWithValuesBasedOnLanguage(wrapper, language);
    });
});
