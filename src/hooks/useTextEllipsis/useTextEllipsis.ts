// Only works with block or inline-block elements
const useTextEllipsis = {
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
} as const;
export default useTextEllipsis;
