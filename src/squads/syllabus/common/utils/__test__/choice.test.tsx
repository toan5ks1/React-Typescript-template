import { translateForChoices } from "../choice";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

jest.mock("src/squads/syllabus/hooks/useTranslate", () => {
    const translate = () => (str: string) => `translateForChoices.${str}`;
    return {
        __esModule: true,
        default: translate,
    };
});

describe("translateForChoices function", () => {
    it("should return translated options after call", () => {
        const t = useTranslate();
        expect(
            translateForChoices(
                [
                    {
                        label: "hello",
                        value: "hello",
                        id: "hello",
                    },
                ],
                t
            )
        ).toMatchObject([
            {
                value: "translateForChoices.hello",
                label: "hello",
                id: "hello",
            },
        ]);
    });
});
