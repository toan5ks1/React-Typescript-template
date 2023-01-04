import { AppActionTypes, AppActions } from "../actions";
import reducer, { initialState } from "../reducer";

describe("reducer", () => {
    test(AppActionTypes.TOGGLE_SIDEBAR, () => {
        //dont pass open params, toggle the boolean value
        let newVal = reducer(initialState, AppActions.toggleSidebar());
        expect(newVal.sidebarOpen).toEqual(!initialState.sidebarOpen);

        //pass open params, set state equal to that params
        newVal = reducer(initialState, AppActions.toggleSidebar(true));
        expect(newVal.sidebarOpen).toEqual(true);

        //test again to make sure that it wont toggle
        newVal = reducer(initialState, AppActions.toggleSidebar(true));
        expect(newVal.sidebarOpen).toEqual(true);
    });
});
