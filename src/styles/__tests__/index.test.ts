import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import { getThemeV5, getThemeWithMuiV5 } from "../index";
import manabieTheme from "../themes/variants/manabieV5";

jest.mock("../themes", () => ({
    __esModule: true,
    default: require("../themes/variants/manabieV5").default,
}));

describe("getTheme", () => {
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("should merge the default theme with the options pass to it", () => {
        expect(getThemeV5()).toEqual(deepmerge({}, manabieTheme)); // no additional options

        //any because we dont want to implement all ThemeOptions property
        const additional: any = {
            palette: {
                more: { primary: "#ffffff" },
            },
        };
        expect(getThemeV5(additional)).toEqual(deepmerge(additional, manabieTheme));
    });
});

// skip this, we have custom default button outside the manabieTheme
describe.skip("getThemeWithMui", () => {
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("should merge the default theme with the options pass to it and merge with createMuiTheme", () => {
        const additional: any = {
            palette: {
                more: { primary: "#ffffff" },
            },
        };

        //implementation leak but oke for now
        expect(getThemeWithMuiV5(additional)).toMatchObject(
            createTheme(deepmerge(additional, manabieTheme))
        );
    });
});
