import { PropsWithChildren } from "react";

import StudentDetailProvider from "src/squads/user/providers/StudentDetailProvider";

const TestStudentDetailProvider = ({ children }: PropsWithChildren<{}>) => {
    return <StudentDetailProvider id="student_id_01">{children}</StudentDetailProvider>;
};

export default TestStudentDetailProvider;
