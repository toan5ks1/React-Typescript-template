import { changeSelectValue } from "src/common/utils/tests";
import { useParentsListDataMock } from "src/squads/user/test-utils/mocks/family";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import DialogSearchParent, { DialogSearchParentProps } from "../DialogSearchParent";

import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAddExistingParent, {
    UseAddExistingParentReturn,
} from "src/squads/user/modules/student-family/hooks/useAddExistingParent";
import useParentRelationships, {
    UseParentRelationshipsReturn,
} from "src/squads/user/modules/student-family/hooks/useParentRelationships";
import useParentsList, {
    UseParentsListReturn,
} from "src/squads/user/modules/student-family/hooks/useParentsList";

jest.mock("src/squads/user/hooks/useTranslate");

jest.mock("src/squads/user/hooks/useResourceTranslate");

jest.mock("src/squads/user/modules/student-family/hooks/useAddExistingParent", () => jest.fn());

jest.mock("src/squads/user/modules/student-family/hooks/useParentRelationships", () => jest.fn());

jest.mock("src/squads/user/modules/student-family/hooks/useParentsList", () => jest.fn());

describe("<DialogSearchParent />", () => {
    const useAddExistingParentReturn: UseAddExistingParentReturn = {
        addExistingParent: jest.fn(),
    };
    const renderComponent = (props: DialogSearchParentProps) => {
        return render(
            <TestCommonAppProvider>
                <DialogSearchParent {...props} />
            </TestCommonAppProvider>
        );
    };
    const props: DialogSearchParentProps = {
        studentId: "student_01",
        parents: [],
        open: true,
        onSuccess: jest.fn(),
        onClose: jest.fn(),
    };

    beforeEach(() => {
        (useAddExistingParent as jest.Mock).mockImplementation(() => useAddExistingParentReturn);
        (useParentRelationships as jest.Mock<UseParentRelationshipsReturn>).mockReturnValue({
            isFetchingRelationship: false,
        });
        (useParentsList as jest.Mock<UseParentsListReturn>).mockReturnValue({
            parents: useParentsListDataMock,
            isLoading: false,
        });
    });

    it("should match snapshot", () => {
        renderComponent(props);

        expect(screen.queryByTestId("DialogWithHeaderFooter_wrapper")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent(props);

        expect(screen.getByTestId("ParentsAutocomplete__autoComplete")).toBeInTheDocument();
    });

    it("should call the onClose function", () => {
        renderComponent(props);

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        expect(props.onClose).toBeCalledTimes(1);
    });

    it("should call the addExistingParent function", async () => {
        const wrapper = renderComponent(props);

        const input = screen.getByTestId("AutocompleteBase__input");
        const button = screen.getByTestId("FooterDialogConfirm__buttonSave");
        const MOTHER = "resources.students_erp.choices.relationship.2";

        userEvent.type(input, "Parent");

        const listBox = screen.getByTestId("AutocompleteBase__listBox");
        const parentOptions = within(listBox).getAllByRole("option");
        userEvent.click(parentOptions[0]);

        changeSelectValue(wrapper, "FormSearchParent__selectRelationship", MOTHER);

        userEvent.click(button);

        await waitFor(() =>
            expect(useAddExistingParentReturn.addExistingParent).toBeCalledTimes(1)
        );
    });

    it("should render form info after select parent", () => {
        renderComponent(props);

        const input = screen.getByTestId("AutocompleteBase__input");

        userEvent.type(input, "Parent");

        const listBox = screen.getByTestId("AutocompleteBase__listBox");
        const parentOptions = within(listBox).getAllByRole("option");

        userEvent.click(parentOptions[0]);

        expect(screen.getByTestId("FormSearchParent__inputName")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputAdornmentCountry")).toBeInTheDocument();
        expect(screen.getByTestId("FormSearchParent__selectRelationship")).toBeInTheDocument();
        expect(screen.getByTestId("FormSearchParent__inputEmail")).toBeInTheDocument();
    });
    it("should render BackdropLoading on state loading", async () => {
        renderComponent(props);

        const parentsAutocomplete = screen.getByTestId("ParentsAutocomplete__autoComplete");
        const input = parentsAutocomplete.querySelector("input") as HTMLInputElement;
        userEvent.click(input);

        const listBox = screen.getByTestId("AutocompleteBase__listBox");
        const parentOptions = within(listBox).getAllByRole("option");
        userEvent.click(parentOptions[0]);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(saveBtn).toBeEnabled();
        userEvent.click(saveBtn);

        expect(screen.getByTestId("DialogSearchParent__BackdropLoading")).toBeInTheDocument();
    });
});
