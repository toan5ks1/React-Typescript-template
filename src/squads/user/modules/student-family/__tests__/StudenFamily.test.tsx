import { changeSelectValue } from "src/common/utils/tests";
import { choicesAddParentType } from "src/squads/user/common/constants/choices";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { useParentsListDataMock } from "src/squads/user/test-utils/mocks/family";
import { createMockListParent } from "src/squads/user/test-utils/mocks/student";
import {
    TestQueryWrapper,
    TestHookFormProvider,
    TestCommonAppProvider,
} from "src/squads/user/test-utils/providers";

import { Country } from "manabie-bob/enum_pb";

import StudentFamily, { StudentFamilyProps } from "../StudentFamily";

import { screen, render, RenderResult, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useParentMapStudent, {
    UseParentMapStudentReturn,
} from "src/squads/user/hooks/useParentMapStudent";
import useParentsList, {
    UseParentsListReturn,
} from "src/squads/user/modules/student-family/hooks/useParentsList";
import useUpsertParent, {
    UseUpsertParentReturn,
} from "src/squads/user/modules/student-family/hooks/useUpsertParent";

const mockDataParents = createMockListParent({ length: 2, student_id: "student_id" });

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-family/hooks/useParentsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useParentMapStudent", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));
jest.mock("src/squads/user/modules/student-family/hooks/useUpsertParent", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useReissueUserPassword", () => ({
    __esModule: true,
    default: () => ({ reissueUserPassword: jest.fn() }),
}));

jest.mock("src/squads/user/modules/student-family/hooks/useRemoveParent", () => ({
    __esModule: true,
    default: () => ({ removeParent: jest.fn() }),
}));

jest.mock("src/squads/user/modules/student-family/hooks/useAddExistingParent", () => ({
    __esModule: true,
    default: () => ({ addExistingParent: jest.fn() }),
}));

jest.mock("src/squads/user/modules/student-family/hooks/useParentRelationships", () => ({
    __esModule: true,
    default: () => ({ isFetchingRelationship: false }),
}));

describe("<StudentFamily />", () => {
    let wrapper: RenderResult;

    const mockDialogUpsertParentInput = {
        countryCode: Country.COUNTRY_JP,
        name: "name",
        relationship: 2,
        email: "vanthai.nguyen+12@manabie.com",
        phoneNumber: "",
    };

    beforeEach(() => {
        const props: StudentFamilyProps = {
            studentId: "123abc",
        };

        (useUpsertParent as jest.Mock).mockImplementation(
            (): UseUpsertParentReturn => ({
                isLoading: false,
                upsertParent: (_payload: any, option: any) => {
                    option?.onSuccess({
                        studentId: props.studentId,
                        parentProfilesList: [mockDialogUpsertParentInput],
                    });
                },
            })
        );
        (useParentMapStudent as jest.Mock).mockImplementation(
            (): UseParentMapStudentReturn => ({
                parents: mockDataParents,
                isLoading: false,
                refetch: jest.fn(),
            })
        );

        wrapper = render(
            <TestCommonAppProvider>
                <TestHookFormProvider>
                    <TestQueryWrapper>
                        <StudentFamily {...props} />
                    </TestQueryWrapper>
                </TestHookFormProvider>
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(screen.getByTestId("StudentFamily__root")).toMatchSnapshot();
    });

    it("should render correct add parent button", () => {
        const addParentBtn = within(screen.getByTestId("StudentFamily__root")).getByTestId(
            "ButtonDropdownMenu__button"
        );

        expect(addParentBtn).toHaveTextContent("Add Parent");
        userEvent.click(addParentBtn);

        const existingParentBtn = screen.getAllByRole("menuitem")[0];
        expect(existingParentBtn).toHaveTextContent("resources.students_erp.choices.addParent.1");

        const newParentBtn = screen.getAllByRole("menuitem")[1];
        expect(newParentBtn).toHaveTextContent("resources.students_erp.choices.addParent.2");
    });

    it("should render correct parent list", () => {
        expect(screen.queryByTestId("ParentList__root")).toBeInTheDocument();
        expect(screen.queryAllByTestId("ParentItem__root")).toHaveLength(mockDataParents.length);
    });

    it("should render DialogSearchParent and disappear when user press cancel", async () => {
        (useParentsList as jest.Mock<UseParentsListReturn>).mockReturnValue({
            parents: useParentsListDataMock,
            isLoading: false,
        });
        const addParentBtn = within(screen.getByTestId("StudentFamily__root")).getByTestId(
            "ButtonDropdownMenu__button"
        );

        userEvent.click(addParentBtn);
        const addParentOption = screen.getAllByRole("menuitem")[0];
        expect(addParentOption).toHaveTextContent(choicesAddParentType[0].value);

        userEvent.click(addParentOption);
        expect(screen.getByTestId("DialogSearchParent__root")).toBeInTheDocument();

        const saveDialogEl = screen.getByText("ra.common.action.cancel");
        userEvent.click(saveDialogEl);
        await waitFor(() => {
            expect(screen.queryByTestId("DialogSearchParent__root")).not.toBeInTheDocument();
        });
    });

    it("should render DialogUpsertParent and disappear when user press cancel", async () => {
        const addParentBtn = within(screen.getByTestId("StudentFamily__root")).getByTestId(
            "ButtonDropdownMenu__button"
        );

        userEvent.click(addParentBtn);
        const addParentOption = screen.getAllByRole("menuitem")[1];
        expect(addParentOption).toHaveTextContent(choicesAddParentType[1].value);

        userEvent.click(addParentOption);
        expect(screen.getByTestId("DialogUpsertParent")).toBeInTheDocument();

        const saveDialogEl = screen.getByText("ra.common.action.cancel");
        userEvent.click(saveDialogEl);
        await waitFor(() =>
            expect(screen.queryByTestId("DialogUpsertParent")).not.toBeInTheDocument()
        );
    });

    it("should render correct DialogUpsertParent and sent data when user click save", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => {
            return [];
        });
        const addParentBtn = within(screen.getByTestId("StudentFamily__root")).getByTestId(
            "ButtonDropdownMenu__button"
        );

        userEvent.click(addParentBtn);
        const AddParentOption = screen.getAllByRole("menuitem")[1];
        expect(AddParentOption).toHaveTextContent(choicesAddParentType[1].value);

        userEvent.click(AddParentOption);
        expect(screen.getByTestId("DialogUpsertParent")).toBeInTheDocument();
        expect(screen.getByTestId("FormUpsertParent__inputName")).toBeInTheDocument();

        userEvent.type(
            screen.getByTestId("FormUpsertParent__inputName"),
            mockDialogUpsertParentInput.name
        );
        expect(await screen.findByTestId("FormUpsertParent__inputName")).toHaveValue(
            mockDialogUpsertParentInput.name
        );

        changeSelectValue(wrapper, "FormUpsertParent__selectRelationship", "Mother");
        expect(
            within(screen.getByTestId("FormUpsertParent__selectRelationship")).getByRole("button")
        ).toHaveTextContent(`Mother`);

        expect(screen.getByTestId("FormUpsertParent__inputEmail")).toBeInTheDocument();
        userEvent.type(
            screen.getByTestId("FormUpsertParent__inputEmail"),
            mockDialogUpsertParentInput.email
        );
        expect(await screen.findByTestId("FormUpsertParent__inputEmail")).toHaveValue(
            mockDialogUpsertParentInput.email
        );

        const saveDialogEl = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveDialogEl);
        expect(await screen.findByTestId("DialogStudentAccountInfo")).toBeInTheDocument();
    });
});
