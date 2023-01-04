import Accordion, { AccordionProps } from "@mui/material/Accordion";

export interface AccordionBaseProps extends AccordionProps {}

const AccordionBase = (props: AccordionBaseProps) => {
    return <Accordion {...props} defaultExpanded />;
};

const defaultProps: Partial<AccordionBaseProps> = {
    TransitionProps: { mountOnEnter: true },
};

AccordionBase.defaultProps = defaultProps;

export default AccordionBase;
