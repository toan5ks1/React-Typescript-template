import Audio from "src/squads/syllabus/components/Audio";

import { BlockPluginProps } from "../wyswyg-types";
import { CustomBlockTypes, findAtomicBlock } from "../wyswyg-utils";

const BlockAudio = ({ block, contentState }: BlockPluginProps) => {
    const src = contentState.getEntity(block.getEntityAt(0)).getData()["data"];

    return <Audio controls src={src} />;
};

export const blockRendererFn = findAtomicBlock(CustomBlockTypes.BLOCK_AUDIO, BlockAudio);

export default BlockAudio;
