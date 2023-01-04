import { Entities } from "src/common/constants/enum";

import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import SelectBase from "src/components/Select/SelectBase";

import MasterImportDialog from "../MasterImportDialog/MasterImportDialog";

import useCategory from "src/squads/payment/domains/MasterData/hooks/useCategory";
import useDialog from "src/squads/payment/hooks/useDialog";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const MasterDataContainer = () => {
    const tMaster = useResourceTranslate(Entities.MASTERS);

    const { open, onOpen, onClose } = useDialog();
    const { category, categoryOptions, onChange } = useCategory();
    return (
        <Grid container data-testid="MasterDataContainer_container">
            <Grid item xs={3}>
                <SelectBase
                    data-testid="MasterView__typeSelect"
                    displayEmpty
                    input={<OutlinedInput margin="dense" size="small" />}
                    placeholder={tMaster("placeholder.masterData")}
                    options={categoryOptions}
                    onChange={onChange}
                    value={category}
                />
                <Box mt={2}>
                    <ButtonPrimaryContained
                        data-testid="MasterView__importButton"
                        fullWidth
                        onClick={onOpen}
                        disabled={!category}
                    >
                        <ExitToAppOutlined />
                        {tMaster("button.import")}
                    </ButtonPrimaryContained>
                </Box>
            </Grid>
            {category && <MasterImportDialog category={category} open={open} onClose={onClose} />}
        </Grid>
    );
};

export default MasterDataContainer;
