import { ModeOpenDialog } from "src/common/constants/enum";
import { changeSelectValue } from "src/common/utils/tests";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import DialogUpsertParent, { DialogUpsertParentProp } from "../DialogUpsertParent";

import { fireEvent, render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpsertParent, {
    UseUpsertParentReturn,
} from "src/squads/user/modules/student-family/hooks/useUpsertParent";

jest.mock("src/squads/user/hooks/useTranslate");

jest.mock("src/squads/user/hooks/useResourceTranslate");

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/user/modules/student-family/hooks/useParentValidateRules");

jest.mock("src/squads/user/modules/student-family/hooks/useUpsertParent", () => jest.fn());

const useUpsertParentReturn: UseUpsertParentReturn = {
    isLoading: false,
    upsertParent: jest.fn(),
};

const renderComponent = (props: DialogUpsertParentProp) => {
    (useUpsertParent as jest.Mock).mockImplementation(() => useUpsertParentReturn);

    return render(
        <TestCommonAppProvider>
            <DialogUpsertParent {...props} />
        </TestCommonAppProvider>
    );
};

describe("<DialogUpsertParent /> ADD mode", () => {
    const props: DialogUpsertParentProp = {
        mode: ModeOpenDialog.ADD,
        studentId: "student_01",
        parents: [],
        open: true,
        onSuccess: jest.fn(),
        onClose: jest.fn(),
    };

    it("should match snapshot", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.queryByTestId("DialogWithHeaderFooter_wrapper")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.getByTestId("FormUpsertParent__inputName")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormUpsertParent__selectRelationship")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(wrapper.getByTestId("FormUpsertParent__inputEmail")).toBeInTheDocument();
    });

    it("should call the onClose function", () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        fireEvent.click(button);

        expect(props.onClose).toBeCalledTimes(1);
    });

    it("should call the upsertParent function", async () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        const inputName = wrapper.getByTestId("FormUpsertParent__inputName");
        const inputEmail = wrapper.getByTestId("FormUpsertParent__inputEmail");
        const MOTHER = "resources.students_erp.choices.relationship.2";

        changeSelectValue(wrapper, "FormUpsertParent__selectRelationship", MOTHER);

        userEvent.type(inputName, "name");
        userEvent.type(inputEmail, "name@manabie.com");

        fireEvent.click(button);

        await waitFor(() => expect(useUpsertParentReturn.upsertParent).toBeCalledTimes(1));
    });

    it("should render message require", async () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(button);

        expect(await wrapper.findAllByText("message")).toHaveLength(3);
    });
});

describe("<DialogUpsertParent /> UPDATE mode", () => {
    const props: DialogUpsertParentProp = {
        mode: ModeOpenDialog.EDIT,
        open: true,
        studentId: "student_01",
        parents: [],
        parentUpdate: {
            parent: {
                name: "parent name",
                relationship: 2,
                countryCode: 5,
                phoneNumber: "1234567890",
                email: "parent_email6@manabie.com",
                userId: "parent_01",
            },
            index: 0,
        },
        onSuccess: jest.fn(),
        onClose: jest.fn(),
    };

    it("should match snapshot", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.queryByTestId("DialogWithHeaderFooter_wrapper")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.getByTestId("FormUpsertParent__inputName")).toHaveValue("parent name");
        expect(wrapper.getByTestId("FormUpsertParent__selectRelationship")).toBeInTheDocument();
        const selectRelationshipWrapper = wrapper.getByTestId(
            "FormUpsertParent__selectRelationship"
        );
        expect(within(selectRelationshipWrapper).getByRole("button")).toHaveTextContent(
            "resources.students_erp.choices.relationship.2"
        );
        expect(wrapper.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(wrapper.getByTestId("PhoneInputHF__inputPhoneNumber")).toHaveValue("1234567890");
        expect(wrapper.getByTestId("FormUpsertParent__inputEmail")).toHaveValue(
            "parent_email6@manabie.com"
        );
    });

    it("should call the onClose function", () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        fireEvent.click(button);

        expect(props.onClose).toBeCalledTimes(1);
    });

    it("should call the upsertParent function", async () => {
        const wrapper = renderComponent(props);
        const button = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        const FATHER = "resources.students_erp.choices.relationship.1";

        changeSelectValue(wrapper, "FormUpsertParent__selectRelationship", FATHER);

        fireEvent.click(button);

        await waitFor(() => expect(useUpsertParentReturn.upsertParent).toBeCalledTimes(1));
    });
});
