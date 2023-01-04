import { UseFilterStudentsReturn } from "../useFilterStudents";

export const useFilterStudents: UseFilterStudentsReturn = {
    filter: {
        keyword: "",
        courses: [],
        grades: [],
        isNotLogged: false,
    },
    onFilter: jest.fn(),
    onSearch: jest.fn(),
};

export default () => useFilterStudents;
