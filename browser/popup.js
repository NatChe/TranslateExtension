const buttons = document.querySelectorAll('button');

const removeActiveButtons = function() {
    const activeButtons = document.getElementsByClassName('active');
    for (activeButton of activeButtons) {
        activeButton.classList.remove("active");
    }
}

chrome.storage.sync.get('tr_lang', function(data) {
    for (let button of buttons) {
        if (data.tr_lang === button.value) {
            button.classList.add("active");
        }
    }
});

for (let button of buttons) {
    button.addEventListener('click', function(event) {
        chrome.storage.sync.set({'tr_lang': event.target.value}, function() {
            removeActiveButtons();
            event.target.classList.add('active');
        });
    });
}