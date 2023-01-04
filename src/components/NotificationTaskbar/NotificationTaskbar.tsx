import { useCallback, useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { Entities } from "src/common/constants/enum";
import { getConvertMaterialLessonSelector } from "src/store/lesson-convert";
import { importedFilesSelector } from "src/store/master/selectors";

import { Box } from "@mui/material";

import { Material } from "../../store/lesson-convert/lesson-convert-types";
import NotificationTaskbarItem from "./NotificationTaskbarItem";
import NotificationTaskbarModal from "./NotificationTaskbarModal";

import useDialog from "src/hooks/useDialog";
import useResourceTranslate from "src/hooks/useResourceTranslate";
import useTranslate from "src/hooks/useTranslate";

const NotificationTaskbar = () => {
    const t = useTranslate();
    const tMaster = useResourceTranslate(Entities.MASTERS);

    const { open, onClose, onOpen } = useDialog();
    const [key, setKey] = useState<string>();
    const [title, setTitle] = useState<string>(t("resources.lesson_syllabus.uploadMaterials"));
    const materialStores = useSelector(getConvertMaterialLessonSelector);

    const masterImportFiles = useSelector(importedFilesSelector);

    const materialsUploading: Material[] = useMemo(() => {
        let result: Material[] = [];
        materialStores
            .filter((e) => e.courseId === key)
            .map((e) => {
                if (e.material && e.material.length) {
                    result = [...result, ...e.material];
                }
            });
        return result;
    }, [key, materialStores]);

    const mastersUploading = useMemo(
        () => masterImportFiles.filter((file) => file.id === key),
        [key, masterImportFiles]
    );

    const modalItems = useMemo(
        () => [...materialsUploading, ...mastersUploading],
        [materialsUploading, mastersUploading]
    );

    const handleOnOpen = useCallback(
        (key: string, title?: string) => {
            setKey(key);
            title && setTitle(title);
            onOpen();
        },
        [onOpen]
    );

    const handleOnClose = useCallback(() => {
        onClose();
        setKey("");
    }, [onClose]);

    useEffect(() => {
        if (!open || modalItems.length) return;
        handleOnClose();
    }, [modalItems.length, open, handleOnClose]);

    return (
        <>
            <NotificationTaskbarModal
                open={open}
                onClose={handleOnClose}
                title={title}
                minWidth="770px"
                maxWidth={false}
                items={modalItems}
            />
            <Box
                sx={(theme) => ({
                    position: "fixed",
                    bottom: "0",
                    display: "inline-block",
                    height: "64px",
                    zIndex: 1201,
                    paddingLeft: theme.spacing(4),
                })}
            >
                <Box display="flex" data-testid="NotificationTaskbar__list">
                    {materialStores.map((lessonGroup) => {
                        const { lessonGroupId, courseId } = lessonGroup;

                        const content = t("resources.courses.lessonConvert.converting", {
                            fileName: lessonGroupId,
                        });
                        return (
                            <NotificationTaskbarItem
                                key={`${courseId}.${lessonGroupId}`}
                                content={content}
                                onClick={() =>
                                    handleOnOpen(
                                        courseId,
                                        t("resources.lesson_syllabus.uploadMaterials")
                                    )
                                }
                            />
                        );
                    })}
                    {masterImportFiles.map(({ id, file }) => (
                        <NotificationTaskbarItem
                            key={id}
                            content={tMaster("status.fileUploading", {
                                fileName: file.name,
                            })}
                            onClick={() => {
                                handleOnOpen(id);
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default NotificationTaskbar;
