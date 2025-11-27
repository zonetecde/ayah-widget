(function() {
    'use strict';

    // Get the script tag that loaded this file
    const currentScript = document.currentScript || document.querySelector('script[data-quran-target]');
    
    if (!currentScript) {
        console.error('Quran Embed: Could not find script tag');
        return;
    }

    // Get configuration from data attributes
    const config = {
        target: currentScript.getAttribute('data-quran-target'),
        ayah: currentScript.getAttribute('data-quran-ayah'),
        translationIds: currentScript.getAttribute('data-quran-translation-ids'),
        reciterId: currentScript.getAttribute('data-quran-reciter-id'),
        audio: currentScript.getAttribute('data-quran-audio') === 'true',
        wordByWord: currentScript.getAttribute('data-quran-word-by-word') === 'true',
        theme: currentScript.getAttribute('data-quran-theme') || 'light',
        showTranslatorNames: currentScript.getAttribute('data-quran-show-translator-names') === 'true',
        showQuranLink: currentScript.getAttribute('data-quran-show-quran-link') === 'true'
    };

    // Find the target container
    const container = document.getElementById(config.target);
    
    if (!container) {
        console.error(`Quran Embed: Could not find element with id "${config.target}"`);
        return;
    }

    // Render Hello World for now
    container.innerHTML = '<div style="padding: 20px; background-color: #f0f0f0; border-radius: 8px; text-align: center;"><h1 style="color: #333; font-family: Arial, sans-serif;">Hello World</h1><p style="color: #666;">Quran Widget - Configuration loaded successfully!</p><pre style="text-align: left; background: white; padding: 10px; border-radius: 4px; font-size: 12px;">' + JSON.stringify(config, null, 2) + '</pre></div>';

})();
