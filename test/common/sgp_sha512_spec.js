import { sha512Sgp } from '../../src/common/sgp';

describe('SuperGenPass SHA', () => {
    it('has a proper name', () => {
        expect(sha512Sgp.name).toBe('SuperGenPass SHA');
    });

    it('makes passwords identical as SGP with ascii input', () => {
        expect(sha512Sgp.makePassword('a', 'e', 10)).toBe('hOR4Qcn6Qt');
    });

    it('makes passwords identical as SGP with non-ascii input', () => {
        expect(sha512Sgp.makePassword('ą', 'ę', 10)).toBe('jZ81YTsPLn');
    });
});
