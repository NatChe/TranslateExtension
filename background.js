'use strict';

  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({tr_lang: 'en_fr'});
  });