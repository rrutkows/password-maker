import { md5Sgp } from '../../src/common/sgp';

describe('SuperGenPass MD5', () => {
    it('has a proper name', () => {
        expect(md5Sgp.name).toBe('SuperGenPass MD5');
    });

    it('makes passwords identical as SGP with ascii input', () => {
        expect(md5Sgp.makePassword('a', 'e', 10)).toBe('gpUgYkRxq9');
    });

    it('makes passwords identical as SGP with non-ascii input', () => {
        expect(md5Sgp.makePassword('ą', 'ę', 10)).toBe('ss9oRRKKUr');
    });
});
