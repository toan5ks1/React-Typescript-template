import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { StudentCourseNavbar } from "../Navbar";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/user/hooks/useResourceTranslate");
jest.mock("src/squads/user/hooks/useTranslate");

describe("<StudentCourseNavbar />", () => {
    it("should render UI", () => {
        render(
            <TestCommonAppProvider>
                <StudentCourseNavbar onOpen={jest.fn()} />
            </TestCommonAppProvider>
        );

        expect(screen.getByTestId("StudentCourseNavbar")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseNavbar__title").textContent).toEqual(
            "titles.courseDetail"
        );
        expect(screen.getByTestId("StudentCourseNavbar__btnEdit").textContent).toEqual(
            "ra.common.action.edit"
        );
    });
});
