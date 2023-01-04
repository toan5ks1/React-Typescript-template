import { useCallback } from "react";

import { MutationMenus } from "src/common/constants/enum";

import Box from "@mui/material/Box";
import ClassTable from "src/squads/syllabus/pages/Course/components/ClassTable";
import DialogDeleteClass from "src/squads/syllabus/pages/Course/components/DialogDeleteClass";
import DialogEditClass from "src/squads/syllabus/pages/Course/components/DialogEditClass";
import DialogNotAllowDeleteClass from "src/squads/syllabus/pages/Course/components/DialogNotAllowDeleteClass";

import { ClassData } from "src/squads/syllabus/pages/Course/common/types";
import useClassAssociation from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";
import useClassManagement from "src/squads/syllabus/pages/Course/hooks/useClassManagement";
import useStateClassTab from "src/squads/syllabus/pages/Course/hooks/useStateClassTab";

export interface ClassTabProps {
    courseId: string;
}

const ClassTab = ({ courseId }: ClassTabProps) => {
    const {
        classData,
        classAssociation,
        editActions: { openEditDialog, showEditClassDialog, hideEditClassDialog },
        deleteActions: { openDeleteDialog, showDeleteClassDialog, hideDeleteClassDialog },
        canNotDeleteActions: {
            openCanNotDeleteDialog,
            showCanNotDeleteClassDialog,
            hideCanNotDeleteClassDialog,
        },
    } = useStateClassTab();

    const {
        classesList,
        pagination,
        isLoading,
        handleEditClass,
        isEditing,
        handleDeleteClass,
        isDeleting,
    } = useClassManagement({ courseId });

    const { getClassAssociation, isLoading: isLoadingClassAssociation } = useClassAssociation();

    const verifyDeleteClass = useCallback(
        async (classData: ClassData) => {
            const { lesson, student, isQuerySucceed } = await getClassAssociation(
                classData.class_id
            );

            const isClassCanNotBeDeleted = lesson || student;

            if (isClassCanNotBeDeleted && !isLoadingClassAssociation) {
                showCanNotDeleteClassDialog({ lesson, student });
            }

            if (!isClassCanNotBeDeleted && !isLoadingClassAssociation && isQuerySucceed) {
                showDeleteClassDialog(classData);
            }
        },
        [
            getClassAssociation,
            isLoadingClassAssociation,
            showCanNotDeleteClassDialog,
            showDeleteClassDialog,
        ]
    );

    const onMutationClass = useCallback(
        async (action: MutationMenus, classData: ClassData) => {
            switch (action) {
                case MutationMenus.EDIT: {
                    showEditClassDialog(classData);
                    break;
                }

                case MutationMenus.DELETE:
                    await verifyDeleteClass(classData);
                    break;
            }
        },
        [showEditClassDialog, verifyDeleteClass]
    );

    const onEditClass = (classData: ClassData) => {
        handleEditClass({ classData, onSuccess: hideEditClassDialog });
    };

    const onDeleteClass = (classData: ClassData) => {
        handleDeleteClass({ classData, onSuccess: hideDeleteClassDialog });
    };

    return (
        <>
            <Box p={3}>
                <ClassTable
                    data={classesList}
                    isLoading={isLoading}
                    pagination={pagination}
                    onMutationClass={onMutationClass}
                />
            </Box>

            {openEditDialog && classData && (
                <DialogEditClass
                    open={openEditDialog}
                    classData={classData}
                    onEditClass={onEditClass}
                    isEditing={isEditing}
                    onClose={hideEditClassDialog}
                />
            )}

            {openDeleteDialog && classData && (
                <DialogDeleteClass
                    open={openDeleteDialog}
                    classData={classData}
                    onDeleteClass={onDeleteClass}
                    isDeleting={isDeleting}
                    onClose={hideDeleteClassDialog}
                />
            )}

            {openCanNotDeleteDialog && classAssociation && (
                <DialogNotAllowDeleteClass
                    open={openCanNotDeleteDialog}
                    onClose={hideCanNotDeleteClassDialog}
                    classAssociation={classAssociation}
                />
            )}
        </>
    );
};

export default ClassTab;
