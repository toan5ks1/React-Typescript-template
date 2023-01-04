import { shallow, ShallowWrapper } from "enzyme";

import PdfPagination from "../PdfPagination";
import PdfPaginationWithErr from "../PdfPaginationWithErr";

//because we are having side effect in the common/constants folder, we cant do other cleaner solutions
jest.mock("react", () => {
    const actual = jest.requireActual("react");
    return {
        ...actual,
        useLayoutEffect: actual.useEffect,
    };
});

describe("<PdfPaginationWithErr /> handlers logic", () => {
    function updatePageValue(wrapper: ShallowWrapper, value: number | string) {
        wrapper.find(PdfPagination).props().onChange(value);
        wrapper.update();
    }

    it("should work with customCheckError prop", () => {
        const fn = jest.fn(() => true);
        const wrapper = shallow(
            <PdfPaginationWithErr
                totalPage={5}
                currentPage={4}
                onChange={() => {}}
                customCheckError={fn}
            />
        );

        const testPage = 2;
        updatePageValue(wrapper, testPage); //a valid page but customCheckError return true, so it will still be an error

        expect(fn).toHaveBeenCalledWith(testPage);
        expect(wrapper.exists('[data-testid="PdfPaginationWithErr__err"]')).toBe(true);
    });

    it("should have error if page is not valid", () => {
        const totalPage = 5;
        const wrapper = shallow(
            <PdfPaginationWithErr totalPage={totalPage} currentPage={4} onChange={() => {}} />
        );

        const invalidPage = "2sss"; // invalid
        updatePageValue(wrapper, invalidPage);

        expect(wrapper.find('[data-testid="PdfPaginationWithErr__err"]').text()).toContain(
            "paginationInvalidPage"
        );

        const outOfRangePage = totalPage + 1; // out of range
        updatePageValue(wrapper, outOfRangePage);

        expect(wrapper.find('[data-testid="PdfPaginationWithErr__err"]').text()).toContain(
            "paginationOutOfRange"
        );

        const emptyValue = ""; //invalid
        updatePageValue(wrapper, emptyValue);

        expect(wrapper.find('[data-testid="PdfPaginationWithErr__err"]').text()).toContain(
            "paginationInvalidPage"
        );
    });

    it("should clear error when page become valid", () => {
        const wrapper = shallow(
            <PdfPaginationWithErr totalPage={5} currentPage={4} onChange={() => {}} />
        );

        const invalidPage = "2sss"; // set to invalid
        updatePageValue(wrapper, invalidPage);
        expect(wrapper.find('[data-testid="PdfPaginationWithErr__err"]').text()).toContain(
            "paginationInvalidPage"
        );

        // now set to valid again
        const validPage = 4; // set to invalid
        updatePageValue(wrapper, validPage);
        expect(wrapper.exists('[data-testid="PdfPaginationWithErr__err"]')).toBe(false);
    });
});
