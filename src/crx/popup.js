import { urlParser, algorithms } from '../common/wire';

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

        var form = document.getElementById('form');

        form.elements['generatePasswordButton'].value =
            chrome.i18n.getMessage('generate_password');

        getActiveTab(function (tab) {
            form.elements['domainName'].value = urlParser.getDomainName(
                tab.url
            );
        });

        form.addEventListener(
            'submit',
            function (e) {
                e.preventDefault();
                var masterPassword = form.elements['masterPassword'].value;
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
