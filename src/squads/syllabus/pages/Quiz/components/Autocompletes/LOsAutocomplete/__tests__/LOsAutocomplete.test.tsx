import { inferQuery } from "src/squads/syllabus/services/infer-query";

import LOsAutocomplete, { LOsAutocompleteProps } from "../LOsAutocomplete";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

describe(LOsAutocomplete.name, () => {
    const LOIds: LOsAutocompleteProps["value"] = ["lo_01", "lo_never_die"];

    it("should render loading when prepare default data via get many by LOIds", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: true,
        }));

        render(<LOsAutocomplete value={LOIds} onChange={jest.fn()} />);

        expect(screen.getByTestId("LOsAutocomplete__loading")).toBeInTheDocument();
    });

    it("should render correct the default value", () => {
        (inferQuery as jest.Mock)
            .mockReturnValueOnce(() => ({
                isLoading: false,
                data: [
                    {
                        lo_id: LOIds[0],
                        name: "LO Name 01",
                    },
                    {
                        lo_id: LOIds[1],
                        name: "LO Name 02",
                    },
                ],
            }))
            .mockReturnValueOnce(() => ({
                data: undefined,
            }));

        render(<LOsAutocomplete value={LOIds} onChange={jest.fn()} />);

        expect(screen.getAllByTestId("AutocompleteBase__tagBox")).toHaveLength(LOIds.length);
    });
});
