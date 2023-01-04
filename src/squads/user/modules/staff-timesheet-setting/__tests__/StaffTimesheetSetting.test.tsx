import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { render, screen } from "@testing-library/react";
import StaffTimesheetSetting from "src/squads/user/modules/staff-timesheet-setting/StaffTimesheetSetting";
import useTimesheetConfig, {
    UseTimesheetConfigReturn,
} from "src/squads/user/modules/staff-timesheet-setting/hooks/useTimesheetConfig";
import useUpdateStaffSetting, {
    UseUpdateStaffSettingReturn,
} from "src/squads/user/modules/staff-timesheet-setting/hooks/useUpdateStaffSetting";

jest.mock("src/squads/user/modules/staff-timesheet-setting/hooks/useTimesheetConfig", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-timesheet-setting/hooks/useUpdateStaffSetting", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("StaffTimesheetSetting component", () => {
    beforeEach(() => {
        (useTimesheetConfig as jest.Mock).mockImplementation(
            (): UseTimesheetConfigReturn => ({
                data: false,
                isLoading: false,
                refetch: jest.fn(),
            })
        );
        (useUpdateStaffSetting as jest.Mock).mockImplementation(
            (): UseUpdateStaffSettingReturn => ({
                updateStaffSetting: jest.fn(),
            })
        );
    });

    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <StaffTimesheetSetting />
            </TestCommonAppProvider>
        );
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent();
        (useTimesheetConfig as jest.Mock).mockImplementation(
            (): UseTimesheetConfigReturn => ({
                data: false,
                isLoading: false,
                refetch: jest.fn(),
            })
        );
        (useUpdateStaffSetting as jest.Mock).mockImplementation(
            (): UseUpdateStaffSettingReturn => ({
                updateStaffSetting: jest.fn(),
            })
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByText("Setting"));
    });
});
