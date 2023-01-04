import { MutationMenus } from "src/common/constants/enum";
import {
    generateMockClassList,
    triggerActionPanelAction,
} from "src/squads/syllabus/test-utils/class";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import ClassTable, {
    ClassTableProps,
} from "src/squads/syllabus/pages/Course/components/ClassTable";

import { render, screen } from "@testing-library/react";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

describe("ClassTable", () => {
    const props: ClassTableProps = {
        data: generateMockClassList(2),
        isLoading: false,
        pagination: createFakePagination(),
        onMutationClass: jest.fn(),
    };

    beforeEach(() =>
        render(
            <TestTranslationProvider>
                <ClassTable {...props} />
            </TestTranslationProvider>
        )
    );

    it("should have 3 columns", () => {
        expect(screen.getByText("Class Name")).toBeInTheDocument();
        expect(screen.getByText("Location")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("should render data rows by props data", () => {
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(props.data.length);
    });

    it.each(props.data)("should mutate class", (classData) => {
        const tableRow: HTMLTableRowElement | null = screen
            .getByTestId("TableBaseBody__root")
            .querySelector(`tr[data-value="${classData.class_id}"]`);

        if (!tableRow) throw Error("Can not get table row");

        triggerActionPanelAction(tableRow, MutationMenus.EDIT);
        expect(props.onMutationClass).toBeCalledWith("edit", classData);

        triggerActionPanelAction(tableRow, MutationMenus.DELETE);
        expect(props.onMutationClass).toBeCalledWith("delete", classData);
    });
});

describe("classTable", () => {
    it("should NOT render table footer with empty data", () => {
        const props: ClassTableProps = {
            data: [],
            isLoading: false,
            pagination: createFakePagination(),
            onMutationClass: jest.fn(),
        };

        render(
            <TestTranslationProvider>
                <ClassTable {...props} />
            </TestTranslationProvider>
        );

        expect(screen.getByTestId("NoData__message")).toBeInTheDocument();
        expect(screen.queryByTestId("TableBaseFooter")).not.toBeInTheDocument();
    });
});
