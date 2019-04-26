var app = {
    init: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        if (StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.backgroundColorByHexString('#33000000');
        }

        var headerEl = document.querySelector('.header'),
            headerBackEl = headerEl.querySelector('.header__back'),
            contentHeadEl = document.querySelector('.content-head'),
            contentHeadHeight = contentHeadEl.offsetHeight,
            contentBodyEl = document.querySelector('.content-body'),
            scrollFix = contentHeadEl.offsetHeight - headerEl.offsetHeight;

        // Init
        contentBodyEl.style.paddingTop = scrollFix + 'px';

        // Scroll
        var scroll = function(event) {
            var alpha = contentBodyEl.scrollTop / scrollFix;
            headerBackEl.style.opacity = (alpha < 0 ? 0 : alpha > 1 ? 1 : alpha).toFixed(2);
            if (contentBodyEl.scrollTop >= 0) {
                contentHeadEl.style.top = -contentBodyEl.scrollTop + 'px';
                contentHeadEl.style.height = contentHeadHeight + 'px';
            } else {
                contentHeadEl.style.top = 0;
                contentHeadEl.style.height = (contentHeadHeight - contentBodyEl.scrollTop) + 'px';
            }
        };
        contentBodyEl.addEventListener('scroll', scroll);
        scroll();
    }

};

app.init();