import {
    createMockUseGetPartnerFormConfigById,
    createMockUsePreviousLessonReport,
} from "src/squads/lesson/test-utils/lesson-management";

import ButtonPreviousReport, { ButtonPreviousReportProps } from "../ButtonPreviousReport";

import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import useLocale from "src/squads/lesson/hooks/useLocale";
import usePreviousLessonReport from "src/squads/lesson/hooks/usePreviousLessonReport";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

const mockGetPartnerFormConfig = createMockUseGetPartnerFormConfigById();

jest.mock("src/squads/lesson/hooks/useGetPartnerFormConfigById", () => {
    return () => mockGetPartnerFormConfig;
});
jest.mock("src/squads/lesson/hooks/usePreviousLessonReport", () => {
    return jest.fn();
});
jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());
const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const props: ButtonPreviousReportProps = {
    studentId: "student_id_1",
    courseId: "course_id_1",
    reportId: "report_id_1",
    lessonId: "lesson_id_1",
};
const lessonReportWithEmptyData = {
    formConfigId: "",
    dynamicValues: [],
    attendanceValues: {},
};
const lessonReportWithData = createMockUsePreviousLessonReport();

const renderButtonPreviousReport = (isEmptyData = false) => {
    (usePreviousLessonReport as jest.Mock).mockImplementation(() => {
        return isEmptyData ? lessonReportWithEmptyData : lessonReportWithData;
    });

    const wrapper: RenderResult = render(<ButtonPreviousReport {...props} />);

    return wrapper;
};

describe("<ButtonPreviousReport /> render with empty data", () => {
    it("Previous lesson report with empty data", () => {
        const wrapper = renderButtonPreviousReport(true);
        expect(wrapper.getByTestId("ButtonPreviousReport__button")).toBeDisabled();
    });
});

describe("<ButtonPreviousReport /> handlers", () => {
    mockLanguageMode(LanguageEnums.EN);
    it("previous lesson report button is visible and handle click show dialog", () => {
        const wrapper = renderButtonPreviousReport();
        const btnPreviousReport = wrapper.getByTestId("ButtonPreviousReport__button");
        expect(btnPreviousReport).toBeEnabled();

        fireEvent.click(btnPreviousReport);
        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
    });

    it("handle click close dialog", async () => {
        const wrapper = renderButtonPreviousReport();
        const btnPreviousReport = wrapper.getByTestId("ButtonPreviousReport__button");
        fireEvent.click(btnPreviousReport);

        const btnClose = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(btnClose);
        await waitFor(() => {
            expect(screen.queryByTestId("DialogWithHeaderFooter_wrapper")).not.toBeInTheDocument();
        });
    });
});
