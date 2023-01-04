import { Entities } from "src/common/constants/enum";
import { genId } from "src/common/utils/id-generator";

import { ActionTypes, MasterActions, MasterState } from "./types";

export const initialState: MasterState = {
    fileImport: {},
};

function reducer(state: MasterState = initialState, action: MasterActions): MasterState {
    switch (action.type) {
        case ActionTypes.IMPORT_MASTER:
            const fileName = action.payload.file.name;
            return {
                ...state,
                fileImport: {
                    ...state.fileImport,
                    [fileName]: {
                        id: `${Entities.MASTERS}_${genId()}`,
                        ...action.payload,
                    },
                },
            };

        default:
            return state;
    }
}

export default reducer;
