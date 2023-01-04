import { useWatch } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { defaultTimesheetUpsertInfoForm } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import FormTimesheetInfo from "src/squads/timesheet/modules/timesheet-upsert/components/FormTimesheetInfo";
import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});

// Render components
type RenderFormTimesheetHookFormProps = {
    mode: ModeOpenDialog;
    isTeacher?: boolean;
    defaultValues?: UpsertTimesheetFormProps;
};

const renderFormTimesheetInfoHookForm = (props: RenderFormTimesheetHookFormProps) => {
    const { mode, defaultValues, isTeacher } = props;

    const FormTimesheetInfoHookForm = withReactHookForm(
        FormTimesheetInfo,
        { isTeacher, mode },
        { defaultValues: defaultValues }
    );

    return render(
        <TestQueryWrapper>
            <TestCommonAppProvider>
                <MuiPickersUtilsProvider>
                    <FormTimesheetInfoHookForm />
                </MuiPickersUtilsProvider>
            </TestCommonAppProvider>
        </TestQueryWrapper>
    );
};

// Test cases
describe("<FormTimesheetInfo /> on ADD mode", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useWatch as jest.Mock).mockReturnValue([
            { id: "staff_0", name: "staff 0", email: "staff_0@gmail.com" },
            { id: "location_0", value: "location name" },
            "2021/09/01",
        ]);
    });

    it("should match snapshot", () => {
        const wrapper = renderFormTimesheetInfoHookForm({
            mode: ModeOpenDialog.ADD,
            defaultValues: defaultTimesheetUpsertInfoForm,
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderFormTimesheetInfoHookForm({ mode: ModeOpenDialog.ADD });
        expect(screen.getByTestId("FormTimesheetInfo__root")).toBeInTheDocument();
        expect(screen.getByTestId("FormTimesheetInfo__addGeneralInfoSection")).toBeInTheDocument();
    });
});

describe("<FormTimesheetInfo /> on EDIT mode", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useWatch as jest.Mock).mockReturnValue([
            { id: "staff_0", name: "staff 0", email: "staff_0@gmail.com" },
            { id: "location_0", value: "location name" },
            "2021/09/01",
        ]);
    });

    it("should match snapshot", () => {
        const wrapper = renderFormTimesheetInfoHookForm({
            mode: ModeOpenDialog.EDIT,
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderFormTimesheetInfoHookForm({ mode: ModeOpenDialog.EDIT });
        expect(screen.getByTestId("FormTimesheetInfo__root")).toBeInTheDocument();
        expect(screen.getByTestId("FormTimesheetInfo__form")).toBeInTheDocument();
    });
});
