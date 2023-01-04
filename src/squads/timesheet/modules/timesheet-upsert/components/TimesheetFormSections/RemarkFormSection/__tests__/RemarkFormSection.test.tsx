import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import {
    mockTimesheetUpsertInfoForm,
    mockRemarkContent,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import { RemarkFormSection } from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

const renderRemarkFormSectionHookForm = (defaultValues: UpsertTimesheetFormProps) => {
    const RemarkFormSectionHookForm = withReactHookForm(RemarkFormSection, {}, { defaultValues });

    return render(
        <TranslationProvider>
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <RemarkFormSectionHookForm />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        </TranslationProvider>
    );
};

describe("<RemarkFormSection />", () => {
    it("should show title", () => {
        renderRemarkFormSectionHookForm(mockTimesheetUpsertInfoForm);

        expect(screen.getByTestId("RemarkFormSection__title")).toBeInTheDocument();
    });

    it("should match snap shot", () => {
        const wrapper = renderRemarkFormSectionHookForm(mockTimesheetUpsertInfoForm);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should fill default remark value correctly", () => {
        renderRemarkFormSectionHookForm(mockTimesheetUpsertInfoForm);

        const remarkInput = screen.getByTestId("RemarkFormSection__remarkInput");
        expect(remarkInput).toHaveValue(mockTimesheetUpsertInfoForm.remark);
    });

    it("should change when user edit remark", () => {
        renderRemarkFormSectionHookForm(mockTimesheetUpsertInfoForm);

        const remarkInput = screen.getByTestId("RemarkFormSection__remarkInput");
        expect(remarkInput).toHaveValue(mockTimesheetUpsertInfoForm.remark);

        userEvent.clear(remarkInput);
        userEvent.type(remarkInput, mockRemarkContent);

        expect(remarkInput).toHaveValue(mockRemarkContent);
    });
});
