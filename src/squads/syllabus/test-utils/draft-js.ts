import { EditorState, convertFromRaw } from "draft-js";

export const getExampleDraftContent = (text: string = "IamBatman") => {
    return EditorState.createWithContent(
        convertFromRaw(
            JSON.parse(
                `{"entityMap":{},"blocks":[{"key":"6s7sp","text":"${text}","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}`
            )
        )
    );
};
