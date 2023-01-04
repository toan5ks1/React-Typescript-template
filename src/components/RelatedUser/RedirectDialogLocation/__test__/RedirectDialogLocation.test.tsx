import { useHistory } from "react-router";
import { ProviderTypes } from "src/common/constants/enum";
import { TestApp } from "src/test-utils";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import RedirectDialogLocation from "../RedirectDialogLocation";

import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
    within,
} from "@testing-library/react";
import useDataProvider from "src/hooks/useDataProvider";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
            location: {
                pathname: "",
            },
        })),
    };
});

const pushFunc = jest.fn();
const mockHistory = (pathname: string) => {
    (useHistory as jest.Mock).mockImplementation(() => {
        return {
            push: pushFunc,
            location: {
                pathname,
            },
        };
    });
};
describe("RedirectDialogLocation", () => {
    const renderTestComponent = () => {
        return render(
            <TestApp>
                <TestQueryWrapper>
                    <RedirectDialogLocation
                        isOpen={true}
                        persistedLocationTypes={[]}
                        onCloseDialog={jest.fn}
                        onSubmitLocationDialog={jest.fn}
                        updatePersistedLocationTypes={jest.fn}
                    />
                </TestQueryWrapper>
            </TestApp>
        );
    };

    const mockLocationForUseQuery = () => {
        (useDataProvider as jest.Mock).mockImplementation(() => {
            return {
                [ProviderTypes.MANY]: () => {
                    return {
                        data: [],
                    };
                },
            };
        });
    };

    beforeEach(() => {
        mockLocationForUseQuery();
    });

    it("should not show confirm dialog when submit location dialog in a main page user/student_erps", async () => {
        mockHistory("/user/student_erps");
        renderTestComponent();
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);

        expect(screen.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument();
    });

    it("should show confirm dialog and redirect top page when submit confirm dialog in a children page /user/student_erps/student-id", async () => {
        mockHistory("/user/student_erps/student-id");
        renderTestComponent();
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        });

        const containerConfirmDialog = screen.getByTestId("DialogCancelConfirm__dialog");
        const confirmButton = within(containerConfirmDialog).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        fireEvent.click(confirmButton);

        expect(pushFunc).toBeCalledWith("/user/student_erps");
    });
});
