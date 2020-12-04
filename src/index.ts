import {MaskDirections, MaskOptions} from "./interfaces/options";
import {Utils, DEFAULT_OPTIONS} from "./utils";

export class Maskify {

    public static mask(source: string, options: MaskOptions): string {
        const maskSource = Utils.initializeValidMaskSource(source);
        const maskOptions = Utils.initializeValidOptions(options);
        const { range, deliminator, maskChar, direction } = maskOptions;

        let tokens = Utils.splitMaskSource(maskSource, deliminator);
        let maskedTokens = new Array(tokens.length);
        let token = null;
        // @ts-ignore
        let joinCharacter = Utils.isString(deliminator) ? deliminator : '';

        for (let i = 0; i < tokens.length; i++) {
            let tokenRange = 0;

            if (tokens[i].length === 0) {
                maskedTokens.push(tokens[i]);
                continue;
            }

            if (range === DEFAULT_OPTIONS.range) {
                tokenRange = (Math.floor(Math.random() * 1000000) % tokens[i].length) + 1;
            } else if (range < 1.0) {
                tokenRange = Math.floor(range * tokens[i].length);
            } else {
                tokenRange = Math.floor(range);
            }
            token = tokens[i];

            token = Maskify.maskToken(token, maskChar, tokenRange, direction);

            maskedTokens[i] = token;
        }

        // @ts-ignore
        return maskedTokens.join(joinCharacter);
    }

    public static maskRight (maskSource: string, options: MaskOptions): string {

        options.direction = MaskDirections.BACKWARD_MASKING;

        return Maskify.mask(maskSource, options);
    }

    public static maskLeft (maskSource: string, options: MaskOptions): string {

        options.direction = MaskDirections.FORWARD_MASKING;

        return Maskify.mask(maskSource, options);
    }

    public static maskRandom (maskSource: string, options: MaskOptions): string {

        options.direction = MaskDirections.RANDOM_MASKING;

        return Maskify.mask(maskSource, options);
    }

    private static maskToken (token: string, maskChar: string, maskCount: number, direction: number): string {

        if (maskCount === 0) {
            return token;
        } else if (token.length - maskCount <= 0) {
            return Utils.buildCharString(maskChar, token.length);
        }

        if (direction === MaskDirections.FORWARD_MASKING) {
            return Utils.buildCharString(maskChar, maskCount) + token.substr(maskCount);
        } else if (direction === MaskDirections.BACKWARD_MASKING) {
            return token.substr(0, token.length - maskCount) + Utils.buildCharString(maskChar, maskCount);
        } else {
            let tokenClone = '';
            let indexArray = Utils.buildRandomIndexArray(token.length).slice(0, maskCount);
            for (let i = 0; i < token.length; i++) {
                if (indexArray.indexOf(i) > -1) {
                    tokenClone += maskChar;
                } else {
                    tokenClone += token[i];
                }
            }
            return tokenClone;
        }
    }

}

console.log('[MASKIFY-mask]',`test-name:Ivanov Oskar Ivanovich`, Maskify.mask('Ivanov Ivan Ivanovich', {maskChar: '*', range: 3, deliminator: 5, direction: -1}));
//console.log('[MASKIFY-maskRight]',`test-name:Ivanov Oskar Ivanovich`, Maskify.maskRight('Ivanov Oskar Ivanovich', { range: 4, deliminator: 5}));
//console.log('[MASKIFY-maskLeft]', `test-name:Ivanov Oskar Ivanovich`, Maskify.maskLeft('Ivanov Oskar Ivanovich', {maskChar: '@', range: 3, deliminator: 5}));
//console.log('[MASKIFY-maskRandom]', `test-name:Ivanov Oskar Ivanovich`, Maskify.maskRandom('Ivanov Oskar Ivanovich', { range: 3, deliminator: 5}));

// console.log('[MASKIFY-mask]', `test-name:Ivanov Don Ivanovich`,Maskify.mask('Ivanov Don Ivanovich', {maskChar: '#', range: 2, deliminator: 4}));
// console.log('[MASKIFY-maskRight]', `test-name:Ivanov Don Ivanovich`, Maskify.maskRight('Ivanov Don Ivanovich', {maskChar: '&', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskLeft]', `test-name:Ivanov Don Ivanovich`, Maskify.maskLeft('Ivanov Don Ivanovich', {maskChar: '@', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskRandom]',`test-name:Ivanov Don Ivanovich`, Maskify.maskRandom('Ivanov Don Ivanovich', { range: 3, deliminator: 5}));
//
// console.log('[MASKIFY-mask]', `test-name:Ivanov O.I.`,Maskify.mask('Ivanov O.I.', {maskChar: '#', range: 2, deliminator: 4}));
// console.log('[MASKIFY-maskRight]', `test-name:Ivanov O.I.`, Maskify.maskRight('Ivanov O.I.', {maskChar: '&', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskLeft]', `test-name:Ivanov O.I.`, Maskify.maskLeft('Ivanov O.I.', {maskChar: '@', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskRandom]',`test-name:Ivanov O.I.`, Maskify.maskRandom('Ivanov O.I.', { range: 3, deliminator: 5}));
//
// console.log('[MASKIFY-mask]', `test-name:Ivanov Oskar I.`,Maskify.mask('Ivanov Oskar I.', {maskChar: '#', range: 2, deliminator: 4}));
// console.log('[MASKIFY-maskRight]', `test-name:Ivanov Oskar I.`, Maskify.maskRight('Ivanov Oskar I.', {maskChar: '&', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskLeft]', `test-name:Ivanov Oskar I.`, Maskify.maskLeft('Ivanov Oskar I.', {maskChar: '@', range: 3, deliminator: 5}));
// console.log('[MASKIFY-maskRandom]',`test-name:Ivanov Oskar I.`, Maskify.maskRandom('Ivanov Oskar I.', { range: 3, deliminator: 5}));
//

// mask('Ivanov Oskar Ivanovich');
// mask('Ivanov Don Ivanovich');
// mask('Ivanov O.I.');
// mask('Ivanov Oskar I.');
// mask('Askarova Dilfuza Ismailovna');
// mask('Mirzarakhmatova');
// mask('Le-Ju Pxan');
//mask('D I.V');
//mask('   ');