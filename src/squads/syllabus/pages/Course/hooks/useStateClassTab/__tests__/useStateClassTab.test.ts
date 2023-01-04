import { useState } from "react";

import { renderHook } from "@testing-library/react-hooks";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";
import { ClassAssociation } from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";
import useStateClassTab from "src/squads/syllabus/pages/Course/hooks/useStateClassTab/useStateClassTab";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

describe("useStateClassTab", () => {
    const sampleClassData: ClassData = {
        class_id: "class_id_1",
        name: "class",
        location: { location_id: "location_id_1", name: "location" },
    };

    const mockFn = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [null, mockFn]);
    });

    it("should show edit class dialog", () => {
        const {
            result: {
                current: {
                    editActions: { showEditClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        showEditClassDialog(sampleClassData);

        const [[setClassData], [setOpenEditDialog]] = mockFn.mock.calls;

        expect(setClassData).toEqual(sampleClassData);
        expect(setOpenEditDialog).toEqual(true);
    });

    it("should hide edit class dialog", () => {
        const {
            result: {
                current: {
                    editActions: { hideEditClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        hideEditClassDialog();

        const [[setClassData], [setOpenEditDialog]] = mockFn.mock.calls;

        expect(setClassData).toEqual(null);
        expect(setOpenEditDialog).toEqual(false);
    });
});

describe("useStateClassTab", () => {
    const sampleClassData: ClassData = {
        class_id: "class_id_1",
        name: "class",
        location: { location_id: "location_id_1", name: "location" },
    };

    const mockFn = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [null, mockFn]);
    });

    it("should show delete class dialog", () => {
        const {
            result: {
                current: {
                    deleteActions: { showDeleteClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        showDeleteClassDialog(sampleClassData);

        const [[setClassData], [setOpenDeleteDialog]] = mockFn.mock.calls;

        expect(setClassData).toEqual(sampleClassData);
        expect(setOpenDeleteDialog).toEqual(true);
    });

    it("should hide delete class dialog", () => {
        const {
            result: {
                current: {
                    deleteActions: { hideDeleteClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        hideDeleteClassDialog();

        const [[setClassData], [setOpenDeleteDialog]] = mockFn.mock.calls;

        expect(setClassData).toEqual(null);
        expect(setOpenDeleteDialog).toEqual(false);
    });
});

describe("useStateClassTab", () => {
    const sampleClassAssociation: ClassAssociation = { lesson: true, student: false };
    const mockFn = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [null, mockFn]);
    });

    it("should show can not delete class dialog", () => {
        const {
            result: {
                current: {
                    canNotDeleteActions: { showCanNotDeleteClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        showCanNotDeleteClassDialog(sampleClassAssociation);

        const [[setClassAssociation], [setOpenCanNotDeleteDialog]] = mockFn.mock.calls;

        expect(setClassAssociation).toEqual(sampleClassAssociation);
        expect(setOpenCanNotDeleteDialog).toEqual(true);
    });

    it("should hide can not delete class dialog", () => {
        const {
            result: {
                current: {
                    canNotDeleteActions: { hideCanNotDeleteClassDialog },
                },
            },
        } = renderHook(() => useStateClassTab());

        hideCanNotDeleteClassDialog();

        const [[setClassAssociation], [setOpenCanNotDeleteDialog]] = mockFn.mock.calls;

        expect(setClassAssociation).toEqual(null);
        expect(setOpenCanNotDeleteDialog).toEqual(false);
    });
});
