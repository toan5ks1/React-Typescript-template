import { useState } from "react";

import { LessonMember } from "src/squads/lesson/common/types";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DividerBase from "src/components/Divider/DividerBase";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";

import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";

export interface ListStudentOnDetailProps {
    lessonMembers: LessonMember[];
    onSelectStudent: (studentId: LessonMember["user"]["user_id"]) => void;
}

const ListStudentOnDetail = ({ lessonMembers, onSelectStudent }: ListStudentOnDetailProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const handleListItemClick = (index: number, studentId: string) => {
        setSelectedIndex(index);
        onSelectStudent(studentId);
    };

    return (
        <PaperRoundedBorders fullHeight data-testid="ListStudentOnDetail__root">
            <List component="nav">
                {lessonMembers.map((student, index) => {
                    return (
                        <Box key={student.user.user_id}>
                            <ListItem
                                button
                                selected={selectedIndex === index}
                                onClick={() => handleListItemClick(index, student.user.user_id)}
                                data-testid="ListStudentOnDetail__listItem"
                            >
                                <ListItemText primary={student.user.name} />
                            </ListItem>
                            {!isLastItemInArray(index, lessonMembers.length) && <DividerBase />}
                        </Box>
                    );
                })}
            </List>
        </PaperRoundedBorders>
    );
};

export default ListStudentOnDetail;
