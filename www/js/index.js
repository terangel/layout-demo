var app = {
    
    start: function() {
        
        var headerEl = document.querySelector('.header'),
            headerBackEl = headerEl.querySelector('.header__back'),
            contentHeadEl = document.querySelector('.content-head'),
            contentBodyEl = document.querySelector('.content-body'),
            contentHeadHeight, scrollFix;
        
        var resize = function() {
            app.debugSizes();
            contentHeadHeight = contentHeadEl.offsetHeight;
            scrollFix = contentHeadHeight - headerEl.offsetHeight;
            contentBodyEl.style.paddingTop = scrollFix + 'px';
        };
        window.addEventListener('resize', resize);

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
        
        if (StatusBar) {
            window.requestAnimationFrame(function() {
                StatusBar.overlaysWebView(true);
                StatusBar.backgroundColorByHexString('#33000000');
            }, 50);
        }
        
        resize();
        scroll();
    },
    
    traces: [],
    
    debug: function(msg) {
        this.traces.push('[' + performance.now() + '] ' + msg);
    },
    
    debugSizes: function() {
        this.debug('windowHeight: ' + window.innerHeight);
        this.debug('headerHeight: ' + document.querySelector('.header__safe').offsetHeight);
    }

};

(function() {
    var ready = 0,
    check = function(event) {
        app.debug(event.type);
        if (++ready === 2) {
            app.start();
        }
    };
    document.addEventListener('deviceready', check);
    document.addEventListener('DOMContentLoaded', check);
})();
