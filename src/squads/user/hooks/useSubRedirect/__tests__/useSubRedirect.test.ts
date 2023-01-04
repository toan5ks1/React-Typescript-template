import { useLocation } from "react-router-dom";

import useSubRedirect from "../useSubRedirect";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("react-router-dom", () => {
    return {
        useLocation: jest.fn(),
    };
});

describe("useSubRedirect", () => {
    const location = {
        pathname: "/schedule",
        search: "?fake=fake1",
    } as Location;
    const locationIncludeRedirect = {
        pathname: "/schedule",
        search: "?redirectUrl=%2Fcourses",
    } as Location;

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => location);
    });

    it("should return convert current url into a redirect", () => {
        const { result } = renderHook(() => useSubRedirect());

        expect(result.current.convertCurrentUrlToSearch()).toEqual(
            `?redirectUrl=%2Fschedule%3Ffake%3Dfake1`
        );
    });

    it("should return current search params in the url", () => {
        const { result } = renderHook(() => useSubRedirect());

        expect(result.current.currentSearchParams).toEqual(location.search);
    });

    it("should return correct redirectUrl in search params if has", () => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);

        const { result } = renderHook(() => useSubRedirect());

        expect(result.current.getRedirectUrlFromCurrentUrl()).toEqual(`/courses`);
    });

    it("should navigate to correct redirectUrl", () => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);

        const { result } = renderHook(() => useSubRedirect());

        result.current.navigateToRedirectUrl("/");

        expect(window.location.assign).toHaveBeenCalledWith("/courses");
    });

    it("should replace ignore pathname that contains //, as it is a signature of new site", () => {
        const currenLocationWithInvalidPathname = {
            pathname: "//schedule",
            search: "",
        } as Location;

        (useLocation as jest.Mock).mockImplementation(() => currenLocationWithInvalidPathname);

        const { result } = renderHook(() => useSubRedirect());

        result.current.convertCurrentUrlToSearch();

        expect(result.current.convertCurrentUrlToSearch()).toEqual("");
    });
});
