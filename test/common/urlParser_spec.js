import UrlParser from 'pmaker/common/urlParser';

describe('UrlParser', () => {
    let urlParser;

    beforeEach(() => {
        urlParser = new UrlParser({
            a: ['b.a', 'd.c.b.a', 'c.b.a', '*.bb.a', '!cc.bb.a']
        });
    });

    describe('getDomainName', () => {
        it('ignores scheme, path and query', () => {
            expect(urlParser.getDomainName('scheme://domain/path?query')).toBe(
                'domain'
            );
        });

        it('ignores scheme and port number', () => {
            expect(urlParser.getDomainName('scheme://domain:1234/path')).toBe(
                'domain'
            );
        });

        it('converts the domain name to lower case', () => {
            expect(urlParser.getDomainName('DomaiN')).toBe('domain');
        });

        it('uses the longest matching rule', () => {
            expect(urlParser.getDomainName('x.y.d.c.b.a')).toBe('y.d.c.b.a');
            expect(urlParser.getDomainName('x.y.z.c.b.a')).toBe('z.c.b.a');
        });

        it('uses the wildcards', () => {
            expect(urlParser.getDomainName('x.y.z.bb.a')).toBe('y.z.bb.a');
        });

        it('parses the exception', () => {
            expect(urlParser.getDomainName('x.y.cc.bb.a')).toBe('cc.bb.a');
        });

        it('uses * as the default rule', () => {
            expect(urlParser.getDomainName('x.y.other')).toBe('y.other');
        });
    });
});
