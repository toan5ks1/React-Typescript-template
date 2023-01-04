import { OptionSelectType } from "src/common/constants/types";

import {
    createListHours,
    createListMinutes,
} from "src/squads/calendar/domains/Calendar/common/constants/choices";

const mockData = (length: number, step: number) => {
    const data = [];
    for (let i = 0; i <= length; i++) {
        const iMultiplication = i * step;
        const value = iMultiplication < 10 ? `0${iMultiplication}` : iMultiplication;
        data.push({ id: iMultiplication, value: value.toString() });
    }
    return data;
};
describe(createListHours.name, () => {
    it("should match list hours", () => {
        const hours: OptionSelectType[] = mockData(23, 1);
        expect(createListHours()).toEqual(hours);
    });
});

describe(createListMinutes.name, () => {
    it("should match list minutes", () => {
        const minutes: OptionSelectType[] = mockData(11, 5);
        expect(createListMinutes()).toEqual(minutes);
    });
});
