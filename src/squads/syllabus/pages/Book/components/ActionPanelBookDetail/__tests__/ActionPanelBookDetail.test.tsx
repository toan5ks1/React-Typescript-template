import { MutationMenus } from "src/common/constants/enum";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import ActionPanelBookDetail, { ActionPanelBookDetailProps } from "../ActionPanelBookDetail";

import { fireEvent, render } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderUtil = (props: ActionPanelBookDetailProps) => {
    return render(
        <CommonTranslationProvider>
            <ActionPanelBookDetail {...props} />
        </CommonTranslationProvider>
    );
};

describe(`${ActionPanelBookDetail.name}`, () => {
    it("should enable and allow to toggle click", () => {
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });

        const mockProps: ActionPanelBookDetailProps = {
            recordName: "Action panel test",
            actions: [MutationMenus.DELETE],
        };

        const { getByTestId } = renderUtil(mockProps);

        const buttonPanel = getByTestId("ActionPanel__trigger");
        fireEvent.click(buttonPanel);
        const deleteButton =
            getByTestId("ActionPanel__menuList").querySelector("button:last-child")!;

        expect(buttonPanel).not.toBeDisabled();
        expect(deleteButton).toHaveTextContent("Delete");
    });
});

describe(`${ActionPanelBookDetail.name} disable all actions when the disabling value of config is true`, () => {
    it("should prevent click to toggle button", () => {
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });

        const mockProps: ActionPanelBookDetailProps = {
            recordName: "Action panel test",
            actions: [MutationMenus.EDIT],
        };

        const { getByTestId } = renderUtil(mockProps);

        expect(getByTestId("ActionPanel__trigger")).toBeDisabled();
    });
});
