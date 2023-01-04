import { screen } from "@testing-library/react";

export function getFakeBoundingClientRect() {
    return {
        clientWidth: 50,
        clientHeight: 100,
        getBoundingClientRect: () => ({} as any),
    };
}

export function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getNthElementByTestId(testId: string, elementNumber: number) {
    return screen.getAllByTestId(testId)[elementNumber - 1];
}

export function getLinkLOsTestIdAndQuerySelector() {
    return {
        testIdListNestedChapter: "ListNestedChapter__root",
        testIdListNestedTopic: "ListNestedTopic__root",
        testIdListNestedLO: "ListNestedLO__root",
        testIdListItemChapter: "ListItemChapter__root",
        testIdListItemTopic: "ListItemTopic__root",
        testIdListItemLO: "ListItemLO__root",
        selectorCheckbox: "input[type='checkbox']",
        selectorExpand: "[data-testid='ListItem__expand']",
        selectorExpandMore: "[data-testid='ListItem__expandMore']",
        selectorExpandLess: "[data-testid='ListItem__expandLess']",
    };
}
