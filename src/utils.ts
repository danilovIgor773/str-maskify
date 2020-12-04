import {MaskDirections, MaskOptions} from "./interfaces/options";

export const DEFAULT_OPTIONS: MaskOptions = {
    maskChar: '*',
    deliminator: ' ',
    range: 0,
    direction: MaskDirections.FORWARD_MASKING
}

export class Utils {
    static initializeValidMaskSource (maskSource: string): string {
        return Utils.isString(maskSource) ? maskSource : '';
    }

    static initializeValidOptions (params: MaskOptions) {
        if (!params) return {};
        return {
            maskChar: Utils.isValidMaskChar(params.maskChar) ? params.maskChar : DEFAULT_OPTIONS.maskChar,
            deliminator: Utils.isValidDeliminator(params.deliminator) ? params.deliminator : DEFAULT_OPTIONS.deliminator,
            range: Utils.isValidRange(params.range) ? params.range : DEFAULT_OPTIONS.range,
            direction: Utils.isValidMaskDirection(params.direction) ? params.direction : DEFAULT_OPTIONS.direction
        }
    }

    static isString(str: string): boolean {
        return str !== null && typeof str === 'string';
    }

    static isValidMaskChar (maskChar: string): boolean {
        return Utils.isString(maskChar) && maskChar.length === 1;
    }

    static isNumber (num: number): boolean {
        return num !== null && typeof num == 'number' && !isNaN(num) && isFinite(num);
    }

    static isValidDeliminator (deliminator: any): boolean {
        return (Utils.isString(deliminator) && deliminator?.length > 0) ||
            (Utils.isNumber(deliminator) && deliminator > 0);
    }

    static isValidRange (range: number): boolean {
        return Utils.isNumber(range) && range >= 0;
    };

    static isValidMaskDirection (direction: MaskDirections): boolean {
        return [
            MaskDirections.BACKWARD_MASKING,
            MaskDirections.RANDOM_MASKING,
            MaskDirections.FORWARD_MASKING
        ].indexOf(direction) > -1;
    };

    static buildCharString(char: string, length: number): string {
        return Array(length + 1).join(char);
    }

    static buildIndexArray(length: number): any[] {
        let array = new Array(length);
        for (let i = 0; i < length; i++) {
            array[i] = i;
        }
        return array;
    }

    static buildRandomIndexArray(length: number): any[] {
        let array = Utils.buildIndexArray(length);
        let index = array.length;
        let temp;
        let rnd;

        while (0 !== index) {
            rnd = Math.floor(Math.random() * index);
            index -= 1;
            temp = array[index];
            array[index] = array[rnd];
            array[rnd] = temp;
        }
        return array;
    }

    static splitMaskSource(maskSource: string, deliminator: any) {
        if (Utils.isString(deliminator)) {
            return maskSource.split(deliminator);
        }
        return maskSource.match(new RegExp('.{1,' + Math.floor(deliminator) + '}', 'g'));
    }
}