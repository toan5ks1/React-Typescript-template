export enum RectTypes {
    TEXT = "TEXT",
    TEX = "TEX",
    IMAGE = "IMAGE",
    INLINE_TEX = "INLINE_TEX",
    INLINE_IMAGE = "INLINE_IMAGE",
}

export interface Rect {
    readonly id: string;
    readonly fileName: string;
    readonly filePage: number;
    readonly fileScale: number;
    readonly fileWidth: number;
    readonly left: number;
    readonly top: number;
    readonly width: number;
    readonly height: number;
    readonly data?: string;
    readonly image: string;
    readonly rectType: RectTypes;
}
