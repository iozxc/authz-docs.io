var _path_refer
var _path_src

var weblog
if (!weblog) {
    _path_src = window.location.pathname
    _path_refer = null
    weblog = async () => {
        try {
            await fetch('http://authz.omisheep.cn/web/website-log', {
                method: 'GET',
                headers: {
                    'path-src': _path_src,
                    'path-refer': _path_refer
                }
            })
        } catch (err) {
            // pass
        }
    }

    window.addEventListener('popstate', function (event) {
        _path_refer = _path_src
        _path_src = window.location.pathname
        weblog().then(r => {
        })
    })

    const _historyWrap = function (type) {
        const orig = history[type];
        const e = new Event(type);
        return function () {
            const rv = orig.apply(this, arguments);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _historyWrap('pushState');
    history.replaceState = _historyWrap('replaceState');

    window.addEventListener('pushState', function (e) {
        _path_src = window.location.pathname
        weblog().then(r => {
        })
    });
    window.addEventListener('replaceState', function (e) {
        _path_refer = window.location.pathname
    });

    const _data = async () => {
        try {
            await fetch('http://authz.omisheep.cn/web/version/latest').then(res => res.json()).then(res => {
                document.getElementsByClassName('VPNavBarMenuGroup')[0].childNodes[0].childNodes[0].innerText = `Authz-${res.data.latest}`
            })
        } catch (err) {
            // pass
        }
    }
    _data().then()

}
