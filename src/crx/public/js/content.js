(function () {
    chrome.runtime.onMessage.addListener(function (request) {
        var password = request.password;
        if (!password) {
            return;
        }
        fillForms(document, password);
    });

    function fillForms(doc, password) {
        var passwordFields = doc.querySelectorAll('input[type="password"]');
        var passwordField;

        for (var i = 0; (passwordField = passwordFields[i]); i++) {
            passwordField.value = password;
        }

        processFrames(doc, password);
    }

    function processFrames(doc, password) {
        var frames = doc.querySelectorAll('frame,iframe');
        var frame, frameDoc;
        for (var i = 0; (frame = frames[i]); i++) {
            try {
                frameDoc = frame.contentDocument;
                if (frameDoc) {
                    fillForms(frameDoc, password);
                }
            } catch {
                continue;
            }
        }
    }
})();
