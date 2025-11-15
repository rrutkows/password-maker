import sha512 from 'crypto-js/sha512';
import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';

function checkPassword(password, length) {
    password = password.substr(0, length);
    return (
        password.search(/[a-z]/) === 0 &&
        password.search(/[0-9]/) > 0 &&
        password.search(/[A-Z]/) > 0
    );
}

class SGP {
    constructor(name, hashFunction) {
        this._name = name;
        this._hashFunction = hashFunction;
    }

    get name() {
        return this._name;
    }

    makePassword(masterPassword, domain, length) {
        let password = masterPassword + ':' + domain;

        for (let i = 0; i < 10 || !checkPassword(password, length); i++) {
            password = this._hashFunction(password)
                .toString(base64)
                .replace(/\+/g, '9')
                .replace(/\//g, '8')
                .replace(/=/g, 'A');
        }

        return password.substr(0, length);
    }
}

export const sha512Sgp = new SGP('SuperGenPass SHA', sha512);
export const md5Sgp = new SGP('SuperGenPass MD5', md5);
