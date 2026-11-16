(() => {
    const tracker = document.createElement('script');
    tracker.src = 'https://tracker.metricool.com/resources/be.js';
    tracker.addEventListener('load', () => {
        window.beTracker.t({ hash: 'e582f10a9b929933a13fe9e1ed918c89' });
    }, { once: true });
    document.head.append(tracker);
})();
