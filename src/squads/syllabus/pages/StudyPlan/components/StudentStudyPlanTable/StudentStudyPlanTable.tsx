import { useEffect } from "react";

import { EurekaEntities } from "src/common/constants/enum";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";

import { TableBase } from "src/components/Table";

import useStudentStudyPlanTableColumns from "../../hooks/useStudentStudyPlanTableColumns";
import useStudentStudyPlansQuery from "../../hooks/useStudentStudyPlansQuery";
import StudentStudyPlanTableBody from "../StudentStudyPlanTableBody";

import { StudyPlanFilter } from "src/squads/syllabus/pages/StudyPlan/common/types";

export interface StudentStudyPlanTableProps {
    courseId: string;
    filter: Omit<StudyPlanFilter, "archived">;
    keyword: string;
}

const StudentStudyPlanTable = ({ courseId, keyword, filter }: StudentStudyPlanTableProps) => {
    const rowKey = getPrimaryKey(EurekaEntities.COURSE_STUDENTS);

    const { studyPlanListByStudent, isLoading, pagination, resetPaginationOffset } =
        useStudentStudyPlansQuery({
            courseId,
            keyword,
            filter,
        });

    const { columns } = useStudentStudyPlanTableColumns(courseId);

    useEffect(() => {
        resetPaginationOffset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, JSON.stringify(filter)]);

    return (
        <TableBase
            data={studyPlanListByStudent}
            columns={columns}
            body={{
                loading: isLoading,
                rowKey,
                customBody: (
                    <StudentStudyPlanTableBody
                        columns={columns}
                        data={studyPlanListByStudent}
                        rowKey={rowKey}
                    />
                ),
            }}
            footer={{ pagination }}
            tableProps={{ "data-testid": "StudentStudyPlanTable" }}
        />
    );
};

export default StudentStudyPlanTable;
