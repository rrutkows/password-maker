import { urlParser, algorithms } from '../common/wire';
import { updateCanvas } from 'jdenticon';

const form = document.forms['password-maker-form'];
const fields = form.elements;
const defaultPasswordLength = 10;
const iconCanvas = document.getElementById('master-password-icon');

function parsePasswordLength(sLength) {
    var passwordLength = parseInt(sLength);
    if (isNaN(passwordLength) || passwordLength < 3) {
        passwordLength = defaultPasswordLength;
    }
    return passwordLength;
}

algorithms.forEach((pair) => {
    const option = new Option(pair.value.name, pair.key);
    fields['algorithm'].add(option);
});

if (window.localStorage) {
    fields['url'].value = localStorage['url'] || '';
    fields['password-length'].value = parsePasswordLength(
        localStorage['password-length']
    );
    const algorithmIndex = algorithms.findIndex(
        (pair) => pair.key === localStorage['algorithm']
    );
    fields['algorithm'].value =
        algorithms[algorithmIndex < 0 ? 0 : algorithmIndex].key;
} else {
    fields['password-length'].value = defaultPasswordLength;
    fields['algorithm'].value = algorithms[0].key;
}

fields['master-password'].addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 0) {
        updateCanvas(iconCanvas, value, { padding: 0 });
    } else {
        iconCanvas
            .getContext('2d')
            .clearRect(0, 0, iconCanvas.width, iconCanvas.height);
    }
});

form.onsubmit = function () {
    var masterPassword = fields['master-password'].value;
    var url = fields['url'].value;
    var domainName = urlParser.getDomainName(url);
    var passwordLength = parsePasswordLength(fields['password-length'].value);
    const algorithmKey = fields['algorithm'].value;
    const algorithm = algorithms.find(
        (pair) => pair.key === algorithmKey
    ).value;
    var password;

    fields['url'].value = domainName;
    fields['password-length'].value = passwordLength;
    if (window.localStorage) {
        localStorage['url'] = domainName;
        localStorage['password-length'] = passwordLength;
        localStorage['algorithm'] = algorithmKey;
    }
    password = algorithm.makePassword(
        masterPassword,
        domainName,
        passwordLength
    );
    fields['password'].value = password;
    return false;
};
