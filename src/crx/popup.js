import { urlParser, algorithms } from '../common/wire';
import { updateCanvas } from 'jdenticon';

window.addEventListener(
    'load',
    function () {
        function getActiveTab(callback) {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (tabs) {
                    if (tabs.length > 0) {
                        callback(tabs[0]);
                    }
                }
            );
        }

        const form = document.getElementById('form');
        const iconCanvas = document.getElementById('master-password-icon');

        form.elements['generatePasswordButton'].value =
            chrome.i18n.getMessage('generate_password');

        form.elements['master-password'].addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length > 0) {
                updateCanvas(iconCanvas, value, { padding: 0 });
            } else {
                iconCanvas
                    .getContext('2d')
                    .clearRect(0, 0, iconCanvas.width, iconCanvas.height);
            }
        });

        getActiveTab(function (tab) {
            form.elements['domainName'].value = urlParser.getDomainName(
                tab.url
            );
        });

        form.addEventListener(
            'submit',
            function (e) {
                e.preventDefault();
                var masterPassword = form.elements['master-password'].value;
                var domainName = form.elements['domainName'].value;
                var password = algorithms[0].value.makePassword(
                    masterPassword,
                    domainName,
                    12
                );

                getActiveTab(function (tab) {
                    chrome.tabs.sendMessage(tab.id, { password: password });
                    window.close();
                });
            },
            false
        );
    },
    false
);
