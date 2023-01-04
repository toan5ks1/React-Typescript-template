import { MutationMenus } from "../../../../common/constants/enum";
import { AllowedActions, getActionProps } from "../helpers";
import { Action } from "../types";

describe("getActionProps", () => {
    it("should return correct result", () => {
        const action: Action = MutationMenus.DELETE;
        const customAction: Action = { action: MutationMenus.DELETE, disabled: true };

        //if normal action, return AllowedActions
        expect(getActionProps(action)).toEqual(AllowedActions[action as string]);

        //if custom action, return AllowedActions merge with custom action
        expect(getActionProps(customAction)).toEqual({
            ...AllowedActions[customAction.action as string],
            ...customAction,
        });
    });
});
