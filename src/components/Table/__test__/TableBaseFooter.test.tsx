import { shallow } from "enzyme";

import TableBaseFooter from "../TableBaseFooter";
import { TableBaseFooterProps } from "../table-types";

import { render } from "@testing-library/react";
import { PaginationWithTotal } from "src/hooks/data/useQueryWithPagination";

describe("<TableBasePagination />", () => {
    const pagination: PaginationWithTotal = {
        count: 10,
        offset: 0,
        page: 0,
        rowsPerPage: 10,
        limit: 10,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
    let props: TableBaseFooterProps = {
        pagination: pagination,
        labelRowsPerPage: "label",
        rowsPerPageOptions: [5, 10],
    };

    it("should match snapshot", () => {
        const wrapper = shallow(<TableBaseFooter {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render without count property", () => {
        const wrapper = render(<TableBaseFooter {...props} />);
        expect(wrapper.container.querySelector("input")?.value).toEqual(
            `${props.pagination.count}`
        );
    });
});
