import { LessonReportBusinessRuleFieldIds } from "src/squads/lesson/common/types";
import { testDynamicValueOnLessonReportDetailComponents } from "src/squads/lesson/test-utils/lesson-management";
import { createMockStudentLists } from "src/squads/lesson/test-utils/lesson-report";

import DetailSectionReportInfoInd, {
    DetailSectionReportInfoIndProps,
} from "src/squads/lesson/components/DetailSections/DetailSectionReportInfoInd";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, RenderResult, screen } from "@testing-library/react";
import useLocale from "src/squads/lesson/hooks/useLocale";
import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

const props: DetailSectionReportInfoIndProps = {
    fields: lessonReports[0].partner_form_config?.form_config_data.sections[0].fields,
    dynamicLessonReportData: createMockStudentLists()[0].dynamicLessonReportData,
    previousLessonReport: undefined,
    studentId: "student Id",
    courseId: "course Id",
    reportId: "report_id_1",
    lessonId: "lesson_id_1",
};

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const testRenderDynamicLabelValuesBasedOnLanguage = (
    wrapper: RenderResult,
    language: LanguageEnums
) => {
    props.fields.forEach((field) => {
        testDynamicValueOnLessonReportDetailComponents(wrapper, language, field);

        const currentLabel = props.dynamicLessonReportData.find(
            (data) => data.field_id === field.label?.i18n.translations[language]
        );

        if (currentLabel) {
            if (currentLabel.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS) {
                const attendanceStatusValue = screen.getByText("Attend");

                expect(attendanceStatusValue).toBeInTheDocument();
            } else {
                expect(wrapper.getByText(currentLabel.value)).toBeInTheDocument();
            }
        }
    });
};

describe("<DetailSectionReportInfoInd />", () => {
    it("should render dynamic label value correctly in English", () => {
        const language = LanguageEnums.EN;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportInfoInd {...props} />
            </TranslationProvider>
        );

        testRenderDynamicLabelValuesBasedOnLanguage(wrapper, language);
    });

    it("should render dynamic label value correctly in Japanese", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);
        const wrapper = render(
            <TranslationProvider>
                <DetailSectionReportInfoInd {...props} />
            </TranslationProvider>
        );

        testRenderDynamicLabelValuesBasedOnLanguage(wrapper, language);
    });
});
