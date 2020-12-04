export interface MaskOptions {
    range?: number;
    deliminator?: string | number;
    maskChar?: string;
    direction?: number;
}

export enum MaskDirections {
    BACKWARD_MASKING = -1,
    RANDOM_MASKING = 0,
    FORWARD_MASKING = 1
}