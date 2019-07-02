
document.body.addEventListener('dblclick', function(event) {
    const word = getSelectedText();
    chrome.storage.sync.get('tr_lang', function(data) {
        const languages = data.tr_lang.split('_');
        translate(event, languages, word);
    });
});

const translate = (event, lang, text) => {
    makeTranslationRequest(text, lang)
    .then(response => {
        const translatedText = response[0][0][0];
        createTooltip(event, translatedText);
    })
    .catch(error => console.debug(error));
}

const getSelectedText = () => {
    const selection = window.getSelection();
    const anchorNode = selection.anchorNode;
    return anchorNode.nodeValue.substring(selection.anchorOffset, selection.extentOffset);
}

const createTooltip = (event, text) => {
    const element = document.createElement('article');
    const content = document.createTextNode(text);
    const style = 'position:absolute;top:' + (event.pageY - 40) + 'px;left:' + (event.pageX - 40) + 'px; background:rgba(20,7,35,0.8);color:#cee2ba;z-index:100000; padding:5px 10px;font-size:13px;font-family:Helvetica,sans-serif;letter-spacing:.5px;border-radius:2px;';
    element.setAttribute('style', style);
    element.appendChild(content);
    document.body.appendChild(element);
}

const makeTranslationRequest = (text, languages) => {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
            + languages[0] + "&tl=" + languages[1] + "&dt=t&q=" + encodeURI(text)
    return fetch(url)
    .then(response => 
        response.status === 200 ? 
        response.json() : 
        Promise.reject(response.json()));
}