import { OrderManagementCategory } from "src/squads/payment/constants/master";

import { MasterImportDialog } from "../MasterImportDialog";

import { render, RenderResult } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

describe("<MasterImportDialog />", () => {
    let wrapper: RenderResult;
    const onClose = jest.fn();
    beforeEach(() => {
        (onClose as jest.Mock).mockReturnValue(onClose);

        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <TestQueryWrapper>
                        <MasterImportDialog
                            category={OrderManagementCategory.AccountingCategory}
                            open={true}
                            onClose={onClose}
                        />
                    </TestQueryWrapper>
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        expect(wrapper.getByTestId("MasterImportDialog__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        expect(wrapper.getByTestId("FooterDialogConfirm__buttonSave")).toBeInTheDocument();
        expect(wrapper.getByTestId("FooterDialogConfirm__buttonClose")).toBeInTheDocument();
    });
});
