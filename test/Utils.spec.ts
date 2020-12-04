import {expect} from "chai";
import {Utils} from "../src/utils";

describe('Utils class spec', () => {

    describe('Options validation tests', () => {

        it('isValidMaskChar tests - input and output values', () => {
            const maskChar = Utils.isValidMaskChar('*');

            expect(maskChar).to.be.a('boolean');

            expect(Utils.isValidMaskChar(null)).to.equal(false);
            expect(Utils.isValidMaskChar(undefined)).to.equal(false);
            expect(Utils.isValidMaskChar('')).to.equal(false);
            expect(Utils.isValidMaskChar('xy')).to.equal(false);
            expect(Utils.isValidMaskChar('*')).to.equal(true);

        });

        it('isValidDeliminator tests - input and output values', () => {
            const deliminator = Utils.isValidDeliminator(' ');

            expect(deliminator).to.be.a('boolean');

            expect(Utils.isValidDeliminator(0)).to.equal(false);
            expect(Utils.isValidDeliminator(null)).to.equal(false);
            expect(Utils.isValidDeliminator(undefined)).to.equal(false);
            expect(Utils.isValidDeliminator({})).to.equal(false);
            expect(Utils.isValidDeliminator('')).to.equal(false);
            expect(Utils.isValidDeliminator(Infinity)).to.equal(false);
            expect(Utils.isValidDeliminator([])).to.equal(false);
            expect(Utils.isValidDeliminator('*')).to.equal(true);
            expect(Utils.isValidDeliminator('xy')).to.equal(true);
            expect(Utils.isValidDeliminator(12)).to.equal(true);

        });

        it('isValidRange tests - input and output values', () => {
            const range = Utils.isValidRange(1);

            expect(range).to.be.a('boolean');

            expect(Utils.isValidRange(null)).to.equal(false);
            expect(Utils.isValidRange(undefined)).to.equal(false);
            expect(Utils.isValidRange(Infinity)).to.equal(false);
            expect(Utils.isValidRange(-0.02)).to.equal(false);
            expect(Utils.isValidRange(0)).to.equal(true);
            expect(Utils.isValidRange(22)).to.equal(true);
            expect(Utils.isValidRange(0.02)).to.equal(true);

        });

        it('isValidMaskDirection tests - input and output values', () => {
            const direction = Utils.isValidMaskDirection(1);

            expect(direction).to.be.a('boolean');

            expect(Utils.isValidMaskDirection(null)).to.equal(false);
            expect(Utils.isValidMaskDirection(undefined)).to.equal(false);
            expect(Utils.isValidMaskDirection(Infinity)).to.equal(false);
            expect(Utils.isValidMaskDirection(-2)).to.equal(false);
            expect(Utils.isValidMaskDirection(0.5)).to.equal(false);
            expect(Utils.isValidMaskDirection(-1)).to.equal(true);
            expect(Utils.isValidMaskDirection(0)).to.equal(true);
            expect(Utils.isValidMaskDirection(1)).to.equal(true);

        });

        it('initializeValidMaskSource tests - input and output values', () => {
            const maskSource = Utils.initializeValidMaskSource("Ivanov Ivan Ivanovich");

            expect(maskSource).to.be.a('string');

            expect(Utils.initializeValidMaskSource(null)).to.equal("");
            expect(Utils.initializeValidMaskSource(undefined)).to.equal("");
            expect(Utils.initializeValidMaskSource(maskSource)).to.equal(maskSource);
        });

        it('initializeValidOptions tests - input and output values', () => {
            const options = {
                maskChar: '*',
                deliminator: ' ',
                range: 2,
                direction: 1
            };

            const resultOptions = Utils.initializeValidOptions(options);


            expect(resultOptions).to.be.an('object').that.includes.all.keys(options);
            expect(resultOptions).to.eql(options);
        });
    });

})