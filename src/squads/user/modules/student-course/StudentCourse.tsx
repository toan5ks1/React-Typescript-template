import { StudentCourseUpsertDialog } from "src/squads/user/modules/student-course-upsert";
import {
    StudentCourseNavbar,
    StudentCourseTable,
} from "src/squads/user/modules/student-course/components";

import Box from "@mui/material/Box";

import useDialog from "src/squads/user/hooks/useDialog";
import useQueryStudentCourse from "src/squads/user/modules/student-course/hooks/useQueryStudentCourse";

interface StudentCourseProps {
    id: string;
}
export const StudentCourse = ({ id }: StudentCourseProps) => {
    const { courses, loaded, refetch } = useQueryStudentCourse(id);

    const { open, onOpen, onClose } = useDialog();

    const handleOnSuccess = () => {
        refetch();
        onClose();
    };

    return (
        <>
            <Box mt={3} data-testid="StudentCourse">
                <StudentCourseNavbar onOpen={onOpen} />
                <StudentCourseTable dataSource={courses} loading={!loaded} />
            </Box>
            {open ? (
                <StudentCourseUpsertDialog
                    open={open}
                    onClose={onClose}
                    courses={courses}
                    studentId={id}
                    onSuccess={handleOnSuccess}
                />
            ) : null}
        </>
    );
};
export default StudentCourse;
