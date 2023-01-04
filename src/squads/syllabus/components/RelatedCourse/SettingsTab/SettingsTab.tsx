import { useForm } from "react-hook-form";

import { Box } from "@mui/material";
import HookForm from "src/components/Forms/HookForm";

import SettingsTabForm, { SettingsTabProps } from "./SettingsTabForm";

const SettingsTab = (props: SettingsTabProps) => {
    const { course } = props;

    const methods = useForm({
        defaultValues: course,
    });

    return (
        <Box sx={(theme) => ({ padding: theme.spacing(3, 4) })}>
            <HookForm methods={methods}>
                <SettingsTabForm {...props} />
            </HookForm>
        </Box>
    );
};
export default SettingsTab;
