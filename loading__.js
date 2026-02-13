
var app_version = '2026.02.13';

pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://pemuned.github.io/logos/logo_multimedia.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        // Agregar efecto de brillo animado
        var shine = document.createElement('div');
        shine.id = 'progress-shine';
        bar.appendChild(shine);

        var versionText = document.createElement('div');
        versionText.id = 'version-text';
        versionText.innerHTML = 'v' + app_version;
        wrapper.appendChild(versionText);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #222750;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #222750;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 88px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 20px;',
            '    width: 100%;',
            '    background-color: #0b0f27ff;',
            '    border-radius: 10px;',
            '    position: relative;',
            '    overflow: hidden;',
            '    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);',
            '}',

            '#progress-bar-container::before {',
            '    content: "";',
            '    position: absolute;',
            '    top: 0;',
            '    left: -100%;',
            '    width: 100%;',
            '    height: 100%;',
            '    background: linear-gradient(90deg, transparent, rgba(52, 161, 235, 0.1), transparent);',
            '    animation: scanning 2s linear infinite;',
            '}',

            '@keyframes scanning {',
            '    0% { left: -100%; }',
            '    100% { left: 100%; }',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background: linear-gradient(90deg, #2980b9 0%, #34a1eb 100%);',
            '    border-radius: 10px;',
            '    position: relative;',
            '    transition: width 0.3s ease-out;',
            '    box-shadow: 0 0 10px rgba(52, 161, 235, 0.5), 0 0 20px rgba(52, 161, 235, 0.3);',
            '}',

            '#progress-shine {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    width: 100%;',
            '    height: 100%;',
            '    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);',
            '    animation: shine 1.5s ease-in-out infinite;',
            '}',
            '#version-text {',
            '    position: absolute;',
            '    bottom: 5px;',
            '    right: 5px;',
            '    color: #dedcfc;',
            '    font-size: 0.5em;',
            '    font-family: Courier New;',
            '}',

            '@keyframes shine {',
            '    0% { transform: translateX(-100%); }',
            '    100% { transform: translateX(100%); }',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});