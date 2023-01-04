export interface UseStylesMaxLineProps {
    maxLines: number;
}

export default function useStylesMaxLine({ maxLines }: UseStylesMaxLineProps) {
    return {
        lineClamp: {
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
        },
    };
}
