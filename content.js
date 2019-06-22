console.log('content');


document.body.addEventListener('dblclick', function(event) {
    const selection = window.getSelection();
    const anchorNode = selection.anchorNode;
    const word = anchorNode.nodeValue.substring(selection.anchorOffset, selection.extentOffset);
    const element = document.createElement('article');
    const content = document.createTextNode("hey");
    const style = 'position:absolute;top:' + (event.pageY - 40) + 'px;left:' + event.pageX + 'px; background:blue;color:white;z-index:100000;';
    element.setAttribute('style', style);
    element.appendChild(content);
    document.body.appendChild(element);

});