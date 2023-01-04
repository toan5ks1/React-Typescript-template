import { StandardProps } from "src/typings/react-component";

import { Checkbox, CheckboxProps } from "@mui/material";

interface TableCheckboxProps extends StandardProps {
    checkboxProps: CheckboxProps;
}

const TableCheckbox = (props: TableCheckboxProps) => {
    const { checkboxProps, ...rest } = props;

    return (
        //TODO: Need implement CheckboxBase in the future
        <Checkbox
            {...rest}
            style={{
                padding: 0,
                width: 18,
                height: 18,
            }}
            color="primary"
            {...checkboxProps}
        />
    );
};

export default TableCheckbox;
