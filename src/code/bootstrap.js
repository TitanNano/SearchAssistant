// bootstrap.js

import App from './App';

const ready = function() {
    App.init();
};

if (document.readyState === 'complete') {
    ready();
} else {
    window.addEventListener('DOMContentLoaded', ready);
}
