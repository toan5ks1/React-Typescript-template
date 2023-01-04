export default function useStudentDetailClasses() {
    const PREFIX = "TabStudentDetail";
    return {
        classes: {
            labelOneColumn: `${PREFIX}-labelOneColumn`,
            valueOneColumn: `${PREFIX}-valueOneColumn`,
            breakWord: `${PREFIX}-breakWord`,
        },
    };
}
