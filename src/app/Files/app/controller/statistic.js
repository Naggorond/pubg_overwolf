define(function() {
    let template = (d) => {
        return `<div class="streak ${d[0] > 0 ? 'kill' : 'death'}"> <span>${d[2]}</span><span>${d[1]}</span></div>`;
    };

    return {
        init
    };

    function init(events) {
        if (window.overwolf) {
            let eventBus = overwolf.windows.getMainWindow().eventBus;
            eventBus.on('streaks', (data) => {
                render(data);
            });
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                initUI();
                eventBus.loaded.push('statistic');
            } else {
                document.addEventListener('DOMContentLoaded', function(event) {
                    initUI();
                    eventBus.loaded.push('statistic');
                });
            }
        } else {
            let test =  [
                [-1, 2, 'Hailrake'],
                [1, 1, 'BOJIWE6ctbo']
            ];

            render(test);
        }
    }

    function render(data) {
        let html = '';
        data.forEach(d => {
            html += template(d);
        });

        document.querySelector('#streak-list').innerHTML = html;
    }

    function initUI() {
        eventBus.trigger('closeWindow', { type: 'settings' });
        let close = document.querySelector('#close');
        close.addEventListener('click', function(event) {
            overwolf.windows.close('statistic');
        });

        document.querySelector('body').classList.remove('loading');
    }
})