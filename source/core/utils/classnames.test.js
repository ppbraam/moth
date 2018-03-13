import classNames from './class-names';


describe('classNames()', () => {
    it('should create a className and filter from multiple string', () => {
        const result = classNames('one', 'two', null, 'three');
        const expected = 'one two three';

        expect(result).toBe(expected);
    });

    it('should accept an object and filter from multiple keys', () => {
        const result = classNames('classOne', 'classTwo', {
            classThree: true,
            classNone: false,
        });
        const expected = 'classOne classTwo classThree';

        expect(result).toBe(expected);
    });
});

