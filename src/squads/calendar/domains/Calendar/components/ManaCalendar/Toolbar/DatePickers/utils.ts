export const isLabelString = (label: React.ReactNode): label is String => {
    return typeof label === "string";
};
