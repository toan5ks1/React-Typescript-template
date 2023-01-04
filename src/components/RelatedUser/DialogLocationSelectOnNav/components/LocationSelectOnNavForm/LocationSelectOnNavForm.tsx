import { Fragment } from "react";

import { GlobalLocationTreeNode } from "src/typings/locations-provider";

import { Box, List } from "@mui/material";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import CheckBoxLocation, {
    CheckBoxLocationProps,
} from "src/components/RelatedUser/DialogLocationSelectOnNav/components/CheckBoxLocation";

export interface LocationSelectOnNavFormProps {
    populatedLocationsTree: GlobalLocationTreeNode[];
    onLocationToggled: CheckBoxLocationProps["onLocationToggled"];
}
const LocationSelectOnNavForm = ({
    populatedLocationsTree,
    onLocationToggled,
}: LocationSelectOnNavFormProps) => {
    const renderListItems = (locationsTree: GlobalLocationTreeNode[], level: number) => {
        const nextLevel = level + 1;
        const marginThatShouldLookLikeDesign = nextLevel * 4;
        return (
            <List disablePadding dense>
                {locationsTree.map((location) => (
                    <Fragment key={location.locationId}>
                        <Box ml={marginThatShouldLookLikeDesign}>
                            <CheckBoxLocation
                                location={location}
                                onLocationToggled={onLocationToggled}
                            />
                        </Box>
                        {location.children && renderListItems(location.children, nextLevel)}
                    </Fragment>
                ))}
            </List>
        );
    };

    return (
        <PaperRoundedBorders fullHeight={true}>
            {/* TODO: scale size according to screen size and checked locations */}
            <Box height={500} overflow="auto" display="block">
                {renderListItems(populatedLocationsTree, 0)}
            </Box>
        </PaperRoundedBorders>
    );
};

export default LocationSelectOnNavForm;
