import { useState } from "react";

import { FieldValues } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { ErrorMessageArrayFieldHF } from "src/common/constants/types";
import { LessonMember } from "src/squads/lesson/common/types";

import { ErrorOutlineOutlined } from "@mui/icons-material";
import { List, Box, ListItem, ListItemText, Theme } from "@mui/material";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";

export interface ListStudentProps<T> {
    students: LessonMember[];
    onSelect: (student: LessonMember) => void;
    errors?: ErrorMessageArrayFieldHF<T>;
}
const sx = {
    errorIconContainer: {
        display: "flex",
        alignItems: "center",
    },
    errorIcon: (theme: Theme) => ({
        color: theme.palette.error.main,
    }),
    listItemText: {
        wordBreak: "break-word",
    },
};

const ListStudent = <TFieldValues extends FieldValues>(props: ListStudentProps<TFieldValues>) => {
    const { students, onSelect, errors } = props;

    const [selectedStudent, setSelectedStudent] = useState<LessonMember>(students[0]);

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const handleRenderValidateIcons = (index: number) => {
        if (errors && errors[index]) {
            return (
                <Box
                    data-testid="ListStudent__iconError"
                    title={tLessonManagement("messages.needToFillInTheRequiredInformation")}
                    sx={sx.errorIconContainer}
                >
                    <ErrorOutlineOutlined sx={sx.errorIcon} />
                </Box>
            );
        }
    };

    const handleSelect = (student: LessonMember) => {
        setSelectedStudent(student);
        onSelect(student);
    };
    return (
        <PaperRoundedBorders fullHeight data-testid="ListStudent__root">
            <List disablePadding component="nav">
                {students.map((student, index) => {
                    return (
                        <Box key={student.user.user_id}>
                            <ListItem
                                button
                                color="default"
                                selected={selectedStudent.user.user_id === student.user.user_id}
                                onClick={() => handleSelect(student)}
                                data-testid="ListStudent__listItem"
                                divider={!isLastItemInArray(index, students.length)}
                            >
                                <ListItemText sx={sx.listItemText}>
                                    <TypographyMaxLines maxLines={2} variant="body1">
                                        {student.user.name}
                                    </TypographyMaxLines>
                                </ListItemText>

                                {Boolean(errors) && handleRenderValidateIcons(index)}
                            </ListItem>
                        </Box>
                    );
                })}
            </List>
        </PaperRoundedBorders>
    );
};

export default ListStudent;
