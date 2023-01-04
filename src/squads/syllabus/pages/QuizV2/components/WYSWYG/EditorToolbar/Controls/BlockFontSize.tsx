import { createElement, useCallback, MouseEvent } from "react";

import { DraftBlockType } from "draft-js";
import { Entities } from "src/common/constants/enum";
import { $enum } from "ts-enum-util";

import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { Menu, MenuItem } from "@mui/material";

import ControlButton from "./ControlButton";
import { BlockControlProps, OmitCreateProps } from "./control-types";

import useActionMenu from "src/squads/syllabus/hooks/useActionMenu";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

enum FontSizes {
    H6 = "H6",
    H5 = "H5",
    H4 = "H4",
    H3 = "H3",
    H2 = "H2",
}

const customBlockMap: { [x in FontSizes]: DraftBlockType } = {
    H6: "header-six",
    H5: "header-five",
    H4: "header-four",
    H3: "header-three",
    H2: "header-two",
};

const arrFontSizes = $enum(FontSizes).getValues();
const arrFontSizesValue = $enum(customBlockMap).getValues();
const DUMMY_TEXT = "abc";

const BlockFontSize = (props: OmitCreateProps<BlockControlProps>) => {
    const { blockType, onClick } = props;
    const { open, onOpen, anchorEl, onClose } = useActionMenu();
    const t = useResourceTranslate(Entities.QUIZZES);

    const handleOnClick = useCallback(
        (e: MouseEvent<HTMLLIElement>, block: string) => {
            onClick(e, block);
            onClose();
        },
        [onClick, onClose]
    );

    return (
        <>
            <ControlButton
                tooltip={t("heading")}
                onClick={onOpen}
                active={arrFontSizesValue.includes(blockType)}
            >
                <FormatSizeIcon />
            </ControlButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                keepMounted={false}
                onClose={onClose}
                onMouseDown={(e) => e.preventDefault()}
                disableAutoFocus
                disableEnforceFocus
                autoFocus={false}
            >
                {arrFontSizes.map((fontSize) => {
                    const block = customBlockMap[fontSize];
                    return (
                        <MenuItem
                            key={fontSize}
                            value={fontSize}
                            selected={blockType === block}
                            onClick={(e) => handleOnClick(e, block)}
                        >
                            {createElement(
                                fontSize.toLowerCase(),
                                { style: { margin: 0 } },
                                DUMMY_TEXT
                            )}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default BlockFontSize;
