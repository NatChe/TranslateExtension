
document.body.addEventListener('dblclick', function(event) {
    const word = getSelectedText();
    chrome.storage.sync.get('tr_lang', function(data) {
        const languages = data.tr_lang.split('_');
        translate(event, languages, word);
    });
});

const translate = function(event, lang, text) {
    const translation = text + 'translated';
    createTooltip(event, translation);
}

const getSelectedText = function() {
    const selection = window.getSelection();
    const anchorNode = selection.anchorNode;
    return anchorNode.nodeValue.substring(selection.anchorOffset, selection.extentOffset);
}

const createTooltip = function(event, text) {
    const element = document.createElement('article');
    const content = document.createTextNode(text);
    const style = 'position:absolute;top:' + (event.pageY - 40) + 'px;left:' + event.pageX + 'px; background:blue;color:white;z-index:100000;';
    element.setAttribute('style', style);
    element.appendChild(content);
    document.body.appendChild(element);
}