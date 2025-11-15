function tldNameMatches(tldName, labels) {
    var tldNameLabels = tldName.split('.');
    var tldNameLabel;
    if (labels.length < tldNameLabels.length) {
        return false;
    }
    for (var i = 0, l = tldNameLabels.length; i < l; i++) {
        tldNameLabel = tldNameLabels[l - i - 1];
        if (
            tldNameLabel !== '*' &&
            tldNameLabel !== labels[labels.length - i - 1]
        ) {
            return false;
        }
    }
    return true;
}

function createDomainName(labels, level) {
    level = Math.min(labels.length, level);
    return labels.slice(labels.length - level).join('.');
}

export default class {
    constructor(topLevelDomains) {
        this._topLevelDomains = topLevelDomains;
    }

    getDomainName(url) {
        var host = /^(?:[^:]*:\/\/)?([^/:?]*)/.exec(url)[1];
        host = host.toLowerCase();
        var labels = host.split('.');
        var top = labels[labels.length - 1];
        var tldNames = this._topLevelDomains[top] || ['*'];
        var tldName, tldNameLabelCount, level, isException;
        level = 1;
        for (var i = 0, l = tldNames.length; i < l; i++) {
            tldName = tldNames[i];
            if (tldName.charAt(0) === '!') {
                isException = true;
                tldName = tldName.substr(1);
            } else {
                isException = false;
            }
            if (!tldNameMatches(tldName, labels)) {
                continue;
            }
            tldNameLabelCount = tldName.split('.').length;
            if (isException) {
                return createDomainName(labels, tldNameLabelCount);
            }
            if (tldNameLabelCount + 1 > level) {
                level = tldNameLabelCount + 1;
            }
        }
        return createDomainName(labels, level);
    }
}
