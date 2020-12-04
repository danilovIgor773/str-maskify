import {expect} from "chai";
import {Maskify} from "../src/index";

const SpecResults = {
    defaultRes: "**anov **an **anovich",
    changedMaskChar: "##anov ##an ##anovich",
    rangeSetTo3: "***nov ***n ***novich",
    rangeSetTo4: "****ov **** ****ovich",
    backwardMasking: "Iva*** I*** Ivanov***",
    deliminatorToNum: "Iv***v ***n ***no****"
};

describe('Maskify class spec', () => {
    let maskSource;
    let options;

    beforeEach(() => {
        maskSource = "Ivanov Ivan Ivanovich";
        options = {
            maskChar: '*',
            deliminator: ' ',
            range: 2,
            direction: 1 //FORWARD_MASKING
        };
    });

    it('method "mask" - input/output arguments test', () => {
        const maskedOutputString = Maskify.mask(maskSource, options);

        expect(maskSource).to.be.a("string");
        expect(options).to.be.an('object').that.includes.all.keys(options);
        expect(options).to.eql(options);
        expect(maskedOutputString).to.be.a("string");
    });

    it('method "mask" assertion test' , () => {
        //default range
        const maskedOutputString = Maskify.mask(maskSource, options);

        //playing with options...
        const outputForChangedRange = Maskify.mask(maskSource, {...options, range: 3});
        const outputRangeSetTo4 = Maskify.mask(maskSource, {...options, range: 4});
        const outputBackWardMasking = Maskify.mask(maskSource, {...options, range: 3, direction: -1});
        const outputDeliminatorToNum = Maskify.mask(maskSource, {...options, range: 3, deliminator: 5, direction: -1});
        const outputMaskCharChanged = Maskify.mask(maskSource, {...options, maskChar: "#"});

        expect(maskedOutputString).to.equal(SpecResults.defaultRes);
        expect(outputForChangedRange).to.equal(SpecResults.rangeSetTo3);
        expect(outputRangeSetTo4).to.equal(SpecResults.rangeSetTo4);
        expect(outputBackWardMasking).to.equal(SpecResults.backwardMasking);
        expect(outputDeliminatorToNum).to.equal(SpecResults.deliminatorToNum);
        expect(outputMaskCharChanged).to.equal(SpecResults.changedMaskChar);
    });
});