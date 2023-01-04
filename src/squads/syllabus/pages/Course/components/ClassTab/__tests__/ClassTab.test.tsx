import { MutationMenus } from "src/common/constants/enum";
import {
    generateMockClassList,
    triggerActionPanelAction,
} from "src/squads/syllabus/test-utils/class";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import ClassTab from "src/squads/syllabus/pages/Course/components/ClassTab";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useClassAssociation from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";
import useClassManagement, {
    UseClassManagementReturn,
} from "src/squads/syllabus/pages/Course/hooks/useClassManagement";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/pages/Course/hooks/useClassManagement", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Course/hooks/useClassAssociation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const fakeReturn: UseClassManagementReturn = {
    classesList: generateMockClassList(2),
    isLoading: false,
    pagination: createFakePagination(),
    handleEditClass: jest.fn(),
    isEditing: false,
    handleDeleteClass: jest.fn(),
    isDeleting: false,
};

describe("ClassTab", () => {
    beforeEach(() => {
        (useClassManagement as jest.Mock).mockImplementation((_courseId: string) => fakeReturn);
        (useClassAssociation as jest.Mock).mockImplementation(() => ({
            getClassAssociation: async () => ({
                lesson: false,
                student: false,
                isQuerySucceed: true,
            }),
            isLoading: false,
        }));

        render(
            <TestThemeProvider>
                <TestQueryWrapper>
                    <ClassTab courseId="Course_Id" />
                </TestQueryWrapper>
            </TestThemeProvider>
        );
    });

    it("should render table class", () => {
        expect(screen.getByTestId("ClassTable__table")).toBeInTheDocument();
    });

    it.each(fakeReturn.classesList)("should trigger edit class", async (classData) => {
        const tableRow: HTMLTableRowElement | null = screen
            .getByTestId("TableBaseBody__root")
            .querySelector(`tr[data-value="${classData.class_id}"]`);

        if (!tableRow) throw Error("Can not get table row");

        triggerActionPanelAction(tableRow, MutationMenus.EDIT);
        expect(screen.getByTestId("DialogEditClass__dialog")).toBeInTheDocument();

        const classNameInput = screen.getByTestId("DialogEditClass__textFieldClassName");
        userEvent.type(classNameInput, "class name test");

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => expect(fakeReturn.handleEditClass).toBeCalled());
    });

    it.each(fakeReturn.classesList)("should trigger delete class", async (classData) => {
        const tableRow: HTMLTableRowElement | null = screen
            .getByTestId("TableBaseBody__root")
            .querySelector(`tr[data-value="${classData.class_id}"]`);

        if (!tableRow) throw Error("Can not get table row");

        triggerActionPanelAction(tableRow, MutationMenus.DELETE);
        expect(await screen.findByTestId("DialogDeleteClass__dialog")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => expect(fakeReturn.handleDeleteClass).toBeCalled());
    });

    it("should close edit class dialog", async () => {
        const tableRow: HTMLTableRowElement | null = screen
            .getByTestId("TableBaseBody__root")
            .querySelector(`tr[data-value="${fakeReturn.classesList[0].class_id}"]`);

        if (!tableRow) throw Error("Can not get table row");

        triggerActionPanelAction(tableRow, MutationMenus.EDIT);
        expect(screen.getByTestId("DialogEditClass__dialog")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() => {
            expect(screen.queryByTestId("DialogEditClass__dialog")).not.toBeInTheDocument();
        });
    });
});

describe("ClassTab", () => {
    beforeEach(() => {
        (useClassManagement as jest.Mock).mockImplementation((_courseId: string) => fakeReturn);
        (useClassAssociation as jest.Mock).mockImplementation(() => ({
            getClassAssociation: async () => ({
                lesson: true,
                student: true,
                isQuerySucceed: true,
            }),
            isLoading: false,
        }));

        render(
            <TestThemeProvider>
                <TestQueryWrapper>
                    <ClassTab courseId="Course_Id" />
                </TestQueryWrapper>
            </TestThemeProvider>
        );
    });

    it.each(fakeReturn.classesList)(
        "should delete the class that is not allowed",
        async (classData) => {
            const tableRow: HTMLTableRowElement | null = screen
                .getByTestId("TableBaseBody__root")
                .querySelector(`tr[data-value="${classData.class_id}"]`);

            if (!tableRow) throw Error("Can not get table row");

            triggerActionPanelAction(tableRow, MutationMenus.DELETE);

            const dialogNotAllowDeleteClass = await screen.findByTestId(
                "DialogNotAllowDeleteClass__dialog"
            );

            expect(dialogNotAllowDeleteClass).toBeInTheDocument();

            userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
            expect(dialogNotAllowDeleteClass).not.toBeInTheDocument();
        }
    );
});
