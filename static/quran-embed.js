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
        audio: currentScript.getAttribute('data-quran-audio'),
        wordByWord: currentScript.getAttribute('data-quran-word-by-word'),
        theme: currentScript.getAttribute('data-quran-theme') || 'light',
        showTranslatorNames: currentScript.getAttribute('data-quran-show-translator-names'),
        showQuranLink: currentScript.getAttribute('data-quran-show-quran-link')
    };

    // Find the target container
    const container = document.getElementById(config.target);
    
    if (!container) {
        console.error(`Quran Embed: Could not find element with id "${config.target}"`);
        return;
    }

    // Show loading state
    container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Loading Quran verse...</div>';

    // Build API URL
    const apiUrl = new URL('/api/widget', window.location.origin);
    apiUrl.searchParams.set('ayah', config.ayah || '2:255');
    apiUrl.searchParams.set('translations', config.translationIds || '20');
    apiUrl.searchParams.set('reciter', config.reciterId || '7');
    apiUrl.searchParams.set('audio', config.audio || 'false');
    apiUrl.searchParams.set('wbw', config.wordByWord || 'false');
    apiUrl.searchParams.set('theme', config.theme);
    apiUrl.searchParams.set('showTranslatorNames', config.showTranslatorNames || 'false');
    apiUrl.searchParams.set('showQuranLink', config.showQuranLink || 'false');

    // Fetch the HTML from the API
    fetch(apiUrl.toString())
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.html) {
                container.innerHTML = data.html;
            } else {
                throw new Error(data.error || 'Failed to load widget');
            }
        })
        .catch(error => {
            console.error('Quran Embed Error:', error);
            container.innerHTML = '<div style="padding: 20px; background-color: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">Error loading Quran verse. Please try again later.</div>';
        });

})();
