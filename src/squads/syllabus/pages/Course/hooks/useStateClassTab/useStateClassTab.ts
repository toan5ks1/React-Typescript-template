import { useState } from "react";

import { ClassData } from "src/squads/syllabus/pages/Course/common/types";
import { ClassAssociation } from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";

export interface UseStateClassTabReturn {
    classData: ClassData | null;
    classAssociation: ClassAssociation | null;
    editActions: {
        openEditDialog: boolean;
        showEditClassDialog: (classData: ClassData) => void;
        hideEditClassDialog: () => void;
    };
    deleteActions: {
        openDeleteDialog: boolean;
        showDeleteClassDialog: (classData: ClassData) => void;
        hideDeleteClassDialog: () => void;
    };
    canNotDeleteActions: {
        openCanNotDeleteDialog: boolean;
        showCanNotDeleteClassDialog: (classAssociation: ClassAssociation) => void;
        hideCanNotDeleteClassDialog: () => void;
    };
}

const useStateClassTab = (): UseStateClassTabReturn => {
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openCanNotDeleteDialog, setOpenCanNotDeleteDialog] = useState<boolean>(false);

    const [classData, setClassData] = useState<ClassData | null>(null);
    const [classAssociation, setClassAssociation] = useState<ClassAssociation | null>(null);

    const showEditClassDialog = (classData: ClassData) => {
        setClassData(classData);
        setOpenEditDialog(true);
    };

    const hideEditClassDialog = () => {
        setClassData(null);
        setOpenEditDialog(false);
    };

    const showDeleteClassDialog = (classData: ClassData) => {
        setClassData(classData);
        setOpenDeleteDialog(true);
    };

    const hideDeleteClassDialog = () => {
        setClassData(null);
        setOpenDeleteDialog(false);
    };

    const showCanNotDeleteClassDialog = (classAssociation: ClassAssociation) => {
        setClassAssociation(classAssociation);
        setOpenCanNotDeleteDialog(true);
    };

    const hideCanNotDeleteClassDialog = () => {
        setClassAssociation(null);
        setOpenCanNotDeleteDialog(false);
    };

    return {
        classData,
        classAssociation,
        editActions: {
            openEditDialog,
            showEditClassDialog,
            hideEditClassDialog,
        },
        deleteActions: {
            openDeleteDialog,
            showDeleteClassDialog,
            hideDeleteClassDialog,
        },
        canNotDeleteActions: {
            openCanNotDeleteDialog,
            showCanNotDeleteClassDialog,
            hideCanNotDeleteClassDialog,
        },
    };
};

export default useStateClassTab;
