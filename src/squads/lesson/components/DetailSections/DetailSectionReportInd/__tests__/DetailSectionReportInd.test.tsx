import { LessonReportBusinessRuleFieldIds, DynamicSection } from "src/squads/lesson/common/types";
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

import DetailSectionReportInd, {
    DetailSectionReportIndProps,
} from "src/squads/lesson/components/DetailSections/DetailSectionReportInd";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
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

const props: DetailSectionReportIndProps = {
    studentLessonReportData: createMockStudentLists()[0],
    isInLessonManagement: true,
    lessonReports: mockLessonReports,
};

describe("<DetailSectionReportInd /> show content", () => {
    it("should render all labels with corresponding values in the fields of the form config in English", () => {
        const language = LanguageEnums.EN;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportInd {...props} />
            </TranslationProvider>
        );

        expect(props.lessonReports.partner_form_config?.form_config_data.sections).toHaveLength(4);
        expect(props.studentLessonReportData.dynamicLessonReportData).toHaveLength(6);

        const { dynamicLessonReportData } = props.studentLessonReportData;

        props.lessonReports.partner_form_config?.form_config_data.sections.forEach(
            (config: DynamicSection) => {
                config.fields.forEach((field) => {
                    testDynamicValueOnLessonReportDetailComponents(wrapper, language, field);
                });
            }
        );

        dynamicLessonReportData.forEach((data) => {
            if (data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS) {
                const attendanceStatusValue = screen.getByText("Attend");

                expect(attendanceStatusValue).toBeInTheDocument();
                return;
            }

            expect(screen.getByText(data.value)).toBeInTheDocument();
        });
    });

    it("should render all labels with corresponding values in the fields of the form config in Japanese", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportInd {...props} />
            </TranslationProvider>
        );

        expect(props.lessonReports.partner_form_config?.form_config_data.sections).toHaveLength(4);
        expect(props.studentLessonReportData.dynamicLessonReportData).toHaveLength(6);

        const { dynamicLessonReportData } = props.studentLessonReportData;

        props.lessonReports.partner_form_config?.form_config_data.sections.forEach(
            (config: DynamicSection) => {
                config.fields.forEach((field) => {
                    testDynamicValueOnLessonReportDetailComponents(wrapper, language, field);
                });
            }
        );

        dynamicLessonReportData.forEach((data) => {
            if (data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS) {
                const attendanceStatusValue = screen.getByText("Attend");

                expect(attendanceStatusValue).toBeInTheDocument();
                return;
            }

            expect(screen.getByText(data.value)).toBeInTheDocument();
        });
    });
});
