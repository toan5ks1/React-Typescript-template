import { ContentBlock, ContentState } from "draft-js";

export enum Controls {
    INLINE = "INLINE",
    BLOCK = "BLOCK",
    ATOMIC = "ATOMIC",
}

export interface Callbacks {
    readOnly: boolean;
    onStartEdit: (blockKey: string) => void;
    onEndEdit: (blockKey: string) => void;
    onBlockRemove: (blockKey: string) => void;
    onBlockUpdate: (blockKey: string, data: any) => void;
}

export interface BlockPluginProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps: Callbacks;
}
